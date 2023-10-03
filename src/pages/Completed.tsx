import { Flex, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SimpleCard } from "../components/SimpleCard";
import { Layout } from "../components/Layout";
import { fetchWrapper } from "../utils/fetchWrapper";
import { useColors } from "../hooks/useColors";

export const Completed = () => {
  const { state } = useLocation();
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobNames, setJobNames] = useState<string[]>([]);
  const [reload, setReload] = useState(false);
  const [colors] = useColors();

  useEffect(() => {
    if (typeof state?.reload !== "undefined" && state.reload) {
      setReload(r => !r);
    }
  }, [state?.reload])

  useEffect(() => {
    fetchWrapper.get("http://localhost:7088/completed_queue_items")
      .then(({data}) => {
        setJobs(data.completed_queue_items);
        setJobNames(data.completed_queue_item_names); 
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, [reload]);

  return (
    <Layout>
      {jobs.length === 0 ? (
        <Text>{"There's no job in the completed queue, or the server is not running."}</Text>
      ) : (
        <Flex> 
          <VStack spacing='24px' pb={5} >
            {jobs.map((j, index) => {
              return (
                <SimpleCard
                  page="c"
                  key={index}
                  jobs={jobs}
                  jobNames={jobNames}
                  index={index}
                  colors={colors}
                />
              );
            })}
          </VStack>
        </Flex>
      )}
    </Layout>
  );
};
