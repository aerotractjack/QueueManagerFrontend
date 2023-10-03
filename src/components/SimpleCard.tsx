import { useNavigate } from "react-router-dom";
import { VStack, HStack, Button, Text } from "@chakra-ui/react";
import { DeletePopoverForm } from "./DeletePopoverForm";
import { jobButtonColor } from "../utils/jobButtonColor";

interface SimpleCardProps {
  page: string 
  jobs: any[]
  jobNames: any[]
  index: number
  colors: Record<string, string>
}

export const SimpleCard: React.FC<SimpleCardProps> = ({ page, jobs, jobNames, index, colors }) => {
  const navigate = useNavigate();

  let j = jobs[index];
  let jsonText = JSON.stringify(j, undefined, 4);
  let titles: any[] = [];
  if (typeof j["input"] !== "undefined" && typeof j["input"]["config"] !== "undefined") {
    titles = Object.keys(j["input"]["config"]);
  }
  let nTitles = titles.length;

  let buttonColor = jobButtonColor(nTitles, titles, colors);
  let titleText = "";
  for (let i = 0; i < nTitles; ++i) {
    if (i !== nTitles-1) {
      titleText += titles[i] + " → ";
    } else {
      titleText += titles[i];
    }
  }
  return (
    <HStack key={index}>
      <DeletePopoverForm
        page={page}
        item_name={jobNames[index]}
      />

      <VStack key={index}>
        <HStack w="100%" key={"title" + index}>
          <Text as="b">{titleText}</Text>
        </HStack>

        <HStack key={index}>
          <Button 
            h={120}
            bg={buttonColor}
          >
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
            bg={buttonColor}
            flexDir="column" 
            alignItems="flex-start" 
            paddingLeft={5}
            onClick={() => {
              let url = "";
              if (page === "f") {
                url = `/failed/${index}`;
              } else if (page === "c") {
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
