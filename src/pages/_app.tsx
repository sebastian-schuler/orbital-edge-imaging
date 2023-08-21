import '@/styles/globals.css'
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import IAppShell from '@/features/nav/AppShell';
import appTheme from '@/styles/theme';
import { Notifications } from '@mantine/notifications';

/**
 * Custom App component, used to initialize MantineProvider
 */
export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Orbital Edge Imaging</title>
        <meta name='description' content='Search and download satellite imagery with specific filters, timestamps and more' />
        <meta name='keywords' content='web map service, wms, ogc, satellite imagery' />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...appTheme,
          colorScheme: 'light',
        }}
      >
        <Notifications />
        <IAppShell>
          <Component {...pageProps} />
        </IAppShell>
      </MantineProvider>
    </>
  )
}
