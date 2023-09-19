import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text, HStack, Flex, VStack, Button } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { fetchWrapper } from "../utils/fetchWrapper";

export const Inprocess = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [devices, setDevices] = useState<string[]>([]);

  useEffect(() => {
    fetchWrapper.get("http://localhost:7088/read_inprocess_queue_items")
      .then(({data}) => {
        setJobs(data.inprocess_queue_items);
        setDevices(data.inprocess_queue_devices); 
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, []);

  return (
    <Layout>
      {jobs.length === 0 ? (
        <Text>{"There's no inprocess queue, or the server is not running."}</Text>
      ) : (
        <Flex h={1000}> 
          <VStack spacing='24px' p={5} >
            {jobs.map((j, index) => {
              let jsonText = "";
              if (typeof j["config"] !== "undefined") {
                jsonText = JSON.stringify(j["config"], undefined, 4);
              }
              return (
                <HStack key={index}>
                  <Button h={120}>
                    <VStack
                      flexDir="column" 
                      alignItems="flex-start" 
                    >
                      <Text>{`device ${devices[index]}`}</Text>
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
