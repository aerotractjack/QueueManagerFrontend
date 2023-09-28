import { useNavigate } from "react-router-dom";
import { VStack, HStack, Button, Text } from "@chakra-ui/react";
import { DeletePopoverForm } from "./DeletePopoverForm";

interface SimpleCardProps {
  page: string 
  jobs: any[]
  jobNames: any[]
  index: number
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ page, jobs, jobNames, index }) => {
  const navigate = useNavigate();
  let j = jobs[index];
  let jsonText = JSON.stringify(j, undefined, 4);
  let configTitles: any[] = [];
  if (typeof j["input"] !== "undefined" && typeof j["input"]["config"] !== "undefined") {
    configTitles = Object.keys(j["input"]["config"]);
  }
  return (
    <HStack key={index}>
      <DeletePopoverForm
        page={page}
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
              let url = "";
              if (page === "c") {
                url = `/completed/${index}`;
              }
              navigate(url, {
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
};
