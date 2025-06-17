import { useState } from "react";
import api from "./api";

export function useEditTask(initialTask, onSuccess) {
    const [task, setTask] = useState(initialTask);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (field, value) => {
        setTask(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError("");
        try {
            await api.put("/task", task);
            onSuccess?.();
        } catch (err) {
            console.error("Error updating task:", err);
            setError(err.response?.data?.message || "Error updating task");
            throw err;
        } finally {
            setSaving(false);
        }
    };

    return {
        task,
        setTask,
        saving,
        error,
        handleSave,
        handleChange
    };
}
