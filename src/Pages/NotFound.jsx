import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Box textAlign="center" pt={32}>
            <Text fontSize="5xl" fontWeight="bold" color="accent">404</Text>
            <Text fontSize="2xl" mb={6}>Página não encontrada</Text>
            <Button bg="accent" onClick={() => navigate("/")}>Voltar para Home</Button>
        </Box>
    );
}

export default NotFound;

