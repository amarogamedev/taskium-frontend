import {Box, Button, Card, Center, Flex, Spinner, Text, Dialog, Portal, CloseButton} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react/input";
import {useHome} from "../hooks/useHome";
import Sidebar from "../components/Sidebar";
import {Plus} from "phosphor-react";
import {Field} from "@chakra-ui/react";
import {useState} from "react";

function Home() {
    const { boards, loading, key, setKey, name, setName, saving, error, handleSave } = useHome();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar />
            <Box flex={1} p={6}>
                <Flex justifyContent="space-between" alignItems="baseline" mb={6}>
                    <Text fontSize="lg" fontWeight="bold">
                        My boards
                    </Text>
                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Trigger asChild>
                            <Button bg={"accent"}>
                                <Plus size={16}/>
                                Create new board
                            </Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>New board settings</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <form id="create-board-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={(e) => handleSave(e, () => setDialogOpen(false))}>
                                            <Field.Root>
                                                <Field.Label>Key</Field.Label>
                                                <Input maxLength={3} placeholder="Ex: DEV" required value={key} onChange={e => setKey(e.target.value.toUpperCase())} />
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label>Name</Field.Label>
                                                <Input placeholder="Board name" required value={name} onChange={e => setName(e.target.value)} />
                                            </Field.Root>
                                            {error && <Text color="red.500">{error}</Text>}
                                        </form>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                        </Dialog.ActionTrigger>
                                        <Button type="submit" form="create-board-form" isLoading={saving} disabled={!key || !name}>Save</Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </Flex>
                {loading ? (
                    <Center h="200px"><Spinner size="lg" /></Center>
                ) : (
                    <Box>
                        {boards.length === 0 ? (
                            <Text>No boards were found.</Text>
                        ) : (
                            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={6}>
                                {boards?.map(board => (
                                    <Card.Root key={board.id} cursor="pointer">
                                        <Card.Header pb={0}>
                                            <Flex gap={2}>
                                                <Text color="accent">{board.key}</Text>
                                                <Text fontWeight="bold">{board.name}</Text>
                                            </Flex>
                                        </Card.Header>
                                        <Card.Body pt={2} pb={2}>
                                            <Box textAlign="right">
                                                <Text fontSize="sm" color="gray.600">Tasks</Text>
                                                <Text fontSize="2xl" fontWeight="bold">{board.taskCount}</Text>
                                            </Box>
                                        </Card.Body>
                                    </Card.Root>
                                ))}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    );
}

export default Home;