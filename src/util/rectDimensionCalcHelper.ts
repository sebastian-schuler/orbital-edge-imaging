import L from 'leaflet';

export type RectangleDimensions = {
    width: number;
    height: number;
};

// ========================================================================
// FUNCTIONS
// ========================================================================

/**
 * Calculates the initial dimensions of the rectangle; choose width or height based on which is larger
 * @param dim - the dimensions of the rectangle
 * @param largerValue - the larger value is set to this value
 * @returns initial dimensions of the rectangle
 */
export const calcInitialRectangleDimensions = (dim: RectangleDimensions, largerValue: number): RectangleDimensions => {
    const largerDim = dim.width > dim.height ? 'width' : 'height';
    const newDim = calcScaledDimensions(dim, largerDim, largerValue)
    return newDim;
}

/**
 * Calculates the pixel dimensions of the given bounds
 * @param bounds - the bounds to calculate the dimensions of
 * @param map - the map to use for the projection
 * @returns pixel dimensions of the given bounds
 */
export const calcBoundsPixelDimensions = (bounds: L.LatLngBounds, map: L.Map): RectangleDimensions => {

    const { x: x1, y: y1 } = map.project(bounds.getNorthWest(), 2);
    const { x: x2, y: y2 } = map.project(bounds.getNorthEast(), 2);
    const { x: x3, y: y3 } = map.project(bounds.getSouthWest(), 2);

    const width = calculateDistance(x1, y1, x2, y2);
    const height = calculateDistance(x1, y1, x3, y3);

    return { width, height };
};

/**
 * Scales the dimensions of the rectangle based on the given adjusted dimension and new value
 * @param widthHeight - the width and height of the rectangle 
 * @param adjustedDimension - the dimension to adjust, either width or height
 * @param newValue - the new value of the adjusted dimension
 * @returns the new dimensions of the rectangle
 */
export const calcScaledDimensions = (
    { height, width }: RectangleDimensions,
    adjustedDimension: keyof RectangleDimensions,
    newValue: number
): RectangleDimensions => {

    if (adjustedDimension === 'width') {
        const newHeight = (newValue * height) / width;
        return { width: newValue, height: newHeight };
    } else if (adjustedDimension === 'height') {
        const newLength = (newValue * width) / height;
        return { width: newLength, height: newValue };
    }

    return { width, height };
}

// ========================================================================
// HELPER FUNCTIONS
// ========================================================================

/**
 * Calculates the distance between two points
 * @param x1 - x coordinate of the first point
 * @param y1 - y coordinate of the first point
 * @param x2 - x coordinate of the second point
 * @param y2 - y coordinate of the second point
 * @returns distance between x1,y1 and x2,y2
 */
const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}