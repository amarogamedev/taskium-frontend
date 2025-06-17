import {Box, Card, CloseButton, Dialog, Flex, Grid, GridItem, Portal, Spinner, Text} from "@chakra-ui/react";
import {useTaskDetails} from "../hooks/useTaskDetails";
import {useEffect} from "react";
import {Calendar, CaretDoubleUp, CaretDown, CaretUp, Intersect, User, Warning} from "phosphor-react";
import { STATUS } from "../enums/TaskStatus";

const getPriorityColor = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return "#FF0C00";
        case 'HIGH':
            return "#FF5700";
        case 'MEDIUM':
            return "#FFD100";
        case 'LOW':
            return "#0000FF";
    }
};

const getPriorityIcon = (priority) => {
    switch (priority?.toUpperCase()) {
        case 'CRITICAL':
            return <Warning size={16} color={getPriorityColor(priority)}/>;
        case 'HIGH':
            return <CaretDoubleUp size={16} color={getPriorityColor(priority)}/>;
        case 'MEDIUM':
            return <CaretUp size={16} color={getPriorityColor(priority)}/>;
        case 'LOW':
            return <CaretDown size={16} color={getPriorityColor(priority)}/>;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
};

const getStatusLabel = (statusValue) => {
    const status = STATUS.find(s => s.value === statusValue);
    return status?.label || statusValue;
};

const InfoRow = ({label, value, icon}) => (<Flex gap={2} alignItems="center">
        {icon && <Box>{icon}</Box>}
        <Text fontWeight="bold" color="gray.600">{label}:</Text>
        <Text>{value || '-'}</Text>
    </Flex>);

export default function TaskDetailsDialog({task, boardKey}) {
    const {task: taskDetails, loading, error, fetchTaskDetails} = useTaskDetails();

    useEffect(() => {
        fetchTaskDetails(task.id);
    }, []);

    return (<Dialog.Root>
            <Dialog.Trigger asChild>
                <Card.Root
                    cursor="pointer"
                    _hover={{transform: 'scale(1.02)'}}
                    transition="transform 0.2s"
                >
                    <Card.Body p={4}>
                        <Flex gap={2} mb={2} align="center">
                            {getPriorityIcon(task.priority)}
                            <Text color={getPriorityColor(task.priority)} fontSize="sm">
                                {boardKey}-{task.id}
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
                                <User size={16} color={task.assignedUserId ? "#0000FF" : "#52525b"}/>
                                <Text fontSize="sm" color="gray.600">
                                    {task.assignedUserName}
                                </Text>
                            </Flex>
                            {task.dueDate && (<Flex align="center" gap={2}>
                                    <Calendar size={16} color={"#FF5700"}/>
                                    <Text fontSize="sm" color="gray.600">
                                        {new Date(task.dueDate).toLocaleDateString()}
                                    </Text>
                                </Flex>)}
                        </Flex>
                    </Card.Body>
                </Card.Root>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content maxW="5xl">
                        <Dialog.Header borderBottom="1px solid" borderColor="gray.200" mb={4}>
                            <Flex gap={3} align="center">
                                <Intersect size={24} color={"#0000FF"}/>
                                <Text fontSize="2xl">
                                    {boardKey}-{task.id}
                                </Text>
                            </Flex>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm"/>
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <Dialog.Body>
                            {loading ? (<Flex justify="center" py={8}>
                                    <Spinner size="lg"/>
                                </Flex>) : error ? (<Text color="accent4">{error}</Text>) : taskDetails && (
                                <Grid templateColumns="2fr 1fr" gap={8}>
                                    {/* Coluna da Esquerda */}
                                    <GridItem>
                                        <Text fontSize="2xl" mb={6}>
                                            {taskDetails.title}
                                        </Text>

                                        <Box>
                                            <Text fontWeight="medium" color="gray.700" mb={2}>
                                                Descrição
                                            </Text>
                                            <Text
                                                whiteSpace="pre-wrap"
                                                bg="gray.100"
                                                p={4}
                                                borderRadius="md"
                                                minH="200px"
                                            >
                                                {taskDetails.description || 'Sem descrição'}
                                            </Text>
                                        </Box>
                                    </GridItem>

                                    {/* Coluna da Direita */}
                                    <GridItem>
                                        <Box
                                            bg="gray.100"
                                            p={4}
                                            borderRadius="md"
                                            h={"100%"}
                                        >
                                            <Grid gap={4}>
                                                <InfoRow
                                                    label="Status"
                                                    value={getStatusLabel(taskDetails.status)}
                                                />
                                                <InfoRow
                                                    label="Priority"
                                                    value={taskDetails.priority}
                                                    icon={getPriorityIcon(taskDetails.priority)}
                                                />
                                                <InfoRow
                                                    label="Assigned to"
                                                    value={taskDetails.assignedUserName}
                                                    icon={<User size={16}/>}
                                                />
                                                <InfoRow
                                                    label="Created by"
                                                    value={taskDetails.createdByUserName}
                                                    icon={<User size={16}/>}
                                                />
                                                <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                                                    <InfoRow
                                                        label="Creation Date"
                                                        value={formatDate(taskDetails.creationDate)}
                                                        icon={<Calendar size={16}/>}
                                                    />
                                                    <Box mt={2}>
                                                        <InfoRow
                                                            label="Due Date"
                                                            value={formatDate(taskDetails.dueDate)}
                                                            icon={<Calendar size={16}/>}
                                                        />
                                                    </Box>
                                                    {taskDetails.completedDate && (<Box mt={2}>
                                                            <InfoRow
                                                                label="Completed Date"
                                                                value={formatDate(taskDetails.completedDate)}
                                                                icon={<Calendar size={16}/>}
                                                            />
                                                        </Box>)}
                                                </Box>
                                                {taskDetails.parentTaskId && (
                                                    <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                                                        <InfoRow
                                                            label="Parent Task"
                                                            value={`${boardKey}-${taskDetails.parentTaskId}`}
                                                        />
                                                    </Box>)}
                                            </Grid>
                                        </Box>
                                    </GridItem>
                                </Grid>)}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>);
}
