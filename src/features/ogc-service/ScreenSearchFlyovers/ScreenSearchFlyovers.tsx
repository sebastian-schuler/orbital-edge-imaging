import { SearchFlyoversReqData, SearchFlyoversResData } from '@/pages/api/searchFlyovers'
import { AppState } from '@/types/appStateTypes'
import { appState } from '@/util/State'
import { Divider, Grid, Loader, Stack, Text } from '@mantine/core'
import { FlyoverInterval } from '@sentinel-hub/sentinelhub-js/dist/src/layer/const'
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import FlyoverCard from './FlyoverCard/FlyoverCard'
import ResultHeader from './ResultHeader/ResultHeader'
import SearchParamBox from './SearchParamBox/SearchParamBox'
import { notifications } from '@mantine/notifications'

type ScreenSearchFlyoversProps = {
    handleStepChange: (nextStep: number) => void
}

/**
 * Step 2 of OGC Service, search for flyovers
 */
const ScreenSearchFlyovers = ({ handleStepChange }: ScreenSearchFlyoversProps) => {

    // Control states
    const [isFetching, setIsFetching] = useState(false);
    const [sortBy, setSortBy] = useState<string>('datetime');

    // Valtio state
    const { bounds, layerId, maxCloudCover, flyovers, dateRange } = useSnapshot(appState) as AppState;

    /**
     * Select flyover and change to next step
     * @param index - Index of flyover
     * @param flyover - Flyover object
     */
    const selectFlyover = (index: number, flyover: FlyoverInterval) => {
        const flyoverFrom = new Date(flyover.fromTime);
        const flyoverTo = new Date(flyover.toTime);
        appState.selectedFlyover = {
            id: index,
            imageCover: flyover.coveragePercent,
            cloudCover: flyover.meta?.averageCloudCoverPercent,
            fromTime: flyoverFrom.getTime(),
            toTime: flyoverTo.getTime(),
        }
        handleStepChange(2);
    }

    /**
     * Collect data needed for searching flyovers
     */
    const getData = (): SearchFlyoversReqData | null => {

        // Validate data
        // TODO: Add error message and detailed validation
        if (!layerId || !dateRange[0] || !dateRange[1] || !bounds) return null;

        return {
            layerId: layerId,
            maxCloudCoverPercent: maxCloudCover,
            dateFrom: dateRange[0].getTime(),
            dateTo: dateRange[1].getTime(),
            bounds: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
        }
    }

    /**
     * Fetch flyovers from API 
     */
    const fetchSearchResults = async () => {

        // If already fetching, skip fetch
        if (isFetching) return;

        setIsFetching(true)
        const formData = getData();

        // If formData is null, skip fetch
        if (!formData) {
            setIsFetching(false);
            return;
        }

        // Fetch flyovers
        const res = await fetch('/api/searchFlyovers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).catch((err) => {
            console.error(err);
            return null;
        });

        // If res is null, skip fetch
        if (!res) {
            notifications.show({
                title: 'Error',
                message: 'Could not fetch flyovers, please try again later.',
            });
            setIsFetching(false);
            return;
        }

        // Set flyovers
        const json: SearchFlyoversResData = await res.json();
        appState.flyovers = json.flyovers;
        setIsFetching(false);
    }

    /**
     * Reorder flyovers based on sortBy
     */
    useEffect(() => {

        // If no flyovers, skip
        if (flyovers.length === 0) return;

        // Sort by cloud cover
        if (sortBy === 'cloudcover') {
            appState.flyovers = appState.flyovers.sort((a, b) => {
                const aCloudCover = a.meta?.averageCloudCoverPercent;
                const bCloudCover = b.meta?.averageCloudCoverPercent;
                if (aCloudCover && bCloudCover) return aCloudCover - bCloudCover;
                else if (aCloudCover) return -1;
                else if (bCloudCover) return 1;
                else return 0;
            })
        } else if (sortBy === 'imagecover') {
            appState.flyovers = appState.flyovers.sort((a, b) => {
                const aImageCover = a.coveragePercent;
                const bImageCover = b.coveragePercent;
                if (aImageCover && bImageCover) return bImageCover - aImageCover;
                else if (aImageCover) return -1;
                else if (bImageCover) return 1;
                else return 0;
            })
        } else if (sortBy === 'datetime') {
            appState.flyovers = appState.flyovers.sort((a, b) => {
                const aFromTime = new Date(a.fromTime);
                const bFromTime = new Date(b.fromTime);
                return bFromTime.getTime() - aFromTime.getTime();
            })
        }

        return () => { }
    }, [sortBy, flyovers.length]);

    return (
        <Stack>
            <Grid gutter={'lg'} grow>
                <Grid.Col span={12} md={4} lg={4}>
                    <SearchParamBox
                        fetchSearchResults={fetchSearchResults}
                        isFetching={isFetching}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={8} lg={6} >

                    <ResultHeader
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    {
                        isFetching ?
                            (
                                <Stack align='center'>
                                    <Text>Searching for flyovers...</Text>
                                    <Loader size='xl' />
                                </Stack>
                            ) : (
                                <Stack>
                                    {
                                        flyovers.map((flyover, index) =>
                                            <React.Fragment key={index}>
                                                <FlyoverCard
                                                    index={index}
                                                    flyover={flyover}
                                                    onClick={() => selectFlyover(index, flyover)}
                                                />
                                                {index < flyovers.length - 1 && <Divider />}
                                            </React.Fragment>
                                        )
                                    }
                                </Stack>
                            )
                    }
                </Grid.Col>

                <Grid.Col span={12} lg={2}>

                </Grid.Col>
            </Grid>

        </Stack>
    )
}

export default ScreenSearchFlyovers