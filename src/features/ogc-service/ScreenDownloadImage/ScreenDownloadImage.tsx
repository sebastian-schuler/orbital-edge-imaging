import { AppState } from '@/types/appStateTypes'
import { appState } from '@/util/State'
import { Anchor, Grid, Image, Loader, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import { useSnapshot } from 'valtio'
import DownloadParamBox from './DownloadParamBox/DownloadParamBox'
import SelectedFlyoverCard from './SelectedFlyoverCard/SelectedFlyoverCard'

/**
 * Step 3 of OGC Service, download image
 */
const ScreenDownloadImage = () => {

    // Component states
    const [isFetching, setIsFetching] = useState(false);

    // Valtio state
    const { mapImage, imageFormat } = useSnapshot(appState) as AppState;

    return (
        <Grid gutter={'lg'} grow>

            <Grid.Col xs={12} md={4}>
                <DownloadParamBox
                    setIsFetching={setIsFetching}
                    isFetching={isFetching}
                />
            </Grid.Col>

            <Grid.Col xs={12} md={6}>
                <Stack align='center' justify='center'>
                    {
                        isFetching ? (
                            <>
                                <Text>Loading Image...</Text>
                                <Loader />
                            </>
                        ) : (
                            mapImage && imageFormat ? (
                                <>
                                    <div>
                                        {mapImage && (
                                            <Image display='flex' fit='scale-down' src={URL.createObjectURL(mapImage)} alt='Fetched Image' />
                                        )}
                                    </div>
                                    <div>
                                        {mapImage && imageFormat && (
                                            <Anchor
                                                component='a'
                                                href={URL.createObjectURL(mapImage)}
                                                color='primaryRed.3'
                                                download={`map.${imageFormat.toLowerCase()}`}
                                                data-cy='download-image-link'
                                            >Download</Anchor>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Text>No image to display</Text>
                            )
                        )
                    }

                </Stack>
            </Grid.Col>

            <Grid.Col xs={12} md={2}>
                <SelectedFlyoverCard />
            </Grid.Col>

        </Grid>
    )
}

export default ScreenDownloadImage