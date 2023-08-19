import { ActionIcon } from '@mantine/core'
import { IconAspectRatio, IconAspectRatioOff } from '@tabler/icons-react'

type LockDimensionsToggleProps = {
    aspectRatioUnlocked: boolean
    toggleAspectRatioLocked: () => void
}

/**
 * Switches between locked and unlocked aspect ratio
 */
const LockDimensionsToggle = ({ aspectRatioUnlocked, toggleAspectRatioLocked }: LockDimensionsToggleProps) => {

    return (
        <ActionIcon
            variant="subtle"
            onClick={toggleAspectRatioLocked}
            size={'lg'}
            sx={(theme) => ({
                color: aspectRatioUnlocked ? theme.colors.gray[7] : theme.colors.primaryRed[4],
            })}
            title={aspectRatioUnlocked ? 'Lock aspect ratio' : 'Unlock aspect ratio'}
        >
            {aspectRatioUnlocked ? <IconAspectRatioOff size="1.2rem" /> : <IconAspectRatio size="1.2rem" />}
        </ActionIcon>
    )
}

export default LockDimensionsToggle