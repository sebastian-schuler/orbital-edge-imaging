import { BBox, CRS_EPSG4326, S2L1CLayer } from '@sentinel-hub/sentinelhub-js';
import { FlyoverInterval } from '@sentinel-hub/sentinelhub-js/dist/src/layer/const';
import type { NextApiRequest, NextApiResponse } from 'next';

// Request data type
export type SearchFlyoversReqData = {
  layerId: string
  maxCloudCoverPercent: number
  dateFrom: number
  dateTo: number
  bounds: [number, number, number, number]
}

// Response data type
export type SearchFlyoversResData = {
  flyovers: FlyoverInterval[]
}

/**
 * SearchFlyovers API endpoint, returns a list of flyovers for the given parameters
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchFlyoversResData>
) {

  // Request body
  const { layerId, maxCloudCoverPercent, dateFrom, dateTo, bounds }: SearchFlyoversReqData = req.body;

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

  // Search for flyovers using the layer instance
  const flyovers = await layer.findFlyovers(bbox, fromTime, toTime).catch((err) => {
    console.error(err);
    res.status(500);
    return null;
  });

  if (!flyovers) return;

  res.status(200).json({
    flyovers: flyovers
  })
}
