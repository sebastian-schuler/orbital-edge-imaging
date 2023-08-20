import { formatDateAndTime, roundTo } from '@/util/utils'
import { ActionIcon, Flex, Group, Text } from '@mantine/core'
import { FlyoverInterval } from '@sentinel-hub/sentinelhub-js/dist/src/layer/const'
import { IconArrowBigRightFilled, IconCalendar, IconCloud, IconWorld } from '@tabler/icons-react'
import useStyles from './FlyoverCard.styles'

type FlyoverCardProps = {
    index: number
    flyover: FlyoverInterval
    onClick: (index: number, flyover: FlyoverInterval) => void
}

/**
 * Card that displays flyover information
 */
const FlyoverCard = ({ index, flyover, onClick }: FlyoverCardProps) => {

    const { classes } = useStyles();

    // Get date from flyover
    const dateFrom = new Date(flyover.fromTime);

    // Get cloud and image coverage
    const cloudCoverage = flyover.meta?.averageCloudCoverPercent ? roundTo(flyover.meta?.averageCloudCoverPercent, 2) : 0;
    const imageCoverage = roundTo(flyover.coveragePercent, 2);

    return (
        <div>
            <Text pb={'md'} className={classes.title}>
                Flyover #{index + 1}
            </Text>
            <Flex>
                <Group sx={{ flexGrow: 1 }}>
                    <Group spacing={'sm'}>
                        <IconCalendar size={22} />
                        <div>
                            <Text className={classes.date}>{formatDateAndTime(dateFrom)}</Text>
                            <Text size='xs' color='dimmed'>Date and Time</Text>
                        </div>
                    </Group>

                    <Group spacing={'sm'}>
                        <IconCloud size={22} />
                        <div>
                            <Text className={classes.date}>{cloudCoverage} %</Text>
                            <Text size='xs' color='dimmed'>Cloud Coverage</Text>
                        </div>
                    </Group>

                    <Group spacing={'sm'}>
                        <IconWorld size={22} />
                        <div>
                            <Text className={classes.date}>{imageCoverage} %</Text>
                            <Text size='xs' color='dimmed'>Image Coverage</Text>
                        </div>
                    </Group>
                </Group>

                <ActionIcon
                    variant='filled'
                    color='primaryRed'
                    size={'lg'}
                    ml={'md'}
                    onClick={() => onClick(index, flyover)}
                    title={`Select flyover ${index + 1}`}
                    data-cy='select-flyover-button'
                >
                    <IconArrowBigRightFilled size='1.125rem' />
                </ActionIcon>
            </Flex>
        </div>
    )
}

export default FlyoverCard