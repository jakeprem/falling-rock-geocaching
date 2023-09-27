// import QRCode from "react-qr-code";

// import { fields, caches } from "../csv-parser";
// import { Cache } from "../types";

// export const CacheTable = () => {
//   const showLink = false;

//   return (
//     <table style={{ margin: "10vh 2vw" }}>
//       <thead>
//         <tr>
//           {fields?.map(
//             (field, index) => field !== "link" && <th key={index}>{field}</th>
//           )}
//           <th>QR Code</th>
//           {showLink && <th>Link</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {caches.map((row: Cache, index) => (
//           <tr key={index}>
//             {fields?.map(
//               (field, index) =>
//                 field !== "link" && <td key={index}>{row[field]}</td>
//             )}
//             <td>
//               <QRCode value={row.link} size={64} />
//             </td>
//             {showLink && (
//               <td key={index}>
//                 <a href={row.link} target="_blank" rel="noreferrer">
//                   {row.link}
//                 </a>
//               </td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
