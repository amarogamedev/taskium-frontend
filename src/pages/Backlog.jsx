import {Flex} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {useParams} from "react-router-dom";

function Backlog() {
    const {boardId} = useParams();

    return (
        <Flex minH="100vh" bg="gray.100">
            <Sidebar/>
        </Flex>
    );
}

export default Backlog;
