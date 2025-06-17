import { useEffect, useState } from "react";
import api from "../hooks/api";

export function useHome() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = () => {
        setLoading(true);
        api.get("/board/all")
            .then(res => setBoards(res.data))
            .finally(() => setLoading(false));
    };

    const handleSave = async (e, onSuccess) => {
        e?.preventDefault();
        setSaving(true);
        setError("");
        try {
            await api.post("/board", { key, name });
            await fetchBoards();
            setKey("");
            setName("");
            onSuccess?.();
        } catch (err) {
            setError("Erro ao criar board");
        } finally {
            setSaving(false);
        }
    };

    return {
        boards,
        loading,
        key,
        setKey,
        name,
        setName,
        saving,
        error,
        handleSave
    };
}
