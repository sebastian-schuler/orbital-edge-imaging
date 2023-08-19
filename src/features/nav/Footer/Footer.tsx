import { Anchor, Container, Group } from '@mantine/core';
import PageLogo from '../PageLogo';
import useStyles from './Footer.styles';

const Footer = () => {

    const links = [
        { label: 'About', link: '#' },
        { label: 'Contact', link: '#' },
    ];

    const { classes } = useStyles();
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
            <Container className={classes.inner}>
                <PageLogo />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}

export default Footer;