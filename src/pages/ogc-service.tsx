import Boundary from '@/components/Boundary/Boundary';
import { Loader, Stack, Title } from '@mantine/core';
import dynamic from 'next/dynamic';

/**
 * OGC Service page, contains all OGC Service components
 */
const OgcServicePage = () => {

    /**
     * Dynamic import of OGC Service components, to avoid SSR (needed for Leaflet)
     */
    const Map = dynamic(
        () => import('@/features/ogc-service/ServiceContainer'),
        {
            loading: () => (
                <Stack justify='center' align='center' h={400}>
                    <Title order={2} size={'h5'}>Initializing OGC service</Title>
                    <Loader variant='dots' />
                </Stack>
            ),
            ssr: false
        }
    );

    return (
        <Boundary>
            <Map />
        </Boundary>
    )
}

export default OgcServicePage;