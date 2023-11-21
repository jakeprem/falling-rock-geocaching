import QRCode from "react-qr-code";
import type PocketBase from "pocketbase";

// import { caches } from "../csv-parser";
import type { Cache } from "../types";
import { useEffect, useMemo, useState } from "react";
import { usePocketBase } from "../hooks";

import { createWalkingLink } from "../utils";

const loadCaches = async (pb: PocketBase) => {
  return await pb.collection("caches").getFullList<Cache>();
};

export const CacheGrid = () => {
  const pb = usePocketBase();
  const [caches, setCaches] = useState<Cache[]>([]);

  useEffect(() => {
    loadCaches(pb).then((caches) => {
      console.log(caches);
      setCaches(caches);
    });
  }, [pb]);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {caches.map((cache) => (
        <CacheCard key={cache.id} cache={cache} />
      ))}
    </ul>
  );
};

const CacheCard = ({ cache }: { cache: Cache }) => {
  const [hint, setHint] = useState(false);

  const walkingLink = useMemo(() => createWalkingLink(cache), [cache]);

  return (
    <li
      key={cache.id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        <QRCode
          className="mx-auto flex-shrink-0"
          value={walkingLink}
          size={256}
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{cache.name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Type:</dt>
          <dd className="text-sm text-gray-500">{"Cache"}</dd>
        </dl>
        {hint && (
          <>
            <dt className="sr-only">Hint:</dt>
            <dd
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: cache.hint }}
            />
          </>
        )}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 print:hidden">
          <div className="flex w-0 flex-1">
            <a
              href={walkingLink}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transperent py-4 text-sm font-semibold text-gray-900"
            >
              Find it!
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              onClick={() => setHint(!hint)}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transperent py-4 text-sm font-semibold text-gray-900"
            >
              Hint
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
