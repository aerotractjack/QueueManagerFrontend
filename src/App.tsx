import { useEffect, useState } from "react";
import { Text, HStack, Flex, IconButton, VStack, Divider, Button  } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Layout } from "./components/Layout";
import { fetchWrapper } from "./utils/fetchWrapper";

export const App = () => {
  const [queues, setQueues] = useState<string[]>([]);
  const [currentQueue, setCurrentQueue] = useState("");
  const [jobs, setJobs] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchWrapper.get("http://localhost:7088/list_waiting_queues")
      .then(({data}) => {
        setQueues(data.waiting_queues);
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, []);

  useEffect(() => {
    let obj: Record<string, any[]> = {};
    queues.forEach(async (q: string) => {
      fetchWrapper.get("http://localhost:7088/read_waiting_queue_items?src=" + q)
        .then(({data}) => {
          obj[q] = data.waiting_queue_items;
          if (Object.keys(obj).length === queues.length) {
            setJobs(obj);
          }
        })
        .catch((err) => { 
          console.log(err); 
        });
    })
  }, [queues]);

  return (
    <Layout>
      {queues.length === 0 ? (
        <Text>{"There's no waiting queue, or the server is not running."}</Text>
      ) : typeof jobs[queues[0]] === 'undefined' || queues.length !== Object.keys(jobs).length ? (
        <Text>{"Loading..."}</Text>
      ) : (
        <Flex h={1000}> 
          <VStack spacing='24px' p={5}>
            {queues.map((q, index) => (
              <Button 
                key={index} 
                w={120} 
                onClick={() => { setCurrentQueue(q); }} 
                isActive={currentQueue===q} 
                _active={{bg:'teal',transform: 'scale(0.98)', borderColor: 'teal',}}
              >
                {q}
              </Button>
            ))}
          </VStack>
          <Divider orientation="vertical"/>
          <VStack spacing='24px' p={5} >
            {currentQueue === "" ? (
              <Text>{"Select a queue to view its items"}</Text>
            ) : jobs[currentQueue].map((j, index) => {
              let jsonText = JSON.stringify(j);
              return (
                <HStack>
                  <VStack >
                    <IconButton
                      aria-label='Move upward'
                      icon={<TriangleUpIcon/>}
                      size='s'
                      p={1}
                      fontSize="15px"
                      onClick={() => { }}
                    />
                    <IconButton
                      aria-label='Move downward'
                      icon={<TriangleDownIcon/>}
                      size='s'
                      p={1}
                      fontSize="15px"
                      onClick={() => { }}
                    />
                  </VStack>
                  <Button key={index} w={500} h={61}>
                    {jsonText.length < 50 ? jsonText : jsonText.substring(0, 50)+" ..."}
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        </Flex>
      )}
    </Layout>
  );
};
