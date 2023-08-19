import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    containerPaddingX: {
        paddingLeft: 0,
        paddingRight: 0,

        [theme.fn.smallerThan('xl')]: {
            paddingLeft: theme.spacing.xl,
            paddingRight: theme.spacing.xl,
        },

        [theme.fn.smallerThan('md')]: {
            paddingLeft: theme.spacing.lg,
            paddingRight: theme.spacing.lg,
        },

        [theme.fn.smallerThan('sm')]: {
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
        },
    }
}));