import { useState, useEffect } from 'react';
import api from './api';

export function useBoard(boardKey, backlog, onSuccess) {
    const [board, setBoard] = useState(null);
    const [newBoard, setNewBoard] = useState({ key: "", name: "" });
    const [newMember, setNewMember] = useState('');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBoardData = async () => {
        try {
            setLoading(true);
            const [boardResponse, tasksResponse] = await Promise.all([
                api.get(`/board/${boardKey}`),
                api.get(`/task/board/${boardKey}`)
            ]);
            setBoard({
                ...boardResponse.data,
                members: boardResponse.data.members || []
            });
            setTasks(tasksResponse.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBacklogData = async () => {
        try {
            setLoading(true);
            const [boardResponse, tasksResponse] = await Promise.all([
                api.get(`/board/${boardKey}`),
                api.get(`/task/board/${boardKey}/all`)
            ]);
            setBoard(boardResponse.data);
            setTasks(tasksResponse.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setNewBoard(prev => ({
            ...prev,
            [field]: field === 'key' ? value.toUpperCase() : value
        }));
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        try {
            await api.post("/board", newBoard);
            setNewBoard({ key: "", name: "" });
            onSuccess?.();
        } catch (err) {
            console.error("Error creating board:", err);
            setError(err.response?.data?.message || "Error creating board");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async () => {
        try {
            setLoading(true);
            setError(null);
            await api.post(`/board/${boardKey}/members/${newMember}`);
            setNewMember('');
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add member');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveMember = async (userLogin) => {
        try {
            setLoading(true);
            setError(null);
            await api.delete(`/board/${boardKey}/members/${userLogin}`);
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove member');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (boardKey) {
            if(backlog) {
                fetchBacklogData();
            }
            else {
                fetchBoardData();
            }
        }
    }, [boardKey]);

    return {
        loading,
        error,
        fetchBoardData,
        fetchBacklogData,
        tasks,
        newMember,
        setNewMember,
        handleAddMember,
        handleRemoveMember,
        board,
        newBoard,
        setNewBoard,
        handleChange,
        handleSave
    };
}
