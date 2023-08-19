import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        backgroundColor: '#002642',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
            'linear-gradient(250deg, #00264200 0%, #002642 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)',
        paddingTop: `calc(${theme.spacing.xl})`,
        paddingBottom: `calc(${theme.spacing.xl})`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',

        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
        },
    },

    image: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    content: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            marginRight: 0,
        },
    },

    title: {
        color: theme.white,
        fontWeight: 900,
        lineHeight: 1.05,
        maxWidth: rem(500),
        fontSize: rem(48),

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            fontSize: rem(34),
            lineHeight: 1.15,
        },
    },

    subtitle: {
        color: theme.white,
        fontWeight: 500,
        lineHeight: 1.05,
        maxWidth: rem(500),
        fontSize: rem(28),
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: rem(500),

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
        },
    },

    control: {
        paddingLeft: rem(50),
        paddingRight: rem(50),
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(22),

        [theme.fn.smallerThan('md')]: {
            width: '100%',
        },
    },
}));