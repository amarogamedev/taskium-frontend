import {Box, Button, Flex, IconButton, Image, Stack} from "@chakra-ui/react";
import {useNavigate, useLocation} from "react-router-dom";
import {ClipboardText, GearSix, House, Question, SignOut, User} from "phosphor-react";
import api from "../hooks/api";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <Box
            w="280px"
            bg="white"
            height="100vh"
            position="fixed"
            top={0}
            left={0}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRight="1px solid #e4e4e7"
            overflowY="auto"
        >
            <Box>
                <Image src="/logo.png" p={6} pl={4}/>
                <Stack>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/")}>
                        <House
                            size={24}
                            color={"#FF5700"}
                            weight={location.pathname === "/" ? "fill" : "regular"}
                        />
                        Home page
                    </Button>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/backlog")}>
                        <ClipboardText
                            size={24}
                            color={"#FF5700"}
                            weight={location.pathname === "/backlog" ? "fill" : "regular"}
                        />
                        Backlog
                    </Button>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/settings")}>
                        <GearSix
                            size={24}
                            color={"#FF5700"}
                            weight={location.pathname === "/settings" ? "fill" : "regular"}
                        />
                        Settings
                    </Button>
                </Stack>
            </Box>
            <Box p={3} borderTop="1px solid #e4e4e7">
                <Flex align="center" justifyContent="space-between">
                    <Flex align="center">
                        <User size={32} color={"#0000FF"}/>
                        <Box fontWeight="bold" ml={4}>{userInfo?.name}</Box>
                    </Flex>
                    <IconButton variant="outline" color={"accent2"} onClick={handleLogout}>
                        <SignOut size={20}/>
                    </IconButton>
                </Flex>
            </Box>
        </Box>
    );
}

export default Sidebar;
