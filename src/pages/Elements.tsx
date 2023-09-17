import { Layout } from "../components/Layout";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { HStack, IconButton, Stack, Text, VStack, } from "@chakra-ui/react";
import { ArrowBackIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import PopoverForm from "../components/PopoverForm";
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';

export const Element = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { queue, id } = useParams();

  return (
    <Layout>
      <VStack
        spacing={3}
        flexDir="column" 
        alignItems="flex-start" 
      >
        <IconButton
          aria-label="back to previous page"
          icon={<ArrowBackIcon/>}
          onClick={() => { navigate("/waiting"); }}
        />

        <HStack>
          <Text as="b">{"Queue:"}</Text>
          <Text>{`${queue}`}</Text>
        </HStack>

        <HStack>
          <Text as="b">{"Index:"}</Text>
          <Text>{`${id}`}</Text>
        </HStack>

        <HStack>
          <Text as="b">{"Filename:"}</Text>
          <Text>{`${state.currentJobName}`}</Text>
        </HStack>

        <Text as="b">{`Item config:`}</Text>

        <Stack w="100%">
          <JsonView 
            value={JSON.parse(state.jsonText)} 
            displayObjectSize={false} 
            enableClipboard={false} 
            collapsed={10} 
            shortenTextAfterLength={120} 
            style={{fontSize: "16px", padding: 10, ...nordTheme}}
          />
        </Stack>

        <HStack m="auto" spacing={14}>
          <PopoverForm 
            queues={state.queues} 
            currentQueue={state.currentQueue} 
            currentJobName={state.currentJobName}
          />
          <HStack spacing={3}>
            <IconButton 
              aria-label="browse previous one" 
              icon={<ChevronLeftIcon />} 
              fontSize={30}
              isRound={true}
              size="md"
              isDisabled={state.index===0}
              onClick={() => {
                navigate(`/waiting/${state.currentQueue}/${state.index-1}`, {
                  state: {
                    jsonText: JSON.stringify(state.jobs[state.currentQueue][state.index-1], undefined, 4),
                    queues: state.queues,
                    currentQueue: queue,
                    jobNames: state.jobNames,
                    currentJobName: state.jobNames[state.currentQueue][state.index-1],
                    jobs: state.jobs,
                    index: state.index-1,
                  }
                });
              }}
            />
            <IconButton 
              aria-label="browse next one" 
              icon={<ChevronRightIcon />} 
              fontSize={30}
              isRound={true}
              size="md"
              isDisabled={state.index===state.jobs[state.currentQueue].length-1}
              onClick={() => {
                navigate(`/waiting/${state.currentQueue}/${state.index+1}`, {
                  state: {
                    jsonText: JSON.stringify(state.jobs[state.currentQueue][state.index+1], undefined, 4),
                    queues: state.queues,
                    currentQueue: queue,
                    jobNames: state.jobNames,
                    currentJobName: state.jobNames[state.currentQueue][state.index+1],
                    jobs: state.jobs,
                    index: state.index+1,
                  }
                });
              }}
            />
          </HStack>
        </HStack>
      </VStack>
    </Layout>
  );
};