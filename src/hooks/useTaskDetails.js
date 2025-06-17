import { useState } from 'react';
import api from "./api.js";

export function useTaskDetails() {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTaskDetails = async (taskId) => {
        if (!taskId) return;

        setLoading(true);
        setError('');

        try {
            const response = await api.get(`/task/${taskId}`);
            setTask(response.data);
        } catch (err) {
            console.error("Error fetching task details:", err);
            setError(err.response?.data || 'Error loading task details');
        } finally {
            setLoading(false);
        }
    };

    return {
        task,
        loading,
        error,
        fetchTaskDetails
    };
}
