import type PocketBase from "pocketbase";

import { usePocketBase } from "../hooks";

import { caches as parsedCaches } from "../csv-parser";

const uploadCaches = async (pb: PocketBase) => {
  const cfrCollection = await pb.collection("collections").create({
    name: "CFR Geocaching",
    description: "Caches placed all around Camp Falling Rock",
    visible: true,
  });

  const promises = parsedCaches.map(async (cache) => {
    return pb.collection("caches").create(
      {
        name: cache.Cache,
        hint: cache.Hint,
        description: "",
        location: cache.Location,
        latitude: cache.Latitude.toString(),
        longitude: cache.Longitude.toString(),
        collection: [cfrCollection.id],
      },
      { requestKey: cache.Cache }
    );
  });

  await Promise.all(promises).then((results) => {
    console.log(results);
    alert("Upload successful!");
  });
};

export const AdminPage = () => {
  const pb = usePocketBase();

  return (
    <div className="m-10">
      <h1 className="m-4">Admin</h1>
      <button
        onClick={() => uploadCaches(pb)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload CFR Caches
      </button>
    </div>
  );
};
