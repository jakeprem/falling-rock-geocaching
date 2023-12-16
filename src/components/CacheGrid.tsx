import QRCode from "react-qr-code";

import { Document, Page, Text, View, usePDF } from "@react-pdf/renderer";
import {
  Svg,
  Path,
  Rect,
  Circle,
  Ellipse,
  Line,
  // Text,
  Tspan,
  G,
  Stop,
  Defs,
  ClipPath,
  LinearGradient,
  RadialGradient,
} from "@react-pdf/renderer";

import { caches } from "../csv-parser";
import type { Cache } from "../types";
import { createElement, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "svg-parser";

const PDFQrCode = (props) => {
  const qrNode = createElement(QRCode, props);
  const markup = renderToStaticMarkup(qrNode);
  const nodes = parse(markup);
  return handleNode(nodes);
};

const svgMappings = {
  svg: Svg,
  path: Path,
  rect: Rect,
  circle: Circle,
  ellipse: Ellipse,
  line: Line,
  text: Text,
  tspan: Tspan,
  g: G,
  stop: Stop,
  defs: Defs,
  clipPath: ClipPath,
  linearGradient: LinearGradient,
  radialGradient: RadialGradient,
};

const handleNode = (node: any) => {
  const children = node.children.map(handleNode);

  if (node.type === "root") {
    return children[0];
  } else {
    const tag = svgMappings[node.tagName] || `default: ${node.tagName}`;

    return createElement(tag, node.properties, children);
  }
};

const CacheDocument = ({ caches }: { caches: Cache[] }) => {
  return (
    <Document>
      <Page size="A4" style={{ paddingHorizontal: 24, paddingVertical: 40 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          {caches.map((cache) => {
            return (
              <View
                key={cache.Cache}
                wrap={false}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                  maxWidth: "25%",
                  // maxHeight: "25%",
                  marginHorizontal: 64,
                  marginBottom: 24,
                }}
              >
                <PDFQrCode key={cache.Cache} value={cache.link} size={200} />
                <Text style={{ fontSize: 12, marginTop: 5 }}>
                  {cache.Cache}
                </Text>
              </View>
            );
          })}
        </View>
        <View fixed style={{ fontSize: 12, alignItems: "flex-end" }}>
          <Text>Camp Falling Rock | Geocaching</Text>
        </View>
      </Page>
    </Document>
  );
};

export const CacheGrid = () => {
  const [instance, updateInstance] = usePDF({
    document: <CacheDocument caches={caches} />,
  });

  if (instance.loading) return <span>Loading...</span>;
  if (instance.error) return <span>{instance.error.message}</span>;
  return (
    <>
      <a href={instance.url} target="_blank">
        Print PDF of Caches
      </a>
      <WebCacheGrid />
    </>
  );
};

const WebCacheGrid = () => {
  let pdfCaches = caches.map((cache) => {
    return <PDFQrCode value={cache.link} size={256} />;
  });
  console.log("pdfCaches", pdfCaches);

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
