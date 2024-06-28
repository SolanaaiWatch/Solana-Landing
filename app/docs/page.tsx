"use client";
import React from "react";

import { useState } from "react";
import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

//import "core-js/full/promise/with-resolvers.js";

// // Polyfill for environments where window is not available (e.g., server-side rendering)
// if (typeof Promise.withResolvers === "undefined") {
//   if (typeof window !== "undefined") {
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     window.Promise.withResolvers = function () {
//       let resolve, reject;
//       const promise = new Promise((res, rej) => {
//         resolve = res;
//         reject = rej;
//       });
//       return { promise, resolve, reject };
//     };
//   } else {
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     global.Promise.withResolvers = function () {
//       let resolve, reject;
//       const promise = new Promise((res, rej) => {
//         resolve = res;
//         reject = rej;
//       });
//       return { promise, resolve, reject };
//     };
//   }
// }

// if (typeof Promise.withResolvers === "undefined") {
//   if (window)
//     // @ts-expect-error This does not exist outside of polyfill which this is doing
//     window.Promise.withResolvers = function () {
//       let resolve, reject;
//       const promise = new Promise((res, rej) => {
//         resolve = res;
//         reject = rej;
//       });
//       return { promise, resolve, reject };
//     };
// }

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Docs = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   //"pdfjs-dist/build/pdf.js",
  //   "pdfjs-dist/build/pdf.worker.min.mjs",
  //   //"pdfjs-dist/legacy/build/pdf.js",
  //   //"pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  //   import.meta.url
  // ).toString();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <>
      <div className="pdfBox">
        {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
        {/* <Document className="pdfDoc" file="/solanawatch.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document> */}
        <Document file="/solanawatch.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  className="pdfDoc"
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={0.6}
                />
              );
            })}
        </Document>
      </div>
      <div className="pdfBoxRes">
        <Document file="/solanawatch.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  // scale={1}
                  width={440}
                  height={600}
                />
              );
            })}
        </Document>
      </div>
    </>
  );
};

export default Docs;
