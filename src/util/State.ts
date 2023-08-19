import { AppState } from "@/types/appStateTypes";
import { proxy } from "valtio";

export const appState = proxy<AppState>({

    // Map states
    coords: [51.505, -0.09],
    bounds: null,
    pixelDimensions: null,
    geoJson: null,

    // Stepper states
    activeStep: 0,
    highestStepVisited: 0,

    // Form states
    layerId: null,
    maxCloudCover: 100,
    flyovers: [],
    imageFormat: 'PNG',
    mapImage: null,
    dateRange: [null, null],

    // UI
    selectedFlyover: null
});

