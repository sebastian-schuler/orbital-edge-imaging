import { AppState } from '@/types/appStateTypes';
import { appState } from '@/util/State';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { FeatureGroup, GeoJSON, MapContainer, Rectangle, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useSnapshot } from 'valtio';

type InteractiveMapProps = {
    setMap: (value: L.Map) => void;
    featureGroupRef: React.RefObject<L.FeatureGroup>;
}

/**
 * Interactive map for selecting area and displaying GeoJSON data
 */
const InteractiveMap = ({ setMap, featureGroupRef }: InteractiveMapProps) => {

    // Make sure the drawn rectangle is still visible when user continues to the next step and then returns
    const [isOriginalBoundingVisible, setIsOriginalBoundingVisible] = React.useState<boolean>(false);

    // Valtio state
    const { bounds, geoJson, coords } = useSnapshot(appState) as AppState;

    return (
        <MapContainer center={coords} ref={setMap} zoom={12} style={{ height: '500px', width: '100%', zIndex: 1 }}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    position='topright'
                    draw={{
                        rectangle: true,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        polygon: false,
                    }}
                    edit={{
                        edit: false,
                        remove: false,
                    }}
                    onDrawStart={(e) => {
                        featureGroupRef.current?.clearLayers();
                        appState.bounds = null;
                        appState.geoJson = null;
                    }}
                    onCreated={(e) => {
                        const layer: L.Rectangle = e.layer;
                        appState.bounds = layer.getBounds();
                        appState.geoJson = null;
                        setIsOriginalBoundingVisible(true);
                    }}
                    onDeleted={(e) => {
                        appState.bounds = null;
                    }}
                />
            </FeatureGroup>
            {geoJson && <GeoJSON data={geoJson} />}
            {bounds && !geoJson && !isOriginalBoundingVisible && <Rectangle bounds={bounds} />}
        </MapContainer>
    )
}

export default InteractiveMap