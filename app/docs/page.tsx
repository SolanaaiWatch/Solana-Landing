"use client";
import React from "react";

import { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";

import { Viewer } from "@react-pdf-viewer/core";

const Docs = () => {
  return (
    <>
      <div className="pdfBox">
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
              // defaultScale={0.6}
              // defaultScale={SpecialZoomLevel.PageFit}
              fileUrl="/solanawatch.pdf"
            />
          </div>
        </Worker>
      </div>
      <div className="pdfBoxRes">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div
            style={{
              marginTop: "8em",
              background: "#000",
              //width: "440px",

              width: "100%",
              height: "100vh",
            }}
          >
            <Viewer
              // defaultScale={1}
              // defaultScale={0.5}
              // defaultScale={SpecialZoomLevel.PageFit}
              fileUrl="/solanawatch.pdf"
            />
          </div>
        </Worker>
      </div>
    </>
  );
};

export default Docs;
