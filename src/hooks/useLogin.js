import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [isCadastro, setIsCadastro] = useState(false);
    const navigate = useNavigate();

    const handleAuthSuccess = (token) => {
        localStorage.setItem('token', token);
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setErro('');
        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: senha
            });
            const token = response.data;
            handleAuthSuccess(token);
        } catch (error) {
            console.log(error);
            setErro('Usuário ou senha inválidos');
        }
        setCarregando(false);
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem');
            return;
        }
        setCarregando(true);
        setErro('');
        try {
            const response = await api.post('/auth/registrar', {
                nome: nome,
                email: email,
                senha: senha
            });
            const token = response.data;
            handleAuthSuccess(token);
        } catch (error) {
            console.log(error);
            setErro('Erro ao cadastrar usuário');
        }
        setCarregando(false);
    };

    const toggleCadastro = () => {
        setIsCadastro(!isCadastro);
        setErro('');
        setEmail('');
        setSenha('');
        setNome('');
        setConfirmarSenha('');
    };

    return {
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
    };
}
