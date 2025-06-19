import { useState, useEffect } from 'react';
import api from './api';

export function useBoard(boardId) {
    const [board, setBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBoardData = async () => {
        try {
            setLoading(true);
            const [boardResponse, tasksResponse] = await Promise.all([
                api.get(`/board/${boardId}`),
                api.get(`/task/board/${boardId}`)
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

    useEffect(() => {
        if (boardId) {
            fetchBoardData();
        }
    }, [boardId]);

    return { board, tasks, loading, error, fetchBoardData };
}
