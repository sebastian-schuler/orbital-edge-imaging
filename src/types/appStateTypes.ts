import { RectangleDimensions } from "@/util/rectDimensionCalcHelper";
import { DatesRangeValue } from "@mantine/dates";
import { FlyoverInterval } from "@sentinel-hub/sentinelhub-js/dist/src/layer/const";
import { GeoJsonObject } from 'geojson';
import L from 'leaflet';

// AppState type, used to store the state of the OGC service app
export type AppState = {

    // Map states
    coords: L.LatLngExpression
    bounds: L.LatLngBounds | null
    pixelDimensions: RectangleDimensions | null
    geoJson: GeoJsonObject | null

    // Stepper states
    activeStep: number
    highestStepVisited: number

    // Form states
    layerId: string | null
    maxCloudCover: number
    flyovers: FlyoverInterval[]
    imageFormat: string | null
    mapImage: Blob | null
    dateRange: DatesRangeValue

    // UI
    selectedFlyover: FlyoverDetails | null
}

// FlyoverDetails type, used to store the details of a selected flyover
export type FlyoverDetails = {
    id: number
    fromTime: number
    toTime: number
    cloudCover: number
    imageCover: number
}