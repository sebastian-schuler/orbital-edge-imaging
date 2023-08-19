import { AppState } from '@/types/appStateTypes';
import { appState } from '@/util/State';
import { Divider, Group, Select, Title } from '@mantine/core';
import { useSnapshot } from 'valtio';

const sortByOptions = [
    { value: 'datetime', label: 'Date & Time' },
    { value: 'cloudcover', label: 'Cloud Coverage' },
    { value: 'imagecover', label: 'Image Coverage' },
];

type ResultHeaderProps = {
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

/**
 * Header for flyover search results, used in ScreenSearchFlyovers
 */
const ResultHeader = ({ sortBy, setSortBy }: ResultHeaderProps) => {

    const { flyovers } = useSnapshot(appState) as AppState;

    // Dynamic title text
    let titleText = '';
    if (flyovers.length === 0) titleText = 'No Results';
    else if (flyovers.length === 1) titleText = '1 Result';
    else titleText = `${flyovers.length} Results`;

    return (
        <div>
            <Group position='apart'>
                <Title order={3} size={'h6'}>{titleText}</Title>
                <Select
                    variant='unstyled'
                    value={sortBy}
                    onChange={setSortBy}
                    data={sortByOptions}
                    size='sm'
                    title='Sort flyovers by'
                />
            </Group>
            <Divider mt={'xs'} mb={'lg'} />
        </div>
    )
}

export default ResultHeader