import { Layout } from "../components/Layout";
import { useLocation, useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const Element = () => {
  const { state } = useLocation();
  const { queue, id } = useParams();

  return (
    <Layout>
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