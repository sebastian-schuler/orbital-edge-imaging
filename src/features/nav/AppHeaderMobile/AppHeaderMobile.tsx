import { Button, Drawer, ScrollArea, Stack } from '@mantine/core';
import Link from 'next/link';
import { HEADER_HEIGHT, NavHeaderLink } from '../AppHeader/AppHeader';
import useStyles from '../AppHeader/AppHeader.styles';

interface Props {
    drawerOpened: boolean
    closeDrawer: () => void
    navLinks: NavHeaderLink[]
}

/**
 * Navigation drawer for the mobile website
 */
const PageNavMobile = ({ drawerOpened, closeDrawer, navLinks }: Props) => {

    const { classes } = useStyles();

    return (
        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size='100%'
            padding='md'
            title={'Menu'}
            className={classes.hiddenDesktop}
            zIndex={1000000}
            transitionProps={{
                transition: 'slide-left',
            }}
            styles={(theme) => ({
                close: {
                    color: theme.colors.dark[7],
                }
            })}
        >
            <ScrollArea sx={{ height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)' }} mx='-md'>

                <Stack mx={'md'} spacing={'md'}>
                    {
                        navLinks.map((link, i) => (
                            <Link key={i} href={link.link}>
                                <Button
                                    key={link.label}
                                    variant={link.isActive ? 'outline' : 'default'}
                                    className={classes.menuItem}
                                    fullWidth
                                    onClick={closeDrawer}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))
                    }
                </Stack>

            </ScrollArea>
        </Drawer>
    )
}

export default PageNavMobile