import { useEffect, useState } from "react";
import api from "./api";

export function useComment(taskId) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!taskId) return;
        setLoading(true);
        setError("");
        api.get(`/comment/task/${taskId}`)
            .then(res => setComments(res.data))
            .catch(err => {
                setError(err.response?.data?.message || "Error loading comments");
            })
            .finally(() => setLoading(false));
    }, [taskId]);

    return { comments, loading, error };
}

