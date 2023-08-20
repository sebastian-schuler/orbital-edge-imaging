import { Box, Card, Container, SimpleGrid, Text, Title, rem } from '@mantine/core';
import { IconGauge, IconMap2, IconUser } from '@tabler/icons-react';
import useStyles from './SectionFeatures.styles';

const mockdata = [
    {
        title: 'Easy-to-use',
        description:
            'The application is designed to be easy-to-use and intuitive, so you can focus on your work instead of learning how to use it.',
        icon: IconGauge,
    },
    {
        title: 'Privacy focused',
        description:
            'We do not collect any personal data, and we do not share your data with third parties.',
        icon: IconUser,
    },
    {
        title: 'Large imagery database',
        description:
            'We have a large database of satellite imagery, and we are constantly adding more.',
        icon: IconMap2,
    },
];

/**
 * Features section with 3 cards, used on index page
 * Template source: https://ui.mantine.dev/category/features
 */
const SectionFeatures = () => {

    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
        <Box py="xl">

            <Title order={2} className={classes.title} ta="center" mt="sm">
                Download satellite imagery effortlessly
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                We provide a simple and easy-to-use interface to search and download satellite imagery, pre-processed with the filter of your choice and ready to use.
            </Text>

            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                {features}
            </SimpleGrid>
        </Box>
    );
}

export default SectionFeatures