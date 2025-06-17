import {Box, Button, Flex, IconButton, Image, Stack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {ClipboardText, GearSix, House, Question, SignOut} from "phosphor-react";

function Sidebar() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return (
        <Box w="280px" bg="white" h="100vh" display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
                <Image src="logo.png" p={6} pl={4}/>
                <Stack>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/")}>
                        <House size={16}/>
                        Home page
                    </Button>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/backlog")}>
                        <ClipboardText size={16}/>
                        Backlog
                    </Button>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/settings")}>
                        <GearSix size={16}/>
                        Settings
                    </Button>
                    <Button variant="ghost" justifyContent="flex-start" onClick={() => navigate("/about")}>
                        <Question size={16}/>
                        About
                    </Button>
                </Stack>
            </Box>
            <Box p={3} borderTop="1px solid #eee">
                <Flex align="center" justifyContent="space-between">
                    <Flex align="center">
                        <Image src="/user-fill.png" boxSize="36px" borderRadius="full" mr={2}/>
                        <Box fontWeight="bold">{userInfo?.name}</Box>
                    </Flex>
                    <IconButton variant="outline" colorScheme="red" onClick={() => {}}>
                        <SignOut size={20}/>
                    </IconButton>
                </Flex>
            </Box>
        </Box>
    );
}

export default Sidebar;
