import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, HStack, Flex, IconButton, VStack, Divider, Button  } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Layout } from "../components/Layout";
import { fetchWrapper } from "../utils/fetchWrapper";
import PopoverForm from "../components/PopoverForm";

export const Waiting = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState<string[]>([]);
  const [currentQueue, setCurrentQueue] = useState("");
  const [jobs, setJobs] = useState<Record<string, any[]>>({});
  const [jobNames, setJobNames] = useState<Record<string, any[]>>({});

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
    let obj_jobNames: Record<string, any[]> = {};
    queues.forEach(async (q: string) => {
      fetchWrapper.get("http://localhost:7088/read_waiting_queue_items?src=" + q)
        .then(({data}) => {
          obj[q] = data.waiting_queue_items;
          obj_jobNames[q] = data.waiting_queue_item_names;
          if (Object.keys(obj).length === queues.length) {
            setJobs(obj);
            setJobNames(obj_jobNames); 
          }
        })
        .catch((err) => { 
          console.log(err); 
        });
    })
  }, [queues]);

  const swapJob = (a: string, a_num: number, b: string, b_num: number, a_index: number, b_index: number) => {
    let jsonData = { a, a_num, b, b_num };
    fetchWrapper.post("http://localhost:7088/swap_waiting_q_items", jsonData)
      .then( ({data}) => {
        console.log(data.success);
        let copy = JSON.parse(JSON.stringify(jobs));
        copy[a][a_index] = jobs[b][b_index];
        copy[b][b_index] = jobs[a][a_index];
        setJobs(copy);
      })
      .catch((err) => { 
        console.log(err); 
      });
  };

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
              let jsonText = JSON.stringify(j, undefined, 4);
              return (
                <HStack key={index}>
                  <VStack >
                    <IconButton
                      aria-label='Move upward'
                      icon={<TriangleUpIcon/>}
                      size='s'
                      p={1}
                      fontSize="15px"
                      isDisabled={index===0}
                      onClick={() => { 
                        swapJob(currentQueue, jobNames[currentQueue][index], currentQueue, jobNames[currentQueue][index-1], index , index-1); 
                      }}
                    />
                    <IconButton
                      aria-label='Move downward'
                      icon={<TriangleDownIcon/>}
                      size='s'
                      p={1}
                      fontSize="15px"
                      isDisabled={index===jobNames[currentQueue].length-1}
                      onClick={() => { 
                        swapJob(currentQueue, jobNames[currentQueue][index], currentQueue, jobNames[currentQueue][index+1], index, index+1); 
                      }}
                    />
                    <PopoverForm 
                      queues={queues} 
                      currentQueue={currentQueue} 
                      currentJobName={jobNames[currentQueue][index]}
                      iconSize="xs"
                      iconFontSize={15}
                    />
                  </VStack>
                  <Button h={120}>
                    <VStack
                      flexDir="column" 
                      alignItems="flex-start" 
                    >
                      <Text>{`index ${index}`}</Text>
                      <Text>{`filename ${jobNames[currentQueue][index]}`}</Text>
                    </VStack>
                  </Button>
                  <Button 
                    key={index} 
                    w={600} 
                    h={120} 
                    flexDir="column" 
                    alignItems="flex-start" 
                    paddingLeft={5}
                    onClick={() => {
                      navigate(`/waiting/${currentQueue}/${index}`, {
                        state: {
                          jsonText, 
                          queues,
                          currentQueue,
                          jobNames,
                          currentJobName: jobNames[currentQueue][index],
                          jobs,
                          index,
                        }
                      });
                    }}
                  >
                    <Text 
                      w={580}
                      noOfLines={5} 
                      textAlign="left"
                      whiteSpace="break-spaces"
                    >
                      {jsonText.length < 120 ? jsonText : jsonText.substring(0, 120)+" ..."}
                    </Text>
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
