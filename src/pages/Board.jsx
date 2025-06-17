import {Box, Button, Card, Center, Flex, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useBoard} from "../hooks/useBoard";
import {Calendar, CaretDoubleUp, CaretDown, CaretUp, Plus, SquareHalf, User, Warning} from "phosphor-react";
import Sidebar from "../components/Sidebar.jsx";

const COLUMNS = [
    {id: "TO_DO", label: "To Do"},
    {id: "IN_PROGRESS", label: "In Progress"},
    {id: "WAITING", label: "Waiting"},
    {id: "REVIEW", label: "Review"},
    {id: "DONE", label: "Done"},
    {id: "CANCELLED", label: "Cancelled"}
];

const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL': return "#FF0C00";
        case 'HIGH': return "#FF5700";
        case 'MEDIUM': return "#FFD100";
        case 'LOW': return "#0000FF";
    }
};

const getPriorityIcon = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return <Warning size={16} color={getPriorityColor(priority)} />;
        case 'HIGH':
            return <CaretDoubleUp size={16} color={getPriorityColor(priority)} />;
        case 'MEDIUM':
            return <CaretUp size={16} color={getPriorityColor(priority)} />;
        case 'LOW':
            return <CaretDown size={16} color={getPriorityColor(priority)} />;
    }
};

export function Board() {
    const {boardId} = useParams();
    const {tasks, loading, error, board} = useBoard(boardId);

    if (loading) {
        return (
            <Center h="200px"><Spinner size="lg"/></Center>
        );
    }

    if (error) {
        return (
            <Box p={6}>
                <Text color="red.500">An error ocurred while loading the board: {error}</Text>
            </Box>
        );
    }

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
            <Box flex={1} pl="280px">
                <Box p={6}>
                    <Flex direction="column" h="100vh">
                        <Box mb={4}>
                            <Flex justifyContent="space-between" mb={8} h={8}>
                                <Box h={16}>
                                    <Flex alignItems="center" gap={3} mb={1}>
                                        <SquareHalf size={24} color={"#FF5700"}/>
                                        <Text color="accent2" fontSize="2xl" fontWeight="black">{board?.key}</Text>
                                        <Text fontSize="2xl">
                                            {board?.name}
                                        </Text>
                                    </Flex>
                                    <Text color="gray.600" fontSize="sm">
                                        Total task count: {board?.taskCount}
                                    </Text>
                                </Box>
                                <Button bg={"accent"}>
                                    <Plus size={16}/>
                                    Create new task
                                </Button>
                            </Flex>
                        </Box>

                        <SimpleGrid columns={6} spacing={4} flex={1} overflowX="auto">
                            {COLUMNS.map((column) => (
                                <Box key={column.id} border={"1px solid #e4e4e7"} borderRadius={8} bg="gray.200" px={2} mr={2}>
                                    <Box p={2} mb={2}>
                                        <Text fontWeight="bold">{column.label}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {getTasksByStatus(column.id).length} tasks
                                        </Text>
                                    </Box>

                                    <Flex direction="column" gap={2}>
                                        {getTasksByStatus(column.id).map((task) => (
                                            <Card.Root key={task.id}>
                                                <Card.Body p={4}>
                                                    <Flex gap={2} mb={2} align="center">
                                                        {getPriorityIcon(task.priority)}
                                                        <Text color={getPriorityColor(task.priority)} fontSize="sm">
                                                            {board?.key}-{task.id}
                                                        </Text>
                                                    </Flex>
                                                    <Text mb={2}>
                                                        {task.title}
                                                    </Text>
                                                    {task.parentTaskId && <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
                                                        Parent task: {task.parentTaskId}
                                                    </Text>}
                                                    <Flex justifyContent="space-between" align="center">
                                                        <Flex align="center" gap={1}>
                                                            <User size={16} color={"#0000FF"}/>
                                                            <Text fontSize="sm" color="gray.600">
                                                                {task.assignedUserName || 'Não atribuído'}
                                                            </Text>
                                                        </Flex>
                                                        {task.dueDate && (
                                                            <Flex align="center" gap={2}>
                                                                <Calendar size={16} color={"#FF5700"}/>
                                                                <Text fontSize="sm" color="gray.600">
                                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                                </Text>
                                                            </Flex>
                                                        )}
                                                    </Flex>
                                                </Card.Body>
                                            </Card.Root>
                                        ))}
                                    </Flex>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default Board;


