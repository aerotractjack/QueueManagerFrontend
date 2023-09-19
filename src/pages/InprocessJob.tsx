import { useLocation, useNavigate } from "react-router-dom";
import { VStack, IconButton, HStack, Stack, Text, Flex, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import JsonView from "@uiw/react-json-view";
import { nordTheme } from "@uiw/react-json-view/nord";
import { Layout } from "../components/Layout";


export const InprocessJob = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
          onClick={() => { navigate("/inprocess"); }}
        />

        <HStack>
          <Text as="b">{"Device:"}</Text>
          <Text>{`${state.devices[state.index]}`}</Text>
        </HStack>

        <Text as="b">{`Config:`}</Text>

        <Stack w="100%">
          <JsonView 
            value={state.jobs[state.index]} 
            displayObjectSize={false} 
            displayDataTypes={false}
            enableClipboard={true} 
            collapsed={10} 
            shortenTextAfterLength={120} 
            style={{fontSize: "16px", padding: 10, borderRadius: "10px", ...nordTheme}}
          />
        </Stack>

        <Flex m="auto" gap={4}>
          <VStack>
            <Text as="b">{`Ouput:`}</Text>
            <Button 
              // flexDir="column" 
              // alignItems="flex-start" 
              // paddingLeft={5}
            >
              <Text 
                noOfLines={5} 
                textAlign="left"
                whiteSpace="break-spaces"
              >
                {"..."}
              </Text>
            </Button>
          </VStack>
          <VStack>
            <Text as="b">{`Error:`}</Text>
            <Button 
              // flexDir="column" 
              // alignItems="flex-start" 
              // paddingLeft={5}
            >
              <Text 
                noOfLines={5} 
                textAlign="left"
                whiteSpace="break-spaces"
              >
                {"..."}
              </Text>
            </Button>
          </VStack>
          <VStack>
            <Text as="b">{`Except:`}</Text>
            <Button 
              // flexDir="column" 
              // alignItems="flex-start" 
              // paddingLeft={5}
            >
              <Text 
                noOfLines={5} 
                textAlign="left"
                whiteSpace="break-spaces"
              >
                {"..."}
              </Text>
            </Button>
          </VStack>

        </Flex>

        <HStack m="auto" spacing={14}>
          <HStack spacing={3}>
            <IconButton 
              aria-label="browse previous one" 
              icon={<ChevronLeftIcon />} 
              fontSize={30}
              isRound={true}
              size="md"
              isDisabled={state.index===0}
              onClick={() => {
                navigate(`/inprocess/${state.index-1}`, {
                  state: {
                    jobs: state.jobs,
                    devices: state.devices,
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
              isDisabled={state.index===state.jobs.length-1}
              onClick={() => {
                navigate(`/inprocess/${state.index+1}`, {
                  state: {
                    jobs: state.jobs,
                    devices: state.devices,
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
