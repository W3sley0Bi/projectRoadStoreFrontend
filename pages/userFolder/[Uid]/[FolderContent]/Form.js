import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useTheme, NextUIProvider, Text, Textarea } from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import { Container, Row, Col, Spacer } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from "../../../../js/logoutFun";
import { inputCheckName, inputCheckPass } from "../../../../js/inputCheckers";
import { Document, Page, pdfjs } from 'react-pdf';
//import DrawingCanvas from '../../../../components/DrowingCanvas'




export default function Form() {

    //pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
  
    // function onDocumentLoadSuccess({ numPages }) {
    //   setNumPages(numPages);
    // }

  const { theme } = useTheme();
  return (
    <>
      <Layout>
      {/* <iframe src="/LK-Fillable.pdf" width="100%" height="800vh"></iframe> */}

     
<Container
          gap={3}
          style={{ color: theme.colors.primary.value, margin: "auto" }}
        >
          <Col align="center">

            <Input label="label" type="text" placeholder="field1"></Input>

            <Spacer y={1.2} />
            <Input label="label" type="text" placeholder="field1"></Input>

            <Spacer y={1.2} />

            <Input label="label" type="text" placeholder="field1"></Input>

            <Spacer y={1.2} />

            <Input label="label" type="text" placeholder="field1"></Input>

            <Spacer y={1.2} />

            <Input label="label" type="text" placeholder="field1"></Input>
            <Spacer y={1.2} />
            <Textarea
              label="label"
              placeholder="Enter your amazing ideas."
            />
          </Col>
        </Container>


      </Layout>
    </>
  );
}
 