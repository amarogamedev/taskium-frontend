import {
    Box,
    Button,
    Card,
    Center,
    CloseButton,
    Dialog,
    Field,
    Flex, Grid,
    Portal,
    Spinner,
    Stack,
    Text
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react/input";
import {useHome} from "../hooks/useHome";
import Sidebar from "../components/Sidebar";
import {FloppyDisk, GithubLogo, LinkedinLogo, Plus, SquareHalf, XCircle} from "phosphor-react";
import {useNavigate} from "react-router-dom";

function Home() {
    const {boards, loading, key, setKey, name, setName, saving, error, handleSave} = useHome();
    const navigate = useNavigate();

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
            <Box flex={1} p={6} pl="306px">
                <Flex justifyContent="space-between" mb={8} h={8}>
                    <Text fontSize="2xl" h={16}>
                        My boards
                    </Text>
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
                                        <form id="create-board-form"
                                              style={{display: 'flex', flexDirection: 'column', gap: 16}}
                                              onSubmit={(e) => handleSave(e)}>
                                            <Field.Root>
                                                <Field.Label>Key</Field.Label>
                                                <Input maxLength={3} placeholder="Ex: DEV" required value={key}
                                                       onChange={e => setKey(e.target.value.toUpperCase())}/>
                                            </Field.Root>
                                            <Field.Root>
                                                <Field.Label>Name</Field.Label>
                                                <Input placeholder="Board name" required value={name}
                                                       onChange={e => setName(e.target.value)}/>
                                            </Field.Root>
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
                                        <Button type="submit" bg={"accent"} form="create-board-form" isLoading={saving}
                                                disabled={!key || !name}>
                                            <FloppyDisk/>
                                            Save
                                        </Button>
                                    </Dialog.Footer>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm"/>
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </Flex>
                {loading ? (
                    <Center h="200px"><Spinner size="lg"/></Center>
                ) : (
                    <Box>
                        {boards.length === 0 ? (
                            <Text>No boards were found.</Text>
                        ) : (
                            <Box border={"1px solid #e4e4e7"} borderRadius={8} bg="gray.200" p={2}>
                                <Grid gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                                    {boards?.map(board => (
                                        <Card.Root key={board.id} cursor="pointer"
                                                   onClick={() => navigate(`/board/${board.id}`)}>
                                            <Card.Header>
                                                <Flex gap={2}>
                                                    <SquareHalf size={24} color={"#FF5700"}/>
                                                    <Text fontWeight="bold" color="accent2">
                                                        {board.key}
                                                    </Text>
                                                    <Text whiteSpace="nowrap" overflow="hidden">
                                                        {board.name}
                                                    </Text>
                                                </Flex>
                                            </Card.Header>
                                            <Card.Body>
                                                <Box textAlign="right">
                                                    <Text fontSize="sm" color="gray.600">Tasks</Text>
                                                    <Text fontSize="2xl">{board.taskCount}</Text>
                                                </Box>
                                            </Card.Body>
                                        </Card.Root>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
            <Box flex={1} p={6} maxW={"800px"} bg="white" h="100vh" borderLeft="1px solid #e4e4e7">
                <Flex justifyContent="space-between" mb={8} h={8}>
                    <Text fontSize="lg" fontWeight="bold" mt={2}>
                        About Taskium
                    </Text>
                </Flex>
                <Text mb={4}>
                    Taskium is a simple project management tool inspired by Jira, but with a focus on simplicity and
                    less bloat,
                    created by Luis Fellipe Amaro to learn more about web development.
                </Text>
                <Text mb={4}>
                    Technologies used:
                </Text>
                <Stack spacing={2} ml={4} mb={4}>
                    <Text>• Java (24) Springboot</Text>
                    <Text>• React</Text>
                    <Text>• Chakra UI</Text>
                    <Text>• MySQL</Text>
                    <Text>• Docker</Text>
                    <Text>• Firebase</Text>
                    <Text>• Liquibase</Text>
                    <Text>• i18n</Text>
                </Stack>
                <Text mb={4}>
                    While building this project, I learned a lot of new things, such as JWT authentication,
                    deploying a Java application on Firebase, and using Docker to containerize it.
                    I also had the opportunity to practice technologies I’m already familiar with, such as Spring Boot,
                    React, and MySQL.
                </Text>

                <Stack direction="row" spacing={4}>
                    <Button href="https://www.linkedin.com/in/luisfellipeamaro/" target="_blank" bg={"accent2"}>
                        <LinkedinLogo size={16} weight={"bold"}/>
                        My LinkedIn
                    </Button>
                    <Button href="https://github.com/amarogamedev" target="_blank" bg={"accent2"}>
                        <GithubLogo size={16} weight={"bold"}/>
                        My GitHub
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
}

export default Home;