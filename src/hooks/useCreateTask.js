import { useState } from "react";
import api from "./api";

export function useCreateTask(onSuccess, board) {
    const [newTask, setNewTask] = useState({ title: "", description: "", status: "", priority: "", dueDate: null, parentTaskId: null, boardId: board.id });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async (e) => {
        e?.preventDefault();
        setSaving(true);
        setError("");
        try {
            const taskData = {
                ...newTask,
                dueDate: newTask.dueDate ? new Date(newTask.dueDate + 'T23:59:59').toISOString() : null
            };

            await api.post("/task", taskData);
            setNewTask({ title: "", description: "", status: "", priority: "", dueDate: null, parentTaskId: null, boardId: board.id });
            onSuccess?.();
        } catch (err) {
            console.error("Error creating task:", err);
            setError(err.response?.data?.message || "Error creating task");
        } finally {
            setSaving(false);
        }
    };

    return {
        newTask,
        setNewTask,
        saving,
        error,
        handleSave
    };
}
