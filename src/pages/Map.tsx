import { Ref, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { usePocketBase } from "../hooks";
import type PocketBase from "pocketbase";

import type { Cache } from "../types";

const loadCaches = async (pb: PocketBase) => {
  return await pb
    .collection("collections")
    .getFirstListItem('short_name="cfr"', { expand: "caches(collection)" });
};

const calculateCenter = (caches: Cache[]) => {
  const cacheLength = caches.length;
  const latAvg =
    caches.reduce((acc, cache) => acc + Number(cache.latitude), 0) /
    cacheLength;
  const longAvg =
    caches.reduce((acc, cache) => acc + Number(cache.longitude), 0) /
    cacheLength;

  return [latAvg, longAvg];
};

function DisplayPosition({
  map,
  caches,
}: {
  map: typeof MapContainer;
  caches: Cache[];
}) {
  useEffect(() => {
    const center = calculateCenter(caches);

    map.setView(center, 15);
  }, [map, caches]);

  return <></>;
}

export function MapPage() {
  const pb = usePocketBase();

  const [map, setMap] = useState<Ref<Map> | null>(null);
  const [caches, setCaches] = useState<Cache[]>([]);

  useEffect(() => {
    loadCaches(pb).then((collection) => {
      const loadedCaches = collection?.expand
        ? collection.expand["caches(collection)"]
        : [];

      setCaches(loadedCaches);
    });
  });

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="mx-auto"
        center={[40, -84]}
        zoom={15}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {caches.map((cache: Cache) => (
          <Marker
            key={cache.id}
            position={[Number(cache.latitude), Number(cache.longitude)]}
          >
            <Tooltip>{cache.name}</Tooltip>
            <Popup>{cache.hint}</Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [caches]
  );

  return (
    <div>
      {map && caches.length ? (
        <DisplayPosition map={map} caches={caches} />
      ) : null}
      {displayMap}
    </div>
  );
}
