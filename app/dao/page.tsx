"use client";

import { Worker } from "@react-pdf-viewer/core";

import { Viewer } from "@react-pdf-viewer/core";
const WhitepaperPage = () => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        style={{
          marginTop: "8em",
          background: "#000",
          width: "100%",
          height: "750px",
        }}
      >
        <Viewer
          fileUrl="/whitepaper.pdf"
        />
      </div>
    </Worker>
  );
};
export default WhitepaperPage;
