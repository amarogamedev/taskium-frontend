import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, senha: senha})
        });
        if (!response.ok) {
            setErro('Usuário ou senha inválidos');
        }
        else {
            const token = await response.text();
            handleAuthSuccess(token);
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
        const response = await fetch('http://localhost:8080/auth/registrar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        });
        if (!response.ok) {
            setErro('Erro ao cadastrar usuário');
        }
        else {
            const token = await response.text();
            handleAuthSuccess(token);
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
