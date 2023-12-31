import { useLocation, useNavigate } from "react-router-dom";
import { VStack, IconButton, HStack, Stack, Text, Flex, Box, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import JsonView from "@uiw/react-json-view";
import { nordTheme } from "@uiw/react-json-view/nord";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import { fetchWrapper } from "../utils/fetchWrapper";

interface TmpdirLog {
  error: string 
  exception: string
  output: string 
}

export const InprocessJob = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [tmpdirLog, setTmpdirLog] = useState<TmpdirLog>({} as TmpdirLog);
  const [tmpdirButtonSelected, setTmpdirButtonSelected] = useState<keyof TmpdirLog>("output");
  const [tmpdirLogSelected, setTmpdirLogSelected] = useState("");

  let src = "";
  if (typeof state.jobs[state.index]["tmpdir"] !== "undefined") {
    src = state.jobs[state.index]["tmpdir"];
  }

  useEffect(() => {
    setTmpdirLog({} as TmpdirLog);
    fetchWrapper.get("http://localhost:7088/read_tmpdir?src="+src)
      .then(({data}) => {
        setTmpdirLog(data);
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, [src]);

  useEffect(() => {
    if (Object.keys(tmpdirLog).length === 3) {
      if (tmpdirButtonSelected === "output") {
        setTmpdirLogSelected(tmpdirLog["output"]);
      } else if (tmpdirButtonSelected === "error") {
        setTmpdirLogSelected(tmpdirLog["error"]);
      } else if (tmpdirButtonSelected === "exception") {
        setTmpdirLogSelected(tmpdirLog["exception"]);
      }
    }
  }, [tmpdirButtonSelected, tmpdirLog]);

  return (
    <Layout>
      {Object.keys(tmpdirLog).length !== 3 ? (
        <Text>{"loading..."}</Text>
      ) : (
      <VStack
        pb={5}
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

        <Flex gap="20px" alignItems="flex-start">
          <Stack w="500px">
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

          <Flex gap={4} flexDir="column">
            <Flex justify="space-evenly">
              <Button 
                onClick={() => { setTmpdirButtonSelected("output") }}
                isActive={tmpdirButtonSelected==="output"} 
                _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}  
              >
                {'Output'}
              </Button>
              <Button 
                onClick={() => { setTmpdirButtonSelected("error") }}
                isActive={tmpdirButtonSelected==="error"} 
                _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}  
              >
                {'Error'}
              </Button>
              <Button 
                onClick={() => { setTmpdirButtonSelected("exception") }}
                isActive={tmpdirButtonSelected==="exception"} 
                _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}  
              >
                {'Except'}
              </Button>
            </Flex>
            
            <Box bg="gray" p={2} borderRadius="10px" w="480px">
              <Text 
                textAlign="left"
                whiteSpace="break-spaces"
              >
                {tmpdirLogSelected.length === 0 ? " " : tmpdirLogSelected}
              </Text>
            </Box>
          </Flex>
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
      )}
    </Layout>
  );
};
