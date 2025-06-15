import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };
        checkToken();
        window.addEventListener('storage', checkToken);
        // Observa mudanças no token em tempo real
        const interval = setInterval(checkToken, 500);
        return () => {
            window.removeEventListener('storage', checkToken);
            clearInterval(interval);
        };
    }, []);

    if (isAuthenticated === null) return null;

    return (
        <BrowserRouter>
            <Routes>
                {isAuthenticated ? (
                    <>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </>
                ) : (
                    <Route path="*" element={<Login/>}/>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
