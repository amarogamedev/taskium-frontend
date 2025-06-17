import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Portal,
    Text,
    Input,
    Textarea,
    Select,
    createListCollection
} from "@chakra-ui/react";
import {FloppyDisk, Intersect, Plus, XCircle} from "phosphor-react";
import {useCreateTask} from "../hooks/useCreateTask.js";
import { STATUS } from "../enums/TaskStatus.js";
import {PRIORITY} from "../enums/TaskPriority.js";

export default function CreateTaskDialog({ onSuccess, board }) {
    const { newTask, setNewTask, saving, error, handleSave } = useCreateTask(() => {onSuccess?.();}, board);

    const handleChange = (field, value) => {
        setNewTask(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const statusOptions = createListCollection({items: STATUS});
    const priorityOptions = createListCollection({items: PRIORITY});

    return (
        <Dialog.Root closeOnInteractOutside={true}>
            <Dialog.Trigger asChild>
                <Button bg={"accent"}>
                    <Plus size={16}/>
                    Create new task
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Intersect size={28} color={"#FF5700"}/>
                            <Dialog.Title>New task on {board.name}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="create-task-form" style={{display: 'flex', flexDirection: 'column', gap: 16}} onSubmit={handleSave}>
                                <Field.Root>
                                    <Field.Label>
                                        Title
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Input
                                        placeholder="Write a short title"
                                        required
                                        value={newTask.title}
                                        onChange={e => handleChange('title', e.target.value)}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Description
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Textarea
                                        placeholder="Describe the task in detail"
                                        required
                                        value={newTask.description}
                                        onChange={e => handleChange('description', e.target.value)}
                                        minHeight="150px"
                                        resize="vertical"
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Status
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Select.Root collection={statusOptions} required onValueChange={e => handleChange('status', e.value[0])}>
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText placeholder="Select the current task status" />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {statusOptions.items.map((s) => (
                                                        <Select.Item item={s} key={s.value}>
                                                            {s.label}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                    </Select.Root>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Priority
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Select.Root collection={priorityOptions} required onValueChange={e => handleChange('priority', e.value[0])}>
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText placeholder="Define the priority of this task" />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {priorityOptions.items.map((s) => (
                                                    <Select.Item item={s} key={s.value}>
                                                        {s.label}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Select.Root>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Due date
                                    </Field.Label>
                                    <Input
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={e => handleChange('dueDate', e.target.value)}
                                    />
                                </Field.Root>
                                {error && <Text color="accent4">{error}</Text>}
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" type="button">
                                    <XCircle/>
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger>
                                <Button
                                    type="submit"
                                    bg={"accent"}
                                    form="create-task-form"
                                    isLoading={saving}
                                    disabled={!newTask.title || !newTask.description || !newTask.status || !newTask.priority}
                                >
                                    <FloppyDisk/>
                                    Save
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}