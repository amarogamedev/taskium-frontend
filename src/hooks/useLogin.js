import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api';

export function useAuth() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        manageStates(e);
        try {
            const response = await api.post('/auth/login', {
                login: login,
                password: password
            });
            handleAuthSuccess(response.data);
        } catch (error) {
            console.log(error);
            setError(getResponseError(error, 'Erro desconhecido ao fazer login'));
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        manageStates(e);
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            const response = await api.post('/auth/register', {
                name: name,
                login: login,
                password: password
            });
            handleAuthSuccess(response.data);
        } catch (error) {
            console.log(error);
            setError(getResponseError(error, 'Erro ao registrar'));
        }
        setLoading(false);
    };

    const handleAuthSuccess = (userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        navigate('/');
    };

    function manageStates(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
    }

    function getResponseError(error, fallbackMsg) {
        if (error.response && error.response.data && error.response.data) {
            return error.response.data;
        } else if (error.message) {
            return error.message;
        } else {
            return fallbackMsg;
        }
    }

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setLogin('');
        setPassword('');
        setName('');
        setConfirmPassword('');
    };

    return {
        login,
        setLogin,
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
    };
}
