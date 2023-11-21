import Coordinates from "coordinate-parser";

import type { Cache } from "./types";

export const createLink = (cache: Cache) => {
  const coords = new Coordinates(`${cache.latitude} ${cache.longitude}`);

  return `https://www.google.com/maps/search/?api=1&query=${coords.getLatitude()},${coords.getLongitude()}`;
};

export const createWalkingLink = (cache: Cache) => {
  const coords = new Coordinates(`${cache.latitude} ${cache.longitude}`);

  return `https://www.google.com/maps/dir/?api=1&destination=${coords.getLatitude()},${coords.getLongitude()}&travelmode=walking`;
};
