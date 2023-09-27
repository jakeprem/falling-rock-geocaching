import Papa from "papaparse";
import Coordinates from "coordinate-parser";
import csvData from "./csv-data";
import { Cache } from "./types";

const results = Papa.parse(csvData, { header: true });

const data: Cache[] = results.data as Cache[];
const parsedFields: string[] = results.meta.fields as string[];

const createLink = (coords: Coordinates) =>
  `https://www.google.com/maps/search/?api=1&query=${coords.getLatitude()},${coords.getLongitude()}`;

const createWalkingLink = (coords: Coordinates) =>
  `https://www.google.com/maps/dir/?api=1&destination=${coords.getLatitude()},${coords.getLongitude()}&travelmode=walking`;

const formattedData = data.map((cache: Cache) => {
  const parsedCoords = new Coordinates(`${cache.Latitude} ${cache.Longitude}`);

  return {
    ...cache,
    Latitude: parsedCoords.getLatitude(),
    Longitude: parsedCoords.getLongitude(),
    link: createLink(parsedCoords),
    walkingLink: createWalkingLink(parsedCoords),
  };
});

const allFields = [...parsedFields, "link"];

export const fields = allFields;
export const caches = formattedData;
