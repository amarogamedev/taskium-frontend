import {Box, Center, Flex, HStack, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useBoard} from "../hooks/useBoard";
import {
    CalendarCheck,
    Checks,
    Clipboard,
    HourglassLow,
    ListBullets,
    PersonSimpleRun,
    SquareHalf,
    Trash
} from "phosphor-react";
import Sidebar from "../components/Sidebar.jsx";
import CreateTaskDialog from "../components/CreateTaskDialog.jsx";
import TaskDetailsDialog from "../components/TaskDetailsDialog.jsx";
import ManageBoardMembersDialog from "../components/ManageBoardMembersDialog.jsx";
import {STATUS} from "../enums/TaskStatus.js";

export function Board() {
    const {boardId} = useParams();
    const {tasks, loading, error, board, fetchBoardData} = useBoard(boardId);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (loading) {
        return (
            <Center h="200px"><Spinner size="lg"/></Center>
        );
    }

    if (error) {
        return (
            <Box p={6}>
                <Text color="accent4">An error ocurred while loading the board: {error}</Text>
            </Box>
        );
    }

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    const getIconByStatus = (status) => {
        switch (status) {
            case 'TO_DO': return <Clipboard size={32}/>
            case 'IN_PROGRESS': return <PersonSimpleRun size={32}/>
            case 'WAITING': return <HourglassLow size={32}/>
            case 'REVIEW': return <Checks size={32}/>
            case 'DONE': return <CalendarCheck size={32}/>
            case 'CANCELLED': return <Trash size={32}/>
            default: return <ListBullets size={32}/>
        }
    }

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
                                <HStack spacing={2}>
                                    {board.owner.id === userInfo.id &&
                                        <ManageBoardMembersDialog boardId={boardId} members={board?.members} onSuccess={fetchBoardData}/>
                                    }
                                    <CreateTaskDialog onSuccess={fetchBoardData} board={board}/>
                                </HStack>
                            </Flex>
                        </Box>

                        <SimpleGrid columns={6} spacing={4} flex={1} overflowX="auto">
                            {STATUS.map((column) => (
                                <Box key={column.id} border={"1px solid #e4e4e7"} borderRadius={8} bg="gray.200" px={2} mr={2}>
                                    <Flex alignItems="center" gap={2} px={2}>
                                        {getIconByStatus(column.id)}
                                        <Box p={2} my={2}>
                                            <Text fontWeight="bold">{column.label}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {getTasksByStatus(column.id).length} tasks
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Flex direction="column" gap={2}>
                                        {getTasksByStatus(column.id).map((task) => (
                                            <TaskDetailsDialog
                                                key={task.id}
                                                task={task}
                                                board={board}
                                                onSuccess={fetchBoardData}
                                            />
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
