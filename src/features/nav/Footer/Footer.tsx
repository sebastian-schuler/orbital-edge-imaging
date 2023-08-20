import Boundary from '@/components/Boundary/Boundary';
import { Anchor, Group } from '@mantine/core';
import PageLogo from '../PageLogo';
import useStyles from './Footer.styles';

// Data 
const links = [
    { label: 'Home', link: '/' },
    { label: 'OGC Service', link: '/ogc-service' },
];

/**
 * Footer component, contains links to other pages
 */
const Footer = () => {

    const { classes, theme } = useStyles();

    // Create links 
    const items = links.map((link) => (
        <Anchor<'a'>
            color='dimmed'
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size='sm'
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Boundary
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: theme.spacing.xl,
                    paddingBottom: theme.spacing.xl,

                    [theme.fn.smallerThan('xs')]: {
                        flexDirection: 'column',
                    },
                }}
            >
                <PageLogo />
                <Group className={classes.links}>{items}</Group>
            </Boundary>
        </div>
    );
}

export default Footer;