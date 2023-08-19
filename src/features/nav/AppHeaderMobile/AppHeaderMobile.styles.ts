import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    menuItem: {
        lineHeight: 1,
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'transparent',
        textDecoration: 'none',
    },
}));