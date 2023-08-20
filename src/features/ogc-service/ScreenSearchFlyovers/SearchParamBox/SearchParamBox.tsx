import { sentinelLayerIds } from '@/data/SentinelHubData'
import { AppState } from '@/types/appStateTypes'
import { appState } from '@/util/State'
import { Button, Group, Paper, Select, Slider, Stack, Text, Title } from '@mantine/core'
import { DatePickerInput, DatesRangeValue } from '@mantine/dates'
import { IconCalendar, IconCloud, IconSquaresFilled } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { ref, useSnapshot } from 'valtio'
import useStyles from './SearchParamBox.styles'

type SearchParamBoxProps = {
    fetchSearchResults: () => void
    isFetching: boolean
}

/**
 * Box for displaying search parameters in the SearchFlyovers screen
 */
const SearchParamBox = ({ fetchSearchResults, isFetching }: SearchParamBoxProps) => {

    const { classes } = useStyles();

    // Valtio state
    const { layerId, maxCloudCover, dateRange, bounds } = useSnapshot(appState) as AppState;

    // Component state
    const [dateRangeState, setDateRangeState] = useState<DatesRangeValue>(dateRange);

    /**
     * Check if search button should be disabled, based on if all required fields are filled
     */
    const isSearchDisabled = () => {
        return !layerId || !dateRange[0] || !dateRange[1] || !bounds;
    };

    /**
     * Update dateRange state in valtio when dateRangeState is updated
     */
    useEffect(() => {
        appState.dateRange = ref(dateRangeState);
        return () => { }
    }, [dateRangeState]);

    return (
        <Paper>
            <Stack>
                <Title order={3} size={'h6'}>Search Parameters</Title>

                <Stack spacing={'xs'}>
                    <Group spacing={'sm'}>
                        <IconSquaresFilled size={24} />
                        <Text size={'sm'} fw={500}>Layer*</Text>
                    </Group>
                    <Select
                        value={layerId}
                        onChange={(value) => appState.layerId = value}
                        placeholder='Pick one'
                        data={sentinelLayerIds}
                        classNames={{
                            input: classes.inputBox
                        }}
                        title='Layer to display'
                        data-cy='layer-select'
                    />
                </Stack>

                <Stack spacing={'xs'}>
                    <Group spacing={'sm'}>
                        <IconCalendar size={24} />
                        <Text size={'sm'} fw={500}>Date Range*</Text>
                    </Group>
                    <DatePickerInput
                        type='range'
                        value={dateRangeState}
                        onChange={setDateRangeState}
                        placeholder='Dates to search through'
                        classNames={{
                            day: classes.day,
                            input: classes.inputBox,
                        }}
                        maxDate={new Date()}
                        title='Date range to search through'
                        data-cy='date-range'
                    />
                </Stack>

                <Stack spacing={0}>
                    <Group spacing={'sm'}>
                        <IconCloud size={24} />
                        <Text size={'sm'} fw={500}>Max Cloud coverage*</Text>
                    </Group>
                    <Slider
                        value={maxCloudCover}
                        onChange={(value) => appState.maxCloudCover = value}
                        marks={[
                            { value: 20, label: '20%' },
                            { value: 50, label: '50%' },
                            { value: 80, label: '80%' },
                        ]}
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={100}
                        label={(value) => `${value} %`}
                        mb={'md'}
                        title='Maximum cloud coverage percentage'
                        data-cy='cloud-cover-slider'
                    />
                </Stack>

                <Button
                    onClick={fetchSearchResults}
                    loading={isFetching}
                    disabled={isSearchDisabled()}
                    title='Search for flyovers'
                    data-cy='search-flyovers-button'
                >Search Flyovers</Button>
            </Stack>
        </Paper>
    )
}

export default SearchParamBox