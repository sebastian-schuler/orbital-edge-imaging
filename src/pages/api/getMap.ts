import { sentinelImageFormats } from '@/data/SentinelHubData';
import { ApiType, BBox, CRS_EPSG4326, MimeTypes, S2L1CLayer } from '@sentinel-hub/sentinelhub-js';
import { MimeType } from '@sentinel-hub/sentinelhub-js/dist/src/layer/const';
import type { NextApiRequest, NextApiResponse } from 'next';

// Request data type
export type GetMapReqData = {
    layerId: string
    maxCloudCoverPercent: number
    dateFrom: number
    dateTo: number
    bounds: [number, number, number, number]
    width: number
    height: number
    imageFormat: string
}

// Response data type
export type GetMapResData = Blob | string;

/**
 * GetMap API endpoint, returns a map image blob for the given parameters
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetMapResData>
) {

    // Request body
    const { layerId, maxCloudCoverPercent, dateFrom, dateTo, bounds, width, height, imageFormat }: GetMapReqData = req.body;

    // Validate image format
    if (sentinelImageFormats.includes(imageFormat) === false) {
        res.status(400).send(`Invalid image format`);
        return;
    }

    // Validate width and height
    if (width < 1 || height < 1 || width > 1000 || height > 1000) {
        res.status(400).send(`Invalid width or height (min: 1, max: 1000)`);
        return;
    }

    // Create layer instance
    const layer = new S2L1CLayer({
        instanceId: process.env.SENTINEL_INSTANCE_ID,
        layerId: layerId,
        maxCloudCoverPercent: maxCloudCoverPercent,
    });

    // Create bbox and date objects
    const bbox = new BBox(CRS_EPSG4326, bounds[0], bounds[1], bounds[2], bounds[3]);
    const fromTime = new Date(dateFrom);
    const toTime = new Date(dateTo);

    // Set image mime type
    let imageMimeType: MimeType | "JPEG_OR_PNG" = MimeTypes.JPEG;
    if (imageFormat === 'PNG') imageMimeType = MimeTypes.PNG;
    if (imageFormat === 'JPEG') imageMimeType = MimeTypes.JPEG;
    if (imageFormat === 'TIFF') imageMimeType = MimeTypes.TIFF;

    // Create getMap parameters
    const getMapParams = {
        bbox: bbox,
        fromTime: fromTime,
        toTime: toTime,
        width: width,
        height: height,
        format: imageMimeType,
    };

    // Get map image blob using the layer instance
    const imageBlob = await layer.getMap(getMapParams, ApiType.WMS).catch((err) => {
        console.error(err);
        res.status(500);
        return null;
    });

    if (!imageBlob) return;

    res.setHeader('Content-Type', `image/${imageFormat}`);
    res.status(200).send(imageBlob)
}
