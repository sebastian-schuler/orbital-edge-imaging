import { AppShell } from '@mantine/core';
import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import Footer from './Footer/Footer';

type Props = {
    children: React.ReactNode
}

const IAppShell = ({ children }: Props) => {

    return (
        <AppShell
            padding={0}
            header={<AppHeader />}
            footer={<Footer />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            {children}
        </AppShell>
    )
}

export default IAppShell