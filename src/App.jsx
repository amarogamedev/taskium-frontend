import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings.jsx";
import Board from "./pages/Board.jsx";
import Backlog from "./pages/Backlog.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        document.title = "Taskium"
        const checkToken = () => {
            const token = localStorage.getItem('userInfo');
            setIsAuthenticated(!!token);
        };
        checkToken();
        window.addEventListener('storage', checkToken);
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
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/board/:boardId" element={<Board/>}/>
                        <Route path="/backlog/:boardId" element={<Backlog/>}/>
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
