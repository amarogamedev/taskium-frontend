import {Button, CloseButton, Dialog, Field, Input, Portal, Text} from "@chakra-ui/react";
import {FloppyDisk, Plus, SquareHalf, XCircle} from "phosphor-react";
import {useCreateBoard} from "../hooks/useCreateBoard";

export default function CreateBoardDialog({ onSuccess }) {
    const { newBoard, saving, error, handleChange, handleSave } = useCreateBoard(() => {onSuccess?.();});

    return (
        <Dialog.Root closeOnInteractOutside={true}>
            <Dialog.Trigger asChild>
                <Button bg={"accent"}>
                    <Plus size={16}/>
                    Create new board
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <SquareHalf size={28} color={"#FF5700"}/>
                            <Dialog.Title>New board settings</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="create-board-form" style={{display: 'flex', flexDirection: 'column', gap: 16}} onSubmit={handleSave}>
                                <Field.Root>
                                    <Field.Label>
                                        Key
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Input
                                        maxLength={3}
                                        placeholder="Ex: DEV"
                                        required
                                        value={newBoard.key}
                                        onChange={e => handleChange('key', e.target.value)}
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Name
                                        <Text as="span" color="accent2"> *</Text>
                                    </Field.Label>
                                    <Input
                                        placeholder="Board name"
                                        required
                                        value={newBoard.name}
                                        onChange={e => handleChange('name', e.target.value)}
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
                                    form="create-board-form"
                                    isLoading={saving}
                                    disabled={!newBoard.key || !newBoard.name}
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