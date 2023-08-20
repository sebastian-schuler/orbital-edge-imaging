import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    footer: {
        borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.white,
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));