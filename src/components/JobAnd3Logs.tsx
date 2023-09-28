import { ArrowBackIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { VStack, IconButton, HStack, Flex, Stack, Button, Box, Text } from "@chakra-ui/react";
import JsonView from "@uiw/react-json-view";
import { nordTheme } from "@uiw/react-json-view/nord";
import { useNavigate } from "react-router-dom";
import { DeletePopoverForm } from "./DeletePopoverForm";

interface JobAnd3LogsProps {
  page: string 
  jobs: any[]
  jobNames: any[]
  index: number
  tmpdirButtonSelected: any 
  setTmpdirButtonSelected: any
  tmpdirLogSelected: any
}

export const JobAnd3Logs: React.FC<JobAnd3LogsProps> = ({ page, jobs, jobNames, index, tmpdirButtonSelected, setTmpdirButtonSelected, tmpdirLogSelected }) => {
  const navigate = useNavigate();

  return (
    <VStack
      pb={5}
      spacing={3}
      flexDir="column" 
      alignItems="flex-start" 
    >
      <IconButton
        aria-label="back to previous page"
        icon={<ArrowBackIcon/>}
        onClick={() => { 
          if (page === "f") {
            navigate("/failed"); 
          } else if (page === "c") {
            navigate("/completed"); 
          }
        }}
      />

      <HStack>
        <Text as="b">{"Filename:"}</Text>
        <Text>{`${jobNames[index]}`}</Text>
      </HStack>

      <Text as="b">{`Config:`}</Text>

      <Flex gap="20px" alignItems="flex-start">
        <Stack w="500px">
          <JsonView 
            value={jobs[ index]} 
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
            isDisabled={index===0}
            onClick={() => {
              let url = "";
              if (page === "f") {
                url = `/failed/${index-1}`;
              } else if (page === "c") {
                url = `/completed/${index-1}`; 
              }
              navigate(url, {
                state: {
                  jobs: jobs,
                  jobNames: jobNames,
                  index: index-1,
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
            isDisabled={index===jobs.length-1}
            onClick={() => {
              let url = "";
              if (page === "f") {
                url = `/failed/${index+1}`;
              } else if (page === "c") {
                url = `/completed/${index+1}`; 
              }
              navigate(url, {
                state: {
                  jobs: jobs,
                  jobNames: jobNames,
                  index: index+1,
                }
              });
            }}
          />
        </HStack>
        
        <DeletePopoverForm
          page={page}
          item_name={jobNames[index]}
          iconSize="md"
        />
      </HStack>

    </VStack>
  );
};
