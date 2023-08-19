import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    steps: {
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    day: {

        '&[data-in-range]': {
            backgroundColor: theme.colors.primaryBlue[4],
            color: 'white',
            opacity: '1',
        },

        '&[data-in-range]:hover': {
            backgroundColor: theme.colors.primaryBlue[4],
            color: 'white',
            opacity: '0.8',
        },

        '&[data-first-in-range], &[data-first-in-range]:hover': {
            backgroundColor: theme.colors.primaryRed[4],
            color: 'white',
            opacity: '1',
        },

        '&[data-first-in-range]:hover': {
            backgroundColor: theme.colors.primaryRed[4],
            color: 'white',
            opacity: '0.8',
        },

        '&[data-last-in-range]': {
            backgroundColor: theme.colors.primaryRed[4],
            color: 'white',
            opacity: '1',
        },

        '&[data-last-in-range]:hover': {
            backgroundColor: theme.colors.primaryRed[4],
            color: 'white',
            opacity: '0.8',
        },

    },
    inputBox: {
        backgroundColor: theme.colors.gray[2],
    }
}));