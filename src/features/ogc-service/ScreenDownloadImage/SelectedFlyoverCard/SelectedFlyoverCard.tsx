import { appState } from '@/util/State'
import { formatDateAndTime, roundTo } from '@/util/utils'
import { Group, Paper, Stack, Text, Title } from '@mantine/core'
import { IconCalendar, IconCloud, IconWorld } from '@tabler/icons-react'
import { useSnapshot } from 'valtio'

const SelectedFlyoverCard = () => {

    const { selectedFlyover } = useSnapshot(appState);

    if (!selectedFlyover) return (
        <Paper withBorder p='md' radius='md'>
            <Text size={'lg'} fw={500}>No flyover selected</Text>
        </Paper>
    )

    const dateFrom = new Date(selectedFlyover.fromTime);
    const formattedDateFrom = formatDateAndTime(dateFrom);

    const cloudCoverage = roundTo(selectedFlyover.cloudCover, 2);
    const imageCoverage = roundTo(selectedFlyover.imageCover, 2);

    return (
        <div>
            <Text fw={500} size={'sm'} color='primaryRed' lh={1}>Selected</Text>
            <Text size={'lg'} lh={1.35} fw={500} mb={'sm'}>Flyover #{selectedFlyover.id}</Text>
            <Stack spacing={'sm'}>
                <Group spacing={'sm'} noWrap>
                    <IconCalendar size={22} />
                    <div>
                        <Text>{formattedDateFrom}</Text>
                        <Text size='xs' color='dimmed'>Date and Time</Text>
                    </div>
                </Group>

                <Group spacing={'sm'} noWrap>
                    <IconCloud size={22} />
                    <div>
                        <Text>{cloudCoverage} %</Text>
                        <Text size='xs' color='dimmed'>Cloud Coverage</Text>
                    </div>
                </Group>

                <Group spacing={'sm'} noWrap>
                    <IconWorld size={22} />
                    <div>
                        <Text>{imageCoverage} %</Text>
                        <Text size='xs' color='dimmed'>Image Coverage</Text>
                    </div>
                </Group>
            </Stack>
        </div>
    )
}

export default SelectedFlyoverCard