import {useEffect, useState} from "react";
import api from "./api";

export function useTask(initialTask, enabled, onSuccess, board) {
    const [task, setTask] = useState(initialTask);
    const [subtasks, setSubtasks] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!task || !enabled) return;
        fetchSubtasks();
    }, [task, enabled]);

    const fetchSubtasks = async () => {
        setSaving(true);
        setError("");
        try {
            await api.get("/task/" + task.id + "/subtasks").then(res => {
                if(res.data != null && res.data.length > 0) {
                    setSubtasks(res.data)
                }
            });
        } catch (err) {
            console.error("Error fetching subtasks:", err);
            setError(err.response?.data?.message || "Error fetching subtasks");
            throw err;
        } finally {
            setSaving(false);
        }
    };


    const handleChange = (field, value) => {
        setTask(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async (taskToSave = task) => {
        setSaving(true);
        setError("");
        try {
            await api.put("/task/" + taskToSave.id, taskToSave);
            onSuccess?.();
        } catch (err) {
            console.error("Error updating task:", err);
            setError(err.response?.data?.message || "Error updating task");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    const handleCreate = async (e) => {
        e?.preventDefault();
        setSaving(true);
        setError("");
        try {
            await api.post("/task", task);
            setTask({ title: "", description: "", status: "", priority: "", dueDate: null, boardId: board?.id });
            onSuccess?.();
        } catch (err) {
            console.error("Error creating task:", err);
            setError(err.response?.data?.message || "Error creating task");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        setError("");
        try {
            await api.delete("/task/" + task.id);
            onSuccess?.();
        } catch (err) {
            console.error("Error deleting task:", err);
            setError(err.response?.data?.message || "Error deleting task");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        task,
        subtasks,
        setTask,
        saving,
        error,
        handleCreate,
        handleChange,
        handleSave,
        handleDelete
    };
}
