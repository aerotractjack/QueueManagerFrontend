import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pages = ["waiting", "inprocess", "failed"];
  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    setCurrentPage(location.pathname.substring(1));
  }, [location]);

  return (
    <>
    <Flex
      bg="#7c8a94"
      p={4}
      zIndex={1}
      position="sticky"
      top={0}
    >
      <Flex
        maxW="1000px"
        align="center"
        m="auto"
        flex={1}
      >
        <Heading color="white" marginRight={10}>
          <ChakraLink as={Link} to="/">
            Ziggy
          </ChakraLink>
        </Heading>
        <Button
          w={120} 
          marginRight={5}
          onClick={() => { setCurrentPage(pages[0]); navigate("/waiting"); }} 
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
          onClick={() => { setCurrentPage(pages[1]); navigate("/inprocess"); }} 
          bg="#89969F"
          color="white"
          isActive={currentPage===pages[1]} 
          _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}
        >
          {"Inprocess"}
        </Button>
        <Button
          w={120} 
          onClick={() => { setCurrentPage(pages[2]); navigate("/failed"); }} 
          bg="#89969F"
          color="white"
          isActive={currentPage===pages[2]} 
          _active={{bg:'pink', color: 'black', transform: 'scale(0.98)',}}
        >
          {"Failed"}
        </Button>
      </Flex>
    </Flex>
    <Outlet/>
    </>
  );
};
