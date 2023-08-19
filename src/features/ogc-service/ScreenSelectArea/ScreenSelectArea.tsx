import { appState } from '@/util/State'
import { Grid, Paper, SimpleGrid, Stack, Text } from '@mantine/core'
import { useSnapshot } from 'valtio'
import AreaCard from './Cards/AreaCard'
import BBoxCard from './Cards/BBoxCard'
import GeoJsonDropzone from './GeoJsonDropzone/GeoJsonDropzone'
import InteractiveMap from './InteractiveMap/InteractiveMap'

type SectionSelectAreaProps = {
    setMap: (value: L.Map) => void
    featureGroupRef: React.MutableRefObject<L.FeatureGroup | null>
    geoJsonFile: File | null
    setGeoJsonFile: (value: File | null) => void
}

/**
 * Step 1 of OGC Service, select area
 */
const ScreenSelectArea = ({ setMap, featureGroupRef, geoJsonFile, setGeoJsonFile }: SectionSelectAreaProps) => {

    // Valtio state
    const { geoJson } = useSnapshot(appState);

    return (
        <Stack spacing={'lg'}>

            <Grid sx={{ maxWidth: '100vw' }} gutter={'lg'}>
                <Grid.Col span={12} lg={4}>
                    <Stack>
                        <GeoJsonDropzone
                            geoJsonFile={geoJsonFile}
                            setGeoJsonFile={setGeoJsonFile}
                        />

                        <Text ta={'center'} color='primaryRed.2' size={'xl'}>or</Text>

                        <Paper opacity={geoJson ? 0.4 : 1}>
                            <Stack align='center'>
                                <Text ta={'center'}>Draw an area on the map</Text>
                            </Stack>
                        </Paper>

                    </Stack>
                </Grid.Col>

                <Grid.Col span={12} lg={8}>
                    <SimpleGrid cols={2} mb={'md'}>
                        <BBoxCard />
                        <AreaCard />
                    </SimpleGrid>
                    <InteractiveMap featureGroupRef={featureGroupRef} setMap={setMap} />
                </Grid.Col>
            </Grid>

        </Stack>
    )
}

export default ScreenSelectArea