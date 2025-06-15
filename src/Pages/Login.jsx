import {Button, Card, Field, Flex, Image, Input, Stack, Text, Link, Box} from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";

function Login() {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        nome,
        setNome,
        confirmarSenha,
        setConfirmarSenha,
        erro,
        carregando,
        isCadastro,
        handleLogin,
        handleCadastro,
        toggleCadastro
    } = useLogin();

    return (
        <Box align="center" justify="center" pt={16}>
            <Card.Root maxW="sm" mx="auto">
                <Card.Header>
                    <Image src="logo.png" mb={6}/>
                    <Card.Title>{isCadastro ? 'Cadastro' : 'Login'}</Card.Title>
                    <Card.Description>
                        {isCadastro
                            ? 'Preencha os dados para criar sua conta'
                            : 'Entre com seu e-mail e senha para realizar um pedido ou cadastrar um restaurante'
                        }
                    </Card.Description>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={isCadastro ? handleCadastro : handleLogin} style={{width: '100%'}}>
                        <Stack gap="4" w="full">
                            {isCadastro && (
                                <Field.Root>
                                    <Field.Label>Nome</Field.Label>
                                    <Input
                                        type="text"
                                        placeholder="Nome completo"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        required
                                    />
                                </Field.Root>
                            )}
                            <Field.Root>
                                <Field.Label>E-mail</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Senha</Field.Label>
                                <Input
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    required
                                />
                            </Field.Root>
                            {isCadastro && (
                                <Field.Root>
                                    <Field.Label>Confirmar Senha</Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        value={confirmarSenha}
                                        onChange={e => setConfirmarSenha(e.target.value)}
                                        required
                                    />
                                </Field.Root>
                            )}
                            {erro && <Text color="red.500" marginBottom="3">{erro}</Text>}
                            <Stack direction="row" justify="space-between" align="center" gap="2">
                                <Link onClick={toggleCadastro}>
                                    {isCadastro ? 'Já possui conta? Faça login' : 'Não tem conta? Cadastre-se'}
                                </Link>
                                <Button variant="solid" type="submit" isLoading={carregando}>
                                    {isCadastro ? 'Cadastrar' : 'Entrar'}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}

export default Login;
