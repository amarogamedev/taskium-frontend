import { useState } from 'react';
import api from './api';

export function useManageBoardMembers(boardId, onSuccess) {
    const [newMember, setNewMember] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddMember = async () => {
        try {
            setLoading(true);
            setError(null);
            await api.post(`/board/${boardId}/members/${newMember}`);
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
            await api.delete(`/board/${boardId}/members/${userLogin}`);
            onSuccess?.();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to remove member');
        } finally {
            setLoading(false);
        }
    };

    return {
        newMember,
        setNewMember,
        loading,
        error,
        handleAddMember,
        handleRemoveMember
    };
}
