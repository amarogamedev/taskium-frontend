import {
    Box,
    Button,
    Card,
    CloseButton,
    Dialog,
    Field,
    Flex,
    Grid,
    GridItem,
    Input,
    Portal,
    Spinner,
    Text,
    Textarea
} from "@chakra-ui/react";
import {Calendar, CalendarCheck, FloppyDisk, Intersect, Trash, User} from "phosphor-react";
import {STATUS} from "../../enums/TaskStatus.js";
import {PRIORITY} from "../../enums/TaskPriority.js";
import {useTask} from "../../hooks/useTask.js";
import {EditableInfoRow} from "../info-rows/EditableInfoRow.jsx";
import InfoRow from "../info-rows/InfoRow.jsx";
import {getPriorityColor, getPriorityIcon} from "../../utils/priorityUtils.jsx";

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
};

export default function TaskDetailsDialog({task: initialTask, board, onSuccess}) {
    const {task, saving, error, handleChange, handleSave, handleDelete} = useTask(initialTask, () => {
        onSuccess?.();
    });

    const handleSubmit = async (e) => {
        e?.preventDefault();
        await handleSave();
    };

    return (<Dialog.Root closeOnInteractOutside>
        <Dialog.Trigger asChild>
            <Card.Root
                cursor="pointer"
                _hover={{transform: 'scale(1.02)'}}
                transition="transform 0.2s"
            >
                <Card.Body p={4}>
                    <Flex gap={2} mb={2} align="center">
                        {getPriorityIcon(initialTask.priority)}
                        <Text color="gray.600" fontSize="sm">
                            {board?.key}-{initialTask.id}
                        </Text>
                    </Flex>
                    <Text mb={2}>
                        {initialTask.title}
                    </Text>
                    {initialTask.assignedUserId && <Flex align="center" gap={2}>
                        <User size={16} color="#52525b"/>
                        <Text fontSize="sm" color="gray.600">
                            {initialTask.assignedUserName}
                        </Text>
                    </Flex>}
                    {initialTask.dueDate && <Flex align="center" gap={2}>
                        <Calendar size={16} color={"#52525b"}/>
                        <Text fontSize="sm" color="gray.600">
                            {formatDate(initialTask.dueDate)}
                        </Text>
                    </Flex>}
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
                                {board?.key}-{initialTask.id}
                            </Text>
                        </Flex>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Header>

                    <Dialog.Body>
                        {saving ? (<Flex justify="center" py={8}>
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
                                            <Text fontWeight="medium" color="gray.600" mb={2}>
                                                Description
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
                                                    value={task.assignedUserId}
                                                    onChange={value => {
                                                        handleChange('assignedUserId', value ? Number(value) : null);
                                                        const member = value ? [...board.members, board.owner].find(m => m.id === Number(value)) : null;
                                                        handleChange('assignedUserName', member?.name || '');
                                                    }}
                                                    icon={<User size={16}/>}
                                                    type="members"
                                                    members={board.members}
                                                    board={board}
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
                                                <InfoRow
                                                    label="Completed Date"
                                                    value={formatDate(task.completedDate)}
                                                    icon={<CalendarCheck size={16}/>}
                                                />
                                            </Grid>
                                        </Box>
                                    </GridItem>
                                </Grid>
                            </form>)}
                        {error && (<Text color="accent4" mt={4}>{error}</Text>)}
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.Root role="alertdialog" closeOnInteractOutside>
                            <Dialog.Trigger asChild>
                                <Button
                                    variant="outline"
                                    form="edit-task-form"
                                    color="accent4"
                                >
                                    <Trash/>
                                    Delete task
                                </Button>
                            </Dialog.Trigger>
                            <Dialog.Backdrop/>
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Are you sure?</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <p>
                                            This action cannot be undone. This will permanently delete this task.
                                        </p>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Button form="edit-task-form"
                                                bg="accent4"
                                                isLoading={saving}
                                                onClick={() => handleDelete()}
                                        >
                                            Delete
                                        </Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm"/>
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Dialog.Root>
                        <Button
                            type="submit"
                            form="edit-task-form"
                            bg="accent"
                            isLoading={saving}
                        >
                            <FloppyDisk/>
                            Apply Changes
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>);
}
