import { useEffect, useState } from "react";
import { Text, HStack, Box, Flex } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import { fetchWrapper } from "./utils/fetchWrapper";

export const App = () => {
  const [queues, setQueues] = useState<string[]>([]);
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
          setJobs(obj);
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
        <HStack spacing='24px'>
          {queues.map((q) => (
            <Box key={q}>
              <Text key={q}>{q}</Text>
              {jobs[q].map((j, index) => (
                <Flex
                  key={index} 
                  w="500px"
                  p={5} 
                  shadow="md" 
                  borderWidth="1px" 
                  borderRadius="7px"
                >
                  <Box>
                    <Text key={j}>{JSON.stringify(j).substring(0, 50)}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          ))}
        </HStack>
      )}
    </Layout>
  );
};
