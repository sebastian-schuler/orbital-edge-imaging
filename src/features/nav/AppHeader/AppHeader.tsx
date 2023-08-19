import Boundary from '@/components/Boundary/Boundary';
import { Box, Burger, Button, Group, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PageNavMobile from '../AppHeaderMobile/AppHeaderMobile';
import PageLogo from '../PageLogo';
import useStyles from './AppHeader.styles';

export const HEADER_HEIGHT = 65;

export interface NavHeaderLink {
    link: string
    label: string
    isActive: boolean
}

interface PageNavProps {
    navLinks: NavHeaderLink[]
    drawerOpened: boolean
    toggleDrawer: () => void
}

/**
 * Navigation bar for the desktop website
 */
const PageNav: React.FC<PageNavProps> = ({ navLinks, drawerOpened, toggleDrawer }: PageNavProps) => {

    const { classes } = useStyles();

    return (
        <Boundary>
            <Box className={classes.inner} >

                <PageLogo />

                <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                    {
                        navLinks.map((link, i) => (
                            <Link key={i} href={link.link}>
                                <Button
                                    key={link.label}
                                    variant='subtle'
                                    className={classes.menuItem}
                                    sx={{ fontWeight: link.isActive ? 'bold' : 'normal' }}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))
                    }

                </Group>

                <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
            </Box>
        </Boundary>
    );

}

/**
 * Header component for the website, contains the navigation bar for desktop and mobile
 */
const AppHeader = () => {

    const router = useRouter();

    // Component state
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    // Navigation links used for desktop and mobile
    const navLinks: NavHeaderLink[] = [
        {
            link: '/',
            label: 'Home',
            isActive: router.route === '/'
        },
        {
            link: '/ogc-service',
            label: 'OGC Service',
            isActive: router.route.startsWith('/ogc-service')
        },
    ];

    return (
        <>
            <Header
                height={HEADER_HEIGHT}
                fixed
                styles={(theme) => ({
                    root: {
                        boxShadow: theme.shadows.sm,
                        zIndex: 1000,
                    }
                })}
            >
                <PageNav navLinks={navLinks} drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} />
            </Header>

            <PageNavMobile
                closeDrawer={closeDrawer}
                drawerOpened={drawerOpened}
                navLinks={navLinks}
            />
        </>
    );

}

export default AppHeader;