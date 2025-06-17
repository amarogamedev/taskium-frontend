import {Box, Button, Flex, Stack, Text} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {GithubLogo, LinkedinLogo, Plus} from "phosphor-react";

function About() {
    return (<Flex minH="100vh" bg="gray.100">
            <Sidebar/>
            <Box flex={1} p={6} maxW={"800px"}>
                <Flex justifyContent="space-between" mb={8} h={8}>
                    <Text fontSize="lg" fontWeight="bold" mt={2}>
                        About Taskium
                    </Text>
                </Flex>
                <Text mb={4}>
                    Taskium is a simple project management tool designed to help teams organize their tasks,
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
                    I also had the opportunity to practice technologies I’m already familiar with, such as Spring Boot, React, and MySQL.
                </Text>

                <Stack direction="row" spacing={4}>
                    <Button href="https://www.linkedin.com/in/luisfellipeamaro/" target="_blank" variant="outline">
                        <LinkedinLogo size={16}/>
                        My LinkedIn
                    </Button>
                    <Button href="https://github.com/amarogamedev" target="_blank" variant="outline">
                        <GithubLogo size={16}/>
                        My GitHub
                    </Button>
                </Stack>
            </Box>
        </Flex>);
}

export default About;


