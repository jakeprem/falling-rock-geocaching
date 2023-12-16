import QRCode from "react-qr-code";

import { caches } from "../csv-parser";
import type { Cache } from "../types";
import { useState } from "react";

export const CacheGrid = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {caches.map((cache) => (
        <CacheCard key={cache.Cache} cache={cache} />
      ))}
    </ul>
  );
};

const CacheCard = ({ cache }: { cache: Cache }) => {
  const [hint, setHint] = useState(false);

  return (
    <li
      key={cache.Cache}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        <QRCode
          className="mx-auto flex-shrink-0"
          value={cache.link}
          size={256}
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {cache.Cache}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Type:</dt>
          <dd className="text-sm text-gray-500">{cache.Type}</dd>
        </dl>
        {hint && (
          <>
            <dt className="sr-only">Hint:</dt>
            <dd className="text-sm text-gray-500">{cache.Hint}</dd>
          </>
        )}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 print:hidden">
          <div className="flex w-0 flex-1">
            <a
              href={cache.link}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transperent py-4 text-sm font-semibold text-gray-900"
            >
              Find it!
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <span
              onClick={() => setHint(true)}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transperent py-4 text-sm font-semibold text-gray-900"
            >
              Hint
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
