import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

function Backlog() {
  return (
    <Flex minH="100vh" bg="gray.100">
      <Sidebar />
    </Flex>
  );
}

export default Backlog;
