import React from "react";
import { Box } from "@chakra-ui/react";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box
        mt={8}
        mx="auto"
        maxW="800px"
        w="100%"
      >
        {children}
      </Box>
    </>
  );
};
