import {Box, Button, Center, Flex, HStack, SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useBoard} from "../hooks/useBoard";
import {ClipboardText, SquareHalf} from "phosphor-react";
import Sidebar from "../components/Sidebar.jsx";
import CreateTaskDialog from "../components/dialogs/CreateTaskDialog.jsx";
import TaskDetailsDialog from "../components/dialogs/TaskDetailsDialog.jsx";
import ManageBoardMembersDialog from "../components/dialogs/ManageBoardMembersDialog.jsx";
import {STATUS} from "../enums/TaskStatus.js";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useTask} from "../hooks/useTask.js";
import {useEffect, useState} from "react";
import {getStatusIcon} from "../utils/statusUtils.jsx";

const DraggableTask = ({ task, board, onSuccess }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <TaskDetailsDialog
                key={task.id}
                initialTask={task}
                board={board}
                onSuccess={onSuccess}
                isDialog={false}
            />
        </div>
    );
};

const DroppableColumn = ({ status, children, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <Box 
            ref={drop} 
            key={status.id} 
            border={"1px solid #e4e4e7"} 
            borderRadius={8} 
            bg={isOver ? "gray.300" : "gray.200"} 
            px={2} 
            mr={2}
        >
            {children}
        </Box>
    );
};

export function Board() {
    const [pendingStatusChange, setPendingStatusChange] = useState(null);
    const {boardKey} = useParams();
    const {tasks, loading, error, board, fetchBoardData} = useBoard(boardKey, false);
    const {task, setTask, handleSave } = useTask(null, false, fetchBoardData, board);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
            if(pendingStatusChange && task.status !== pendingStatusChange.id) {
                const updatedTask = { ...task, status: pendingStatusChange.id };
                setTask(updatedTask);
                handleSave(updatedTask).catch(error =>
                    console.error("Error updating task status:", error)
                );
                setPendingStatusChange(null);
            }
            setTask(null);
        }
    }, [task]);

    const handleTaskDrop = (taskId, newStatus) => {
        const selectedTask = tasks.find(task => task.id === taskId);
        setTask(selectedTask);
        setPendingStatusChange(newStatus);
    };

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

    return (
        <DndProvider backend={HTML5Backend}>
            <Flex minH="100vh" bg="gray.100">
                <Sidebar/>
                <Box flex={1} pl="280px">
                    <Box p={6}>
                        <Flex direction="column" h="100vh">
                            <Flex justifyContent="space-between" mb={8} h={8}>
                                <Box h={16}>
                                    <Flex alignItems="center" gap={3} mb={1}>
                                        <SquareHalf size={24} color={"#FF5700"}/>
                                        <Text color="accent2" fontSize="2xl" fontWeight="black">{board?.key}</Text>
                                        <Text fontSize="2xl">
                                            {board?.name}
                                        </Text>
                                    </Flex>
                                </Box>
                                <HStack spacing={2}>
                                    <Button variant="outline" onClick={() => {navigate(`/backlog/${boardKey}`);}}>
                                        <ClipboardText size={24}/>
                                        Backlog
                                    </Button>
                                    {board.owner.id === userInfo.id &&
                                        <ManageBoardMembersDialog boardKey={boardKey} members={board?.members} onSuccess={fetchBoardData}/>
                                    }
                                    <CreateTaskDialog onSuccess={fetchBoardData} board={board}/>
                                </HStack>
                            </Flex>

                            <SimpleGrid columns={STATUS.length} spacing={4} flex={1} overflowX="auto">
                                {STATUS.map((column) => (
                                    <DroppableColumn 
                                        key={column.id} 
                                        status={column} 
                                        onDrop={handleTaskDrop}
                                    >
                                        <Flex alignItems="center" gap={2} px={2} my={4}>
                                            {getStatusIcon(column.id)}
                                            <Text fontWeight="bold">{column.label}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {getTasksByStatus(column.id).length} tasks
                                            </Text>
                                        </Flex>

                                        <Flex direction="column" gap={2}>
                                            {getTasksByStatus(column.id).map((task) => (
                                                <DraggableTask
                                                    key={task.id}
                                                    task={task}
                                                    board={board}
                                                    onSuccess={fetchBoardData}
                                                />
                                            ))}
                                        </Flex>
                                        <CreateTaskDialog onSuccess={fetchBoardData} board={board} columnId={column.id}/>
                                    </DroppableColumn>
                                ))}
                            </SimpleGrid>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </DndProvider>
    );
}

export default Board;





