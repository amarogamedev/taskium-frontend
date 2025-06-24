import {Box, Center, Flex, Spinner, Text} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {useParams} from "react-router-dom";
import {useBoard} from "../hooks/useBoard.js";

function Backlog() {
    const {boardId} = useParams();
    const {tasks, loading, error, board} = useBoard(boardId, true);

    if (loading) {
        return (
            <Center h="200px"><Spinner size="lg"/></Center>
        );
    }

    if (error) {
        return (
            <Box p={6}>
                <Text color="accent4">An error ocurred while loading the backlog: {error}</Text>
            </Box>
        );
    }

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
        </Flex>
    );
}

export default Backlog;
