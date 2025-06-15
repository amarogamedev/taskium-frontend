import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from './api';

export function useAuth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleAuthSuccess = (token) => {
        localStorage.setItem('token', token);
        navigate('/');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/login', {
                email: email,
                senha: password
            });
            const token = response.data;
            handleAuthSuccess(token);
        } catch (error) {
            console.log(error);
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/register', {
                nome: name,
                email: email,
                senha: password
            });
            const token = response.data;
            handleAuthSuccess(token);
        } catch (error) {
            console.log(error);
            setError('Error signing up');
        }
        setLoading(false);
    };

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
    };

    return {
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
    };
}
