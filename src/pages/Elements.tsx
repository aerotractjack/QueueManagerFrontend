import { Layout } from "../components/Layout";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IconButton, Text, } from "@chakra-ui/react";
import { ArrowBackIcon, } from "@chakra-ui/icons";
import PopoverForm from "../components/PopoverForm";

export const Element = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { queue, id } = useParams();

  return (
    <Layout>
      <IconButton
        aria-label="back to previous page"
        icon={<ArrowBackIcon/>}
        onClick={() => { navigate(-1); }}
      />

      <PopoverForm 
        queues={state.queues} 
        currentQueue={state.currentQueue} 
        currentJob={state.currentJob}
      />

      <Text>{`Queue: ${queue}`}</Text>
      <Text>{`Item order: ${id}`}</Text>
      <Text>{`Item config:`}</Text>
      <Text 
        textAlign="left"
        whiteSpace="break-spaces"
      >
        {state.jsonText}
      </Text>
    </Layout>
  );
};