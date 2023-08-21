import { sentinelImageFormats } from '@/data/SentinelHubData'
import { GetMapReqData, GetMapResData } from '@/pages/api/getMap'
import { appState } from '@/util/State'
import { calcInitialRectangleDimensions } from '@/util/rectDimensionCalcHelper'
import { Button, Paper, Select, Stack, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { ref, useSnapshot } from 'valtio'
import DimensionsInput from './DimensionsInput/DimensionsInput'
import useStyles from './DownloadParamBox.styles'
import { notifications } from '@mantine/notifications';

type DownloadParamBoxProps = {
  isFetching: boolean
  setIsFetching: (isFetching: boolean) => void
}

/**
 * Download parameters box, used in DownloadImageScreen component
 */
const DownloadParamBox = ({ isFetching, setIsFetching }: DownloadParamBoxProps) => {

  const { classes } = useStyles();

  // Valtio state
  const { bounds, layerId, maxCloudCover, dateRange, imageFormat, pixelDimensions } = useSnapshot(appState);

  // Initial dimensions for rectangle, based on pixel dimensions calculated from bounds
  const initialDim = pixelDimensions ? calcInitialRectangleDimensions(pixelDimensions, 400) : { height: 0, width: 0 };

  // Component state
  const [height, setHeight] = useState<number>(initialDim.height);
  const [width, setWidth] = useState<number>(initialDim.width);

  /**
   * Collect data to send to API
   */
  const getData = (): GetMapReqData | null => {

    // Validate data
    // TODO: Add error message and detailed validation
    if (!layerId || !dateRange[0] || !dateRange[1] || !bounds || !imageFormat) return null;

    return {
      layerId: layerId,
      maxCloudCoverPercent: maxCloudCover,
      dateFrom: dateRange[0].getTime(),
      dateTo: dateRange[1].getTime(),
      bounds: [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
      height: Math.round(height),
      width: Math.round(width),
      imageFormat: imageFormat
    }
  }

  /**
   * Fetch map image from API
   */
  const fetchMapImage = async () => {

    // If already fetching, skip fetch
    if (isFetching) return;

    setIsFetching(true)
    const formData = getData();

    // If formData is null, skip fetch
    if (!formData) {
      setIsFetching(false);
      return;
    }

    // Fetch map image
    const res = await fetch('/api/getMap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).catch((err) => {
      notifications.show({
        title: 'Error',
        message: err.message,
      });
      return null;
    });

    if (!res) {
      setIsFetching(false);
      return;
    }

    if (res.ok) {
      // Set map image
      const json: GetMapResData = await res.blob();
      appState.mapImage = ref(json);
    } else {
      notifications.show({
        title: 'Error: Invalid parameters',
        message: 'Could not fetch map image. Please check your parameters and try again.',
      });
      appState.mapImage = null;
    }

    setIsFetching(false);
  }

  return (
    <Paper>
      <Stack>
        <Title order={3} size={'h6'}>Download Parameters</Title>

        <div>
          <Text size={'sm'} fw={500}>Layer*</Text>
          <Select
            value={imageFormat}
            onChange={(value) => appState.imageFormat = value}
            placeholder='Pick one'
            data={sentinelImageFormats}
            classNames={{
              input: classes.inputBox
            }}
            title='Image format to download'
            data-cy='image-format-select'
          />
        </div>

        <DimensionsInput
          height={height}
          width={width}
          setHeight={setHeight}
          setWidth={setWidth}
        />

        <Button
          onClick={fetchMapImage}
          loading={isFetching}
          title='Download map image'
          data-cy='download-image-button'
        >Get Image</Button>

      </Stack>
    </Paper>
  )
}

export default DownloadParamBox