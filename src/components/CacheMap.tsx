import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import type { Cache } from "../types";
import { caches } from "../csv-parser";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

export function CacheMap() {
  const center = useMemo<LatLngTuple>(() => {
    const cacheLength = caches.length;
    const latAvg =
      caches.reduce((acc, cache) => acc + cache.Latitude, 0) / cacheLength;
    const longAvg =
      caches.reduce((acc, cache) => acc + cache.Longitude, 0) / cacheLength;

    return [latAvg, longAvg];
  }, []);

  return (
    <MapContainer
      className="mx-auto"
      center={center}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {caches.map((cache: Cache) => (
        <Marker key={cache.Cache} position={[cache.Latitude, cache.Longitude]}>
          <Tooltip>{cache.Cache}</Tooltip>
          <Popup>{cache.Hint}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
