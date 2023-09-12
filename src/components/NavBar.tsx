import React, { useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = () => {
  const pages = ["waiting", "inprocess", "failed"];
  const [currentPage, setCurrentPage] = useState(pages[0]);
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
        <Heading color="white" marginRight={10}>
          Ziggy
        </Heading>
        <Button
          w={120} 
          marginRight={5}
          onClick={() => { setCurrentPage(pages[0]); }} 
          bg="#89969F"
          color="white"
          isActive={currentPage===pages[0]} 
          _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}
        >
          {"Waiting"}
        </Button>
        <Button
          w={120}
          marginRight={5}
          onClick={() => { setCurrentPage(pages[1]); }} 
          bg="#89969F"
          color="white"
          isActive={currentPage===pages[1]} 
          _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}
        >
          {"Inprocess"}
        </Button>
        <Button
          w={120} 
          onClick={() => { setCurrentPage(pages[2]); }} 
          bg="#89969F"
          color="white"
          isActive={currentPage===pages[2]} 
          _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}
        >
          {"Failed"}
        </Button>
      </Flex>
    </Flex>
  );
};
