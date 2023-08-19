import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    footer: {
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.white,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));