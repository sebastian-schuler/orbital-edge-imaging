import { AppState } from '@/types/appStateTypes';
import { appState } from '@/util/State';
import { calcBoundsPixelDimensions } from '@/util/rectDimensionCalcHelper';
import { Button, Grid, Stack, Stepper, Title } from '@mantine/core';
import * as turf from '@turf/turf';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import ScreenDownloadImage from './ScreenDownloadImage/ScreenDownloadImage';
import ScreenSearchFlyovers from './ScreenSearchFlyovers/ScreenSearchFlyovers';
import ScreenSelectArea from './ScreenSelectArea/ScreenSelectArea';
import useStyles from './ServiceContainer.styles';

/**
 * Root component for OGC Service, contains stepper and screens
 */
const ServiceContainer = () => {

  const { classes } = useStyles();

  // Map states
  const [map, setMap] = useState<L.Map | null>(null);
  const featureGroupRef = React.useRef<L.FeatureGroup | null>(null);
  const [geoJsonFile, setGeoJsonFile] = React.useState<File | null>(null);

  // Valtio states
  const { bounds, geoJson, activeStep, highestStepVisited } = useSnapshot(appState) as AppState;

  /**
   * Change active step and highest step visited
   * @param nextStep - Next step to change to
   */
  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;
    if (isOutOfBounds) return;

    appState.activeStep = nextStep;
    appState.highestStepVisited = Math.max(highestStepVisited, nextStep);
  };

  /**
   * Check if step should be allowed to be selected
   * @param step - Step to check
   * @returns true if step should be allowed to be selected
   */
  const shouldAllowSelectStep = (step: number) => {

    // User is required to select an area before continuing
    if (step > 0 && bounds === null) return false;

    return highestStepVisited + 1 >= step && activeStep !== step && step >= 0;
  };

  /**
   * When geojson is updated, update bounds and center map on bounds
   */
  useEffect(() => {
    if (!geoJson) return;

    // Clear drawn layers
    featureGroupRef.current?.clearLayers();

    // Get bounds of geojson
    const bbox = turf.bbox(geoJson);
    // Get polygon of bounds
    const bboxpoly = turf.bboxPolygon(bbox);
    // Get coordinates of polygon
    const boundsCoords = turf.getCoords(bboxpoly);

    // Get center of bounds
    const center = turf.center(bboxpoly);
    const centerCoords = turf.getCoords(center);
    // Coordinates calculated by turf have to be swapped to match leaflet
    appState.coords = [centerCoords[1], centerCoords[0]];

    // Swap coordinates to match leaflet
    const coordsSwapped = boundsCoords[0].map((coord: any) => {
      return [coord[1], coord[0]];
    });

    // Set bounds state
    const newBounds = L.latLngBounds(coordsSwapped);
    appState.bounds = newBounds;

    // Center map on bounds
    map?.flyToBounds(coordsSwapped);
  }, [geoJson, map, featureGroupRef]);

  /**
   * When bounds are updated, calculate pixel dimensions of bounds
   */
  useEffect(() => {
    if (bounds && map) {
      const newDim = calcBoundsPixelDimensions(bounds, map);
      appState.pixelDimensions = newDim;
    }
  }, [bounds, map]);

  return (
    <Stack>
      <Title order={1} size={'h3'} mt={'lg'}>OGC Service</Title>

      <Stepper active={activeStep} onStepClick={(newStep) => appState.activeStep = newStep} breakpoint='xs'
        classNames={{
          steps: classes.steps
        }}
      >
        <Stepper.Step label='Select Area' allowStepSelect={shouldAllowSelectStep(0)}>
          <ScreenSelectArea
            featureGroupRef={featureGroupRef}
            setMap={setMap}
            geoJsonFile={geoJsonFile}
            setGeoJsonFile={setGeoJsonFile}
          />
        </Stepper.Step>

        <Stepper.Step label='Search Flyovers' allowStepSelect={shouldAllowSelectStep(1)}>
          <ScreenSearchFlyovers
            handleStepChange={handleStepChange}
          />
        </Stepper.Step>

        <Stepper.Step label='Download Images' allowStepSelect={shouldAllowSelectStep(2)}>
          <ScreenDownloadImage />
        </Stepper.Step>

      </Stepper>

      <Grid gutter={'lg'} pb={'xl'} grow>
        <Grid.Col span={12} md={4}>
          {
            activeStep > 0 &&
            <Button
              component='a' fullWidth variant='default'
              disabled={!shouldAllowSelectStep(activeStep - 1)}
              onClick={() => handleStepChange(activeStep - 1)}
              data-cy='back-button'
            >Back</Button>
          }
        </Grid.Col>

        <Grid.Col span={12} md={4} offsetMd={4}>
          {
            activeStep === 0 &&
            <Button
              component='a' fullWidth
              disabled={!shouldAllowSelectStep(activeStep + 1)}
              onClick={() => handleStepChange(activeStep + 1)}
              data-cy='continue-button'
            >Continue</Button>
          }
        </Grid.Col>
      </Grid>

    </Stack>
  );
};

export default ServiceContainer;