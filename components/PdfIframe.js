import React, { useEffect, useRef } from 'react';
import { PDFJS } from 'pdfjs-dist';

function PdfIframe(props) {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Get the iframe and its content window
    const iframe = iframeRef.current;
    const win = iframe.contentWindow;

    // Load the PDF.js library
    PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

    // Load the PDF
    PDFJS.getDocument(props.src).then((pdf) => {
      // Get the first page of the PDF
      pdf.getPage(1).then((page) => {
        // Set up the canvas for rendering
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = page.view[2];
        canvas.height = page.view[3];

        // Render the page onto the canvas
        page.render({canvasContext: context, viewport: page.view});

        // Add the canvas to the iframe's document
        win.document.body.appendChild(canvas);
      });
    });
  }, [props.src]);

  return <iframe ref={iframeRef} src={props.src} />;
}

export default PdfIframe;
