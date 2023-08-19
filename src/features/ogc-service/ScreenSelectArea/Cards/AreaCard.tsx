import { appState } from '@/util/State';
import { Group, Paper, Text } from '@mantine/core';
import * as turf from '@turf/turf';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

/**
 * Card for displaying area size in m² and ha
 */
const AreaCard = () => {

    // Component state
    const [area, setArea] = useState<number>(0);

    // Valtio state
    const { bounds } = useSnapshot(appState);

    /**
     * Calculate area size when bounds are updated
     */
    useEffect(() => {
        if (bounds) {
            var bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];
            var poly = turf.bboxPolygon(bbox);
            var area = turf.area(poly);
            setArea(area);
        } else {
            setArea(0);
        }
        return () => { }
    }, [bounds, setArea]);

    return (
        <Paper>
            <div>
                <Text fw={500} fz='sm'>
                    Area Size
                </Text>

                <Group noWrap>
                    <Text fw={700}>
                        <Text component='span'>{area.toLocaleString('EN', { maximumFractionDigits: 2 })}</Text>
                        <Text component='span' color='primaryRed.2'> m²</Text>
                    </Text>

                    <Text>or</Text>

                    <Text fw={700}>
                        <Text component='span'>{(area / 10000).toLocaleString('EN', { maximumFractionDigits: 2 })}</Text>
                        <Text component='span' color='primaryRed.2'> ha</Text>
                    </Text>
                </Group>
            </div>
        </Paper>
    )
}

export default AreaCard