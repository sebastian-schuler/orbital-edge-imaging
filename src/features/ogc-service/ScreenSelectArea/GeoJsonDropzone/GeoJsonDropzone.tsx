import { appState } from '@/util/State';
import { ActionIcon, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconMap, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
import { GeoJsonObject } from 'geojson';
import { useSnapshot } from 'valtio';

type GeoJsonDropzoneProps = {
    geoJsonFile: File | null
    setGeoJsonFile: (value: File | null) => void
}

/**
 * Dropzone for GeoJSON files, display file name and size if file is uploaded
 */
const GeoJsonDropzone = ({ geoJsonFile, setGeoJsonFile }: GeoJsonDropzoneProps) => {

    const theme = useMantineTheme();

    // Valtio state
    const { geoJson } = useSnapshot(appState);

    /**
     * Remove GeoJSON file from state and reset bounds
     */
    const removeFile = () => {
        appState.bounds = null;
        appState.geoJson = null;
        setGeoJsonFile(null);
    }

    // If geoJson is already uploaded, display file name and size instead of dropzone
    if (geoJson && geoJsonFile) {
        return (
            <Paper withBorder p='md' radius='md'>
                <Group position='apart'>

                    <div>
                        <Text fw={500} fz='sm'>
                            Uploaded GeoJSON file
                        </Text>
                        <Text fw={700} fz='lg'>{geoJsonFile.name}</Text>
                        <Text lh={1}>{Math.round(geoJsonFile.size / 1000)} KB</Text>
                    </div>

                    <ActionIcon variant='default' onClick={removeFile}>
                        <IconTrash size='1.225rem' />
                    </ActionIcon>

                </Group>
            </Paper>
        )
    }

    return (
        <Dropzone
            onDrop={(files) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result;
                    if (!text) return;
                    const newGeoJson = JSON.parse(text as string) as unknown as GeoJsonObject;
                    appState.geoJson = newGeoJson;
                }
                reader.readAsText(files[0]);
                setGeoJsonFile(files[0]);
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            multiple={false}
            accept={
                {
                    'application/vnd.geo+json': ['.geojson', '.json'],
                }
            }
            data-cy={'geojson-dropzone'}
        >
            <Stack align='center' style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <IconUpload
                        size='3.2rem'
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size='3.2rem'
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconMap size='3.2rem' stroke={1.5} />
                </Dropzone.Idle>

                <div>
                    <Text size='xl' inline ta={'center'}>
                        Upload GeoJSON file
                    </Text>
                    <Text size='sm' ta={'center'} inline mt={7}>
                        Drag a .geojson file here or click to select one, it should not exceed 5mb
                    </Text>
                </div>
            </Stack>
        </Dropzone>
    );
}

export default GeoJsonDropzone