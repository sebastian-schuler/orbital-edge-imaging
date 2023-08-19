import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    inner: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    menuItem: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textDecoration: 'none',
        },

        '&:active': {
            fontWeight: 'bolder',

        },
    },

    linkLabel: {
        marginRight: theme.spacing.sm,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));