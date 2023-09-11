import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Flex
      bg="#7c8a94"
      p={4}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Flex
        maxW={800}
        align="center"
        m="auto"
        flex={1}
      >
        <Heading color="white">Ziggy</Heading>
        <Box ml={'auto'}>
        </Box>
      </Flex>
    </Flex>
  );
};
