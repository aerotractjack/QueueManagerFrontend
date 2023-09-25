import { Flex, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeletePopoverForm } from "../components/DeletePopoverForm";
import { Layout } from "../components/Layout";
import { fetchWrapper } from "../utils/fetchWrapper";

export const Failed = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobNames, setJobNames] = useState<string[]>([]);

  useEffect(() => {
    fetchWrapper.get("http://localhost:7088/read_failed_queue_items")
      .then(({data}) => {
        setJobs(data.failed_queue_items);
        setJobNames(data.failed_queue_item_names); 
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, []);

  return (
    <Layout>
      {jobs.length === 0 ? (
        <Text>{"There's no job in the failed queue, or the server is not running."}</Text>
      ) : (
        <Flex> 
          <VStack spacing='24px' pb={5} >
            {jobs.map((j, index) => {
              let jsonText = JSON.stringify(j, undefined, 4);
              let configTitles: any[] = [];
              if (typeof j["input"] !== "undefined" && typeof j["input"]["config"] !== "undefined") {
                configTitles = Object.keys(j["input"]["config"]);
              }
              return (
                <HStack key={index}>
                  <DeletePopoverForm
                    page="f"
                    item_name={jobNames[index]}
                  />

                  <VStack key={index}>
                    <HStack w="100%" key={"title" + index}>
                      {configTitles.map((key, index) => {
                        if (index !== configTitles.length-1) {
                          return (
                            <Text as="b" key={"title" + index}>{key + " → "}</Text>
                          );
                        } else {
                          return (
                            <Text as="b" key={"title" + index}>{key}</Text>
                          );
                        }
                      })}
                    </HStack>

                    <HStack key={index}>
                      <Button h={120}>
                        <VStack
                          flexDir="column" 
                          alignItems="flex-start" 
                        >
                          <Text
                            aria-valuetext={jobNames[index]}
                            w={120}
                            noOfLines={3} 
                            whiteSpace="break-spaces"
                          >
                            {`filename ${jobNames[index]}`}
                          </Text>
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
                          navigate(`/failed/${index}`, {
                            state: {
                              jobs,
                              jobNames,
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
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
        </Flex>
      )}
    </Layout>
  );
};
