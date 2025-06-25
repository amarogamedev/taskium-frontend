import { Box, Field, Flex, Input, Select, Text, createListCollection } from "@chakra-ui/react";

export function EditableInfoRow({label, value, onChange, icon, type = "text", options, required, members, board}) {
    if (type === "select" && options) {
        const collection = createListCollection({items: options});
        return (<Field.Root>
            <Field.Label>
                <Flex gap={2} alignItems="center">
                    {icon && <Box>{icon}</Box>}
                    <Text fontWeight="medium" color="gray.600">{label}</Text>
                    {required && <Text as="span" color="accent2"> *</Text>}
                </Flex>
            </Field.Label>
            <Select.Root
                collection={collection}
                required={required}
                defaultValue={[value]}
                onValueChange={e => onChange(e.value[0])}
            >
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText/>
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator/>
                    </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((item) => (<Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator/>
                        </Select.Item>))}
                    </Select.Content>
                </Select.Positioner>
            </Select.Root>
        </Field.Root>);
    }

    if (type === "members" && members) {
        const collection = createListCollection({
            items: [
                { value: '', label: 'Unassigned' },
                {
                    value: board.owner.id,
                    label: `${board.owner.name} (Owner)`
                },
                ...members
                    .filter(member => member.id !== board.owner.id)
                    .map(member => ({
                        value: member.id,
                        label: member.name
                    }))
            ]
        });
        return (
            <Field.Root>
                <Field.Label>
                    <Flex gap={2} alignItems="center">
                        {icon && <Box>{icon}</Box>}
                        <Text fontWeight="medium" color="gray.600">{label}</Text>
                        {required && <Text as="span" color="accent2"> *</Text>}
                    </Flex>
                </Field.Label>
                <Select.Root
                    collection={collection}
                    required={required}
                    defaultValue={[value]}
                    onValueChange={e => onChange(e.value[0])}
                >
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select a member"/>
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator/>
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Select.Positioner>
                        <Select.Content>
                            {collection.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator/>
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Select.Root>
            </Field.Root>
        );
    }

    return (<Field.Root>
        <Field.Label>
            <Flex gap={2} alignItems="center">
                {icon && <Box>{icon}</Box>}
                <Text fontWeight="medium" color="gray.600">{label}</Text>
                {required && <Text as="span" color="accent2"> *</Text>}
            </Flex>
        </Field.Label>
        <Input
            type={type}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            required={required}
        />
    </Field.Root>);
};
