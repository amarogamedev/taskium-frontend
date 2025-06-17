import {
    Box,
    Button,
    Card,
    CloseButton,
    createListCollection,
    Dialog,
    Field,
    Flex,
    Grid,
    GridItem,
    Input,
    Portal,
    Select,
    Spinner,
    Text,
    Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import {Calendar, CaretDoubleUp, CaretDown, CaretUp, FloppyDisk, Intersect, User, Warning} from "phosphor-react";
import {STATUS} from "../enums/TaskStatus";
import {PRIORITY} from "../enums/TaskPriority";
import {useTask} from "../hooks/useTask.js";

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

const InfoRow = ({label, value, icon}) => (<Flex gap={2} alignItems="center">
    {icon && <Box>{icon}</Box>}
    <Text fontWeight="bold" color="gray.600">{label}:</Text>
    <Text>{value || '-'}</Text>
</Flex>);

const EditableInfoRow = ({label, value, onChange, icon, type = "text", options, required}) => {
    if (type === "select" && options) {
        const collection = createListCollection({items: options});
        return (<Field.Root>
            <Field.Label>
                <Flex gap={2} alignItems="center">
                    {icon && <Box>{icon}</Box>}
                    <Text fontWeight="bold" color="gray.600">{label}</Text>
                </Flex>
            </Field.Label>
            <Select.Root
                collection={collection}
                required={required}
                defaultValue={[value]}
                onValueChange={e => onChange(e.value[0])}
            >
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText/>
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator/>
                    </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((item) => (<Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator/>
                        </Select.Item>))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        </Field.Root>);
    }

    return (<Field.Root>
        <Field.Label>
            <Flex gap={2} alignItems="center">
                {icon && <Box>{icon}</Box>}
                <Text fontWeight="bold" color="gray.600">{label}</Text>
            </Flex>
        </Field.Label>
        <Input
            type={type}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            required={required}
        />
    </Field.Root>);
};

export default function TaskDetailsDialog({task: initialTask, boardKey, onSuccess}) {
    const {task, loading, error, handleChange, handleSave} = useTask(initialTask, () => {
        onSuccess?.();
    });

    const handleSubmit = async (e) => {
        e?.preventDefault();
        await handleSave();
    };

    return (
        <Dialog.Root closeOnInteractOutside>
            <Dialog.Trigger asChild>
                <Card.Root
                    cursor="pointer"
                    _hover={{transform: 'scale(1.02)'}}
                    transition="transform 0.2s"
                >
                    <Card.Body p={4}>
                        <Flex gap={2} mb={2} align="center">
                            {getPriorityIcon(initialTask.priority)}
                            <Text color={getPriorityColor(initialTask.priority)} fontSize="sm">
                                {boardKey}-{initialTask.id}
                            </Text>
                        </Flex>
                        <Text mb={2}>
                            {initialTask.title}
                        </Text>
                        {initialTask.parentTaskId && <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
                            Parent task: {initialTask.parentTaskId}
                        </Text>}
                        <Flex justifyContent="space-between" align="center">
                            <Flex align="center" gap={1}>
                                <User size={16} color={initialTask.assignedUserId ? "#0000FF" : "#52525b"}/>
                                <Text fontSize="sm" color="gray.600">
                                    {initialTask.assignedUserName}
                                </Text>
                            </Flex>
                            {initialTask.dueDate && (<Flex align="center" gap={2}>
                                <Calendar size={16} color={"#FF5700"}/>
                                <Text fontSize="sm" color="gray.600">
                                    {new Date(initialTask.dueDate).toLocaleDateString()}
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
                                    {boardKey}-{initialTask.id}
                                </Text>
                            </Flex>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm"/>
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <Dialog.Body>
                            {loading ? (<Flex justify="center" py={8}>
                                <Spinner size="lg"/>
                            </Flex>) : error ? (<Text color="accent4">{error}</Text>) : task && (
                                <form id="edit-task-form" onSubmit={handleSubmit}>
                                    <Grid templateColumns="2fr 1fr" gap={8}>
                                        {/* Coluna da Esquerda */}
                                        <GridItem>
                                            <Field.Root mb={6}>
                                                <Input
                                                    value={task.title}
                                                    onChange={e => handleChange('title', e.target.value)}
                                                    fontSize="2xl"
                                                    variant="unstyled"
                                                    required
                                                />
                                            </Field.Root>

                                            <Box>
                                                <Text fontWeight="medium" color="gray.700" mb={2}>
                                                    Descrição
                                                </Text>
                                                <Textarea
                                                    value={task.description}
                                                    onChange={e => handleChange('description', e.target.value)}
                                                    whiteSpace="pre-wrap"
                                                    bg="gray.50"
                                                    p={4}
                                                    borderRadius="md"
                                                    minH="200px"
                                                    required
                                                />
                                            </Box>
                                        </GridItem>

                                        {/* Coluna da Direita */}
                                        <GridItem>
                                            <Box
                                                bg="gray.50"
                                                p={4}
                                                borderRadius="md"
                                                h="100%"
                                            >
                                                <Grid gap={4}>
                                                    <EditableInfoRow
                                                        label="Status"
                                                        value={task.status}
                                                        onChange={value => handleChange('status', value)}
                                                        type="select"
                                                        options={STATUS}
                                                        required
                                                    />
                                                    <EditableInfoRow
                                                        label="Priority"
                                                        value={task.priority}
                                                        onChange={value => handleChange('priority', value)}
                                                        icon={getPriorityIcon(task.priority)}
                                                        type="select"
                                                        options={PRIORITY}
                                                        required
                                                    />
                                                    <EditableInfoRow
                                                        label="Assigned to"
                                                        value={task.assignedUserName}
                                                        onChange={value => handleChange('assignedUserName', value)}
                                                        icon={<User size={16}/>}
                                                    />

                                                    <Box mt={2}>
                                                        <EditableInfoRow
                                                            label="Due Date"
                                                            value={task.dueDate?.split('T')[0]}
                                                            onChange={value => handleChange('dueDate', value)}
                                                            icon={<Calendar size={16}/>}
                                                            type="date"
                                                        />
                                                    </Box>
                                                    <Box mt={2}>
                                                        <EditableInfoRow
                                                            label="Completed Date"
                                                            value={task.completedDate?.split('T')[0]}
                                                            onChange={value => handleChange('completedDate', value)}
                                                            icon={<Calendar size={16}/>}
                                                            type="date"
                                                        />
                                                    </Box>
                                                    <InfoRow
                                                        label="Created by"
                                                        value={task.createdByUserName}
                                                        icon={<User size={16}/>}
                                                    />
                                                    <InfoRow
                                                        label="Creation Date"
                                                        value={formatDate(task.creationDate)}
                                                        icon={<Calendar size={16}/>}
                                                    />
                                                    {task.parentTaskId && (
                                                        <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                                                            <EditableInfoRow
                                                                label="Parent Task"
                                                                value={task.parentTaskId}
                                                                onChange={value => handleChange('parentTaskId', value)}
                                                            />
                                                        </Box>)}
                                                </Grid>
                                            </Box>
                                        </GridItem>
                                    </Grid>
                                </form>)}
                            {error && (<Text color="accent4" mt={4}>{error}</Text>)}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button
                                type="submit"
                                form="edit-task-form"
                                bg="accent"
                                isLoading={loading}
                            >
                                <FloppyDisk/>
                                Apply Changes
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
