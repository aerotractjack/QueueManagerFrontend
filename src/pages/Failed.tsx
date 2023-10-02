import { Flex, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { SimpleCard } from "../components/SimpleCard";
import { fetchWrapper } from "../utils/fetchWrapper";

export const Failed = () => {
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
              return (
                <SimpleCard
                  page="f"
                  key={index}
                  jobs={jobs}
                  jobNames={jobNames}
                  index={index}
                />
              );
            })}
          </VStack>
        </Flex>
      )}
    </Layout>
  );
};
