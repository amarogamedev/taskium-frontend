import { useEffect, useState } from "react";
import api from "./api";

export function useComment(taskId, enabled = true) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newCommentText, setNewCommentText] = useState("");

    useEffect(() => {
        if (!taskId || !enabled) return;
        setLoading(true);
        setError("");
        api.get(`/comment/task/${taskId}`)
            .then(res => setComments(res.data))
            .catch(err => {
                setError(err.response?.data?.message || "Error loading comments");
            })
            .finally(() => setLoading(false));
    }, [taskId, enabled]);

    const addComment = async () => {
        setLoading(true);
        setError("");
        api.post(`/comment`, {text: newCommentText, taskId: taskId})
            .then(res => setComments(prev => [...prev, res.data]))
            .catch(err => {
                setError(err.response?.data?.message || "Error loading comments");
            })
            .finally(() => {
                setNewCommentText("")
                setLoading(false);
            });
    }

    const deleteComment = async (commentId) => {
        setLoading(true);
        setError("");
        api.delete(`/comment/${commentId}`)
            .then(() => {
                setComments(prev => prev.filter(comment => comment.id !== commentId));
            })
            .catch(err => {
                setError(err.response?.data?.message || "Error deleting comment");
            })
            .finally(() => setLoading(false));
    }

    return { comments, loading, error, addComment, deleteComment, newCommentText, setNewCommentText};
}
