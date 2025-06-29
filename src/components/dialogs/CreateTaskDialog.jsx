import {Button, CloseButton, Dialog, Field, Input, Text, Textarea} from "@chakra-ui/react";
import {FloppyDisk, Intersect, PlusCircle, User, XCircle} from "phosphor-react";
import {STATUS} from "../../enums/TaskStatus.js";
import {PRIORITY} from "../../enums/TaskPriority.js";
import {useTask} from "../../hooks/useTask.js";
import {EditableInfoRow} from "../info-rows/EditableInfoRow.jsx";
import {TYPE} from "../../enums/TaskType.js";
import {getPriorityIcon} from "../../utils/priorityUtils.jsx";
import {getTypeIcon} from "../../utils/typeUtils.jsx";
import {getStatusIcon} from "../../utils/statusUtils.jsx";

export default function CreateTaskDialog({onSuccess, board, columnId}) {
    const {task, saving, error, handleChange, handleCreate} = useTask({
        boardId: board?.id, status: columnId
    }, false, () => {
        onSuccess?.();
    }, board);

    return (
        <Dialog.Root closeOnInteractOutside={true}>
            <Dialog.Trigger asChild>
                {columnId ? (
                    <Button w={"100%"} my={2} variant="ghost" color="gray.600">
                        <PlusCircle size={16}/>
                        New task
                    </Button>
                ) : (
                    <Button bg={"accent"}>
                        <PlusCircle size={16}/>
                        Create new task
                    </Button>
                )}
            </Dialog.Trigger>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Intersect size={28} color={"#FF5700"}/>
                        <Dialog.Title>
                            New task on {board.name}
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form id="create-task-form" style={{display: 'flex', flexDirection: 'column', gap: 16}}
                              onSubmit={handleCreate}>
                            <Field.Root>
                                <Field.Label>
                                    Title
                                    <Text as="span" color="accent2"> *</Text>
                                </Field.Label>
                                <Input
                                    placeholder="Write a short title"
                                    required
                                    value={task.title}
                                    onChange={e => handleChange('title', e.target.value)}
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>
                                    Description
                                </Field.Label>
                                <Textarea
                                    placeholder="Describe the task in detail"
                                    value={task.description}
                                    onChange={e => handleChange('description', e.target.value)}
                                    minHeight="150px"
                                    resize="vertical"
                                />
                            </Field.Root>
                            <EditableInfoRow
                                label="Status"
                                value={task.status}
                                onChange={value => handleChange('status', value)}
                                icon={getStatusIcon(task.status)}
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
                                label="Type"
                                value={task.type}
                                onChange={value => handleChange('type', value)}
                                icon={getTypeIcon(task.type)}
                                type="select"
                                options={TYPE}
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
                            <EditableInfoRow
                                label="Due date"
                                value={task.dueDate}
                                onChange={value => handleChange('dueDate', value)}
                                type="date"
                            />
                            {error && <Text color="red.500">{error}</Text>}
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
                                disabled={!task.title || !task.status || !task.priority || !task.type}
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
        </Dialog.Root>
    );
}
