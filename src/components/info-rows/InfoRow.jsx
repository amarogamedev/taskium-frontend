import { Box, Flex, Text } from "@chakra-ui/react";

const InfoRow = ({ label, value, icon }) => (
    <Flex gap={2} alignItems="center">
        {icon && <Box>{icon}</Box>}
        <Text color="gray.600">
            {label}:
        </Text>
        <Text>{value ?? '-'}</Text>
    </Flex>
);

export default InfoRow;
