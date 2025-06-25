import {Box, Center, Flex, Spinner, Table, Text} from "@chakra-ui/react";
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
            <Box p={6} pl="304px" w={"100%"}>
                <Table.Root border="1px solid #e4e4e7">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Board ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Task ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                            <Table.ColumnHeader>Priority</Table.ColumnHeader>
                            <Table.ColumnHeader>Assigned user</Table.ColumnHeader>
                            <Table.ColumnHeader>Author</Table.ColumnHeader>
                            <Table.ColumnHeader>Creation date</Table.ColumnHeader>
                            <Table.ColumnHeader>Due date</Table.ColumnHeader>
                            <Table.ColumnHeader>Completed date</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tasks.map((task) => (
                            <Table.Row key={task.id}>
                                <Table.Cell>{boardId}</Table.Cell>
                                <Table.Cell>{task.id}</Table.Cell>
                                <Table.Cell>{task.title}</Table.Cell>
                                <Table.Cell>{task.status}</Table.Cell>
                                <Table.Cell>{task.priority}</Table.Cell>
                                <Table.Cell>{task.assignedUserName}</Table.Cell>
                                <Table.Cell>{task.createdByUserName}</Table.Cell>
                                <Table.Cell>{task.creationDate}</Table.Cell>
                                <Table.Cell>{task.dueDate}</Table.Cell>
                                <Table.Cell>{task.completedDate}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    );
}

export default Backlog;
