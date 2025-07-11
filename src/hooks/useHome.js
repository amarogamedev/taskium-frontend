import { useEffect, useState } from "react";
import api from "./api";

export function useHome() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        api.get("/board/all")
            .then(res => setBoards(res.data))
            .finally(() => setLoading(false));
    };

    return {
        boards,
        loading,
        fetchData
    };
}
