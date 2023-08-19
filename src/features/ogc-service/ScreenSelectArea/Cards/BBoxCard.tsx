import { appState } from '@/util/State';
import { ActionIcon, Group, Paper, Text } from '@mantine/core';
import { IconCheck, IconClipboard } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

/**
 * Card that displays the selected bounding box in the format [west, south, east, north]
 */
const BBoxCard = () => {

    // Component state
    const [hasCopied, sethasCopied] = useState(false);

    // Valtio state
    const { bounds } = useSnapshot(appState);

    /**
     * Copy BBox string to clipboard
     */
    const copyToClipboard = () => {
        const value = bounds?.toBBoxString() || '';
        navigator.clipboard.writeText(value);
        sethasCopied(true);
    }

    /**
     * Reset hasCopied state after 1.8 seconds, to swap icon back to clipboard
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (hasCopied) sethasCopied(false);
        }, 1800);
        return () => {
            clearTimeout(timeout)
        }
    }, [hasCopied]);

    return (
        <Paper>
            <Group position='apart'>

                <div>
                    <Text fw={500} fz='sm'>
                        Selected Bounding Box
                    </Text>
                    <Text fw={700}>

                        <Text component='span' color='primaryRed.2'>{'[ '}</Text>
                        {bounds?.getWest().toFixed(3) || 0}
                        <Text component='span' color='primaryRed.2'>{' , '}</Text>
                        {bounds?.getSouth().toFixed(3) || 0}
                        <Text component='span' color='primaryRed.2'>{' , '}</Text>
                        {bounds?.getEast().toFixed(3) || 0}
                        <Text component='span' color='primaryRed.2'>{' , '}</Text>
                        {bounds?.getNorth().toFixed(3) || 0}
                        <Text component='span' color='primaryRed.2'>{' ]'}</Text>

                    </Text>
                </div>

                <ActionIcon variant='default' onClick={copyToClipboard} title='Copy BBox to clipboard'>
                    {hasCopied ? <IconCheck size='1.225rem' color='green' /> : <IconClipboard size='1.225rem' />}
                </ActionIcon>
            </Group>
        </Paper>
    )
}

export default BBoxCard