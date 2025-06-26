import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Field,
    HStack,
    IconButton,
    Input,
    Portal,
    Text,
    VStack
} from "@chakra-ui/react";
import {PlusCircle, Trash, Users} from "phosphor-react";
import {useBoard} from "../../hooks/useBoard.js";

export default function ManageBoardMembersDialog({boardKey, members = [], onSuccess}) {
    const {
        newMember,
        setNewMember,
        error,
        loading,
        handleAddMember,
        handleRemoveMember
    } = useBoard(boardKey, false, onSuccess);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAddMember();
    };

    return (
        <Dialog.Root closeOnInteractOutside={true}>
            <Dialog.Trigger asChild>
                <Button variant="outline">
                    <Users size={16}/>
                    Manage Members
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Users size={28} color={"#FF5700"}/>
                            <Dialog.Title>Manage Board Members</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form id="add-member-form" style={{display: 'flex', flexDirection: 'column', gap: 16}} onSubmit={handleSubmit}>
                                <Field.Root>
                                    <Field.Label>Add new member</Field.Label>
                                    <HStack w={"100%"}>
                                        <Input
                                            placeholder="User login"
                                            value={newMember}
                                            onChange={e => setNewMember(e.target.value)}
                                        />
                                        <Button
                                            type="submit"
                                            bg={"accent"}
                                            isLoading={loading}
                                            disabled={!newMember}
                                        >
                                            <PlusCircle size={16}/>
                                            Add
                                        </Button>
                                    </HStack>
                                </Field.Root>
                            </form>

                            {error && <Text color="accent4" mt={2}>{error}</Text>}

                            <Box mt={6}>
                                <Text fontWeight="bold" mb={3}>Current Members</Text>
                                <VStack align="stretch" spacing={2}>
                                    {members.map((member) => (
                                        <HStack key={member.login} justify="space-between" p={3} bg="gray.100" borderRadius="md">
                                            <Box>
                                                <Text fontWeight="medium">{member.name}</Text>
                                                <Text fontSize="sm" color="gray.600">@{member.login}</Text>
                                            </Box>
                                            <IconButton
                                                variant={"outline"}
                                                color={"accent4"}
                                                onClick={() => handleRemoveMember(member.login)}
                                            >
                                                <Trash size={24}/>
                                            </IconButton>
                                        </HStack>
                                    ))}
                                    {members.length === 0 && (
                                        <Text color="gray.500" textAlign="center">No members yet</Text>
                                    )}
                                </VStack>
                            </Box>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm"/>
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
