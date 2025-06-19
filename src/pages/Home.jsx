import {Box, Button, Card, Center, Flex, Grid, Spinner, Stack, Text} from "@chakra-ui/react";
import {useHome} from "../hooks/useHome";
import Sidebar from "../components/Sidebar";
import {Calendar, GithubLogo, Intersect, LinkedinLogo, SquareHalf, Users} from "phosphor-react";
import {useNavigate} from "react-router-dom";
import CreateBoardDialog from "../components/CreateBoardDialog.jsx";
import InfoRow from "../components/InfoRow.jsx";


export function Home() {
    const {boards, loading, fetchBoards} = useHome();
    const navigate = useNavigate();

    if (loading) {
        return (
            <Center h="200px"><Spinner size="lg"/></Center>
        );
    }

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
            <Box flex={1} p={6} pl="306px">
                <Flex justifyContent="space-between" mb={8} h={8}>
                    <Text fontSize="2xl" h={16}>
                        My boards
                    </Text>
                    <CreateBoardDialog onSuccess={fetchBoards} />
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
                                        <Card.Root key={board.id} cursor="pointer" onClick={() => navigate(`/board/${board.id}`)}>
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
                                                <InfoRow
                                                    label="Members"
                                                    value={board.members.length + 1}
                                                    icon={<Users size={24} color={"#52525b"}/>}
                                                />
                                                <InfoRow
                                                    label="Tasks"
                                                    value={board.taskCount}
                                                    icon={<Intersect size={24} color={"#52525b"}/>}
                                                />
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