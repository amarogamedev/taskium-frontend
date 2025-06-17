import {Box, Button, Card, Field, Flex, Image, Input, Link, Stack, Text} from "@chakra-ui/react";
import {useAuth} from "../hooks/useLogin";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    const {
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        confirmPassword,
        setConfirmPassword,
        error,
        loading,
        isSignUp,
        handleLogin,
        handleSignUp,
        toggleSignUp
    } = useAuth();

    return (
        <Flex minH="100vh" bg="gray.100">
            <Card.Root maxW="md" maxH={"700px"} mx="auto" mt={16}>
                <Card.Header>
                    <Image src="logo.png" mb={6}/>
                    <Card.Title>{isSignUp ? 'Sign Up' : 'Login'}</Card.Title>
                    <Card.Description>
                        {isSignUp
                            ? 'Fill in the details to create your account'
                            : 'Enter your email and password to access the system'
                        }
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={{width: '100%'}}>
                        <Stack gap="4" w="full">
                            {isSignUp && (
                                <Field.Root>
                                    <Field.Label>Name</Field.Label>
                                    <Input
                                        type="text"
                                        placeholder="Full name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </Field.Root>
                            )}
                            <Field.Root>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Password</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </Field.Root>
                            {isSignUp && (
                                <Field.Root>
                                    <Field.Label>Confirm Password</Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Field.Root>
                            )}
                            {error && <Text color="red.500" marginBottom="3">{typeof error === 'string' ? error : error?.message}</Text>}
                            <Stack direction="row" justify="space-between" align="center" gap="2">
                                <Link onClick={toggleSignUp}>
                                    {isSignUp ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up'}
                                </Link>
                                <Button variant="solid" bg="accent" type="submit" isLoading={loading}>
                                    {isSignUp ? 'Sign Up' : 'Log In'}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Card.Body>
            </Card.Root>
        </Flex>
    );
}

export default Login;
