import {Box, Button, Center, Flex, HStack, Spinner, Table, Text} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import {useBoard} from "../hooks/useBoard.js";
import {STATUS} from "../enums/TaskStatus.js";
import {PRIORITY} from "../enums/TaskPriority.js";
import {TYPE} from "../enums/TaskType.js";
import {getTypeIcon} from "../utils/typeUtils.jsx";
import {getStatusIcon} from "../utils/statusUtils.jsx";
import {getPriorityIcon} from "../utils/priorityUtils.jsx";
import {ClipboardText, SquareHalf} from "phosphor-react";

function Backlog() {
    const navigate = useNavigate();
    const {boardKey} = useParams();
    const {tasks, loading, error, board} = useBoard(boardKey, true);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString();
    };

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
                <Box mb={4}>
                    <Flex justifyContent="space-between" mb={8} h={8}>
                        <Box h={16}>
                            <Flex alignItems="center" gap={3} mb={1}>
                                <ClipboardText size={24} color={"#FF5700"}/>
                                <Text color="accent2" fontSize="2xl" fontWeight="black">{board?.key}</Text>
                                <Text fontSize="2xl">
                                    {board?.name}
                                </Text>
                            </Flex>
                        </Box>
                        <HStack spacing={2}>
                            <Button variant="outline" onClick={() => {navigate(`/board/${boardKey}`);}}>
                                <SquareHalf size={24}/>
                                Board delivery
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
                <Table.Root border="1px solid #e4e4e7">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Task ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Title</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
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
                                <Table.Cell>{task.internalId}</Table.Cell>
                                <Table.Cell>{task.title}</Table.Cell>
                                <Table.Cell>
                                    <Flex gap={2}>
                                        {getTypeIcon(task.type)}
                                        {TYPE.find(t => t.id === task.type)?.label}
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell>
                                    <Flex gap={2}>
                                        {getStatusIcon(task.status)}
                                        {STATUS.find(s => s.id === task.status)?.label}
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell>
                                    <Flex gap={2}>
                                        {getPriorityIcon(task.priority)}
                                        {PRIORITY.find(p => p.id === task.priority)?.label}
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell>{task.assignedUserName}</Table.Cell>
                                <Table.Cell>{task.createdByUserName}</Table.Cell>
                                <Table.Cell>{formatDate(task.creationDate)}</Table.Cell>
                                <Table.Cell>{formatDate(task.dueDate)}</Table.Cell>
                                <Table.Cell>{formatDate(task.completedDate)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    );
}

export default Backlog;
