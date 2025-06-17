import { useState } from "react";
import api from "./api";

export function useCreateBoard(onSuccess) {
    const [newBoard, setNewBoard] = useState({ key: "", name: "" });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async (e) => {
        e?.preventDefault();
        setSaving(true);
        setError("");
        try {
            await api.post("/board", newBoard);
            setNewBoard({ key: "", name: "" });
            onSuccess?.();
        } catch (err) {
            console.error("Error creating board:", err);
            setError(err.response?.data?.message || "Error creating board");
        } finally {
            setSaving(false);
        }
    };

    return {
        newBoard,
        setNewBoard,
        saving,
        error,
        handleSave
    };
}
