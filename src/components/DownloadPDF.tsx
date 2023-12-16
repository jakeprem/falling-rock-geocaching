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
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse } from "svg-parser";
import ButtonLink from "./Button";

const svgMappings: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} = {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PDFQrCode = (props: any) => {
  const qrNode = createElement(QRCode, props);
  const markup = renderToStaticMarkup(qrNode);
  const nodes = parse(markup);
  return handleNode(nodes);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const DownloadPDF = () => {
  const [instance] = usePDF({
    document: <CacheDocument caches={caches} />,
  });

  if (instance.loading) return <span>Loading...</span>;
  if (instance.error) return <span>{instance.error}</span>;
  return (
    <div className="my-4">
      <ButtonLink href={instance.url || ""} target="_blank">
        Print PDF of Caches
      </ButtonLink>
    </div>
  );
};
