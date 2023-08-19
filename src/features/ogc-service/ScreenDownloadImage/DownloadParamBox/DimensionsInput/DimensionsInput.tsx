import LockDimensionsToggle from '@/components/LockDimensionsToggle/LockDimensionsToggle';
import { calcScaledDimensions } from '@/util/rectDimensionCalcHelper';
import { Group, NumberInput, SimpleGrid } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import useStyles from './DimensionsInput.styles';

type DimensionsInputProps = {
    height: number
    width: number
    setHeight: (height: number) => void
    setWidth: (width: number) => void
}

/**
 * Input fields for image dimensions
 */
const DimensionsInput = ({ height, setHeight, width, setWidth }: DimensionsInputProps) => {

    const { classes } = useStyles();

    // Component state
    const [aspectRatioUnlocked, toggleAspectRatioUnlocked] = useToggle();

    /**
     * Calculate new height when width changes
     */
    const handleWidthChange = (newWidth: number | '') => {
        if (newWidth === '') return;
        setWidth(newWidth);

        if (aspectRatioUnlocked) return;
        const newHeight = calcScaledDimensions({ height: height, width: width }, 'width', newWidth).height;
        setHeight(newHeight);
    };

    /**
     * Calculate new width when height changes
     */
    const handleHeightChange = (newHeight: number | '') => {
        if (newHeight === '') return;
        setHeight(newHeight);

        if (aspectRatioUnlocked) return;
        const newWidth = calcScaledDimensions({ height: height, width: width }, 'height', newHeight).width;
        setWidth(newWidth);
    };

    return (
        <Group noWrap align='end' spacing='sm'>
            <SimpleGrid
                cols={1}
                breakpoints={[
                    { minWidth: 'md', cols: 2, spacing: 'sm' },
                ]}
                sx={{ flexGrow: 1 }}
            >
                <NumberInput
                    value={height}
                    onChange={handleHeightChange}
                    label="Image Height*"
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    classNames={{
                        input: classes.inputBox
                    }}
                    max={1000}
                    min={1}
                    title='Image height in pixels'
                />
                <NumberInput
                    value={width}
                    onChange={handleWidthChange}
                    label="Image Width*"
                    stepHoldDelay={500}
                    stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                    classNames={{
                        input: classes.inputBox
                    }}
                    max={1000}
                    min={1}
                    title='Image width in pixels'
                />
            </SimpleGrid>
            <LockDimensionsToggle
                aspectRatioUnlocked={aspectRatioUnlocked}
                toggleAspectRatioLocked={toggleAspectRatioUnlocked}
            />
        </Group>
    )
}

export default DimensionsInput