import {Box, Button, Card, Field, Flex, Input, Stack, Text} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {useAuth} from "../hooks/useLogin";
import {useState, useEffect} from "react";
import {FloppyDisk, GearSix} from "phosphor-react";
import {useNavigate} from "react-router-dom";

export default function Settings() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {handleUpdate, error, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setName(userInfo.name || "");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            return;
        }

        const updateData = {
            name, login: JSON.parse(localStorage.getItem("userInfo")).login, ...(password && {password}),
        };

        await handleUpdate(updateData);
        setPassword("");
        setConfirmPassword("");
        navigate("/");
    }

    return (<Flex minH="100vh" bg="gray.100">
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
            <Box p={6} pl="304px" w={"100%"}>
                <Box mb={4}>
                    <Flex justifyContent="space-between" mb={8} h={8}>
                        <Box h={16}>
                            <Flex alignItems="center" gap={3} mb={1}>
                                <GearSix size={24} weight={"fill"} color={"#FF5700"}/>
                                <Text fontSize="2xl">
                                    Settings
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} w={"300px"}>
                        <Field.Root>
                            <Field.Label>Name</Field.Label>
                            <Input
                                bg={"white"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                required
                            />
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>New password (optional)</Field.Label>
                            <Input
                                bg={"white"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Type the new password"
                            />
                        </Field.Root>

                        {password && (<Field.Root>
                            <Field.Label>Confirm new password</Field.Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm the new password"
                                required={!!password}
                            />
                        </Field.Root>)}

                        {error && <Text color="red.500">{error}</Text>}

                        <Button
                            type="submit"
                            variant="solid"
                            bg="accent"
                            isLoading={loading}
                            mt={2}
                        >
                            <FloppyDisk size={16}/>
                            Save changes
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    </Flex>);
}
