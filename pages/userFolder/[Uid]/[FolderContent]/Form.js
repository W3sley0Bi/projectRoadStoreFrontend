import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Input,Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useTheme, NextUIProvider, Text, Textarea } from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import { Container, Row, Col, Spacer } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFun } from "../../../../js/logoutFun";
import { inputCheckName, inputCheckPass } from "../../../../js/inputCheckers";
import { Document, Page, pdfjs } from "react-pdf";
import DrawingCanvas from "../../../../components/DrowingCanvas";

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

        <Container style={{color: theme.colors.primary.value, margin: 'auto',}} gap={3}>
        <Text>
              Procès-verbal de réception de travaux Dossier :
              <br/>
              MATEXPERT_BMW/MINI_VILLE_LA_GRAND AC + GAZ Etabli en présence 
              <Spacer y={1} />
                Etabli en présence :
            </Text>
            <Spacer y={1} />
    
            <Spacer y={1} />
            <Input label="M." type="text" placeholder="field1"></Input>
            <Spacer y={.5} />
            <Text>INSTALLATEUR DEA - WORKY.</Text>
            <Spacer y={0.5} />
            <hr/>
            <Spacer y={0.5} />
          
            <Text>
              ET:
            </Text>
            <Spacer y={1} />
          

            <Input label="M." type="text" placeholder="field1"></Input>
            <Spacer y={1} />
            <Text>RESPONSABLE SITE MATEXPERT_BMW/MINI_VILLE_LA_GRAND AC + GAZ</Text>
            <Spacer y={0.5} />
    <hr/>
    <Spacer y={0.5} />
            <Text>
            CONCERNANT LES TRAVAUX EXECUTES PAR L'ENTREPRISE CITEE CI-DESSUS EN DATE DU
            </Text>
            <Spacer y={1} />
            <Input type="date" placeholder="field1"></Input>
            <Spacer y={1} />
          <details style={{background: "none", color: "#fff"}}>
            <summary> 🔽 TRAVAUX EFFECTUES : SELON CONFIRMATION DE COMMANDE CC4696</summary>
            <ol>
                <li>INSTALLATION D’UN SYSTÈME D’ASPIRATION DES GAZ D’ÉCHAPPEMENT</li>
                <li>INSTALLATION DE RÉSEAU D’AIR COMPRIMÉ + RACCORD AU COMPRESSEUR EXISTANT</li>
                <li>ESSAIS ET FORMATION DES COMPAGNONS.</li>
                <li>RÉCEPTION DES TRAVAUX ET SIGNATURE DU PV EN COMPAGNIE DU RESPONSABLE DE SITE</li>
            </ol>
          </details>
          
          <Spacer y={0.5} />
          <hr/>
          <Spacer y={0.5} />
          <Text>LE MAITRE D'OUVRAGE (OU CLIENT) DECLARE QUE :</Text>
          <Spacer y={0.2} />
          <Checkbox.Group
      color="secondary"
      defaultValue={["check1","check2","check3"]}
    >
      <Checkbox value="check1">LA RECEPTION EST PRONONCEE SANS RESERVE AVEC EFFET A LA DATE DU <Input type="date" placeholder="field1"></Input></Checkbox>
      <Checkbox value="check2">LA RECEPTION EST PRONONCEE AVEC RESERVES MENTIONNEES DANS L'ETAT DES RESERVES FIGURANT AU VERSO AVEC EFFET A LA DATE DU<Input type="date" placeholder="field1"></Input></Checkbox>
      
      <Checkbox value="check3">LA RECEPTION EST REFUSEE OU DIFFEREE (RAYER LA MENTION INUTILE) POUR LES MOTIFS SUIVANTS :</Checkbox>
    </Checkbox.Group>
    <Spacer y={0.5} />
    <Text>LES GARANTIES DECOULANT DES ARTICLES 1792, 1792-2 ET 1792-3 DU CODE CIVIL COMMENCENT A COURIR A COMPTER DE LA SIGNATURE DU PRESENT PROCES-VERBAL, AVEC OU SANS RESERVE.
LA SIGNATURE DU PROCES-VERBAL ET LE REGLEMENT DES TRAVAUX AUTORISENT LE MAITRE D'OUVRAGE (OU CLIENT) SOUSSIGNE A PRENDRE POSSESSION DE L'OUVRAGE.</Text>
<Spacer y={1} />
<Text>FAIT A VILLE LA GRAND, LE  <Spacer y={0.2} /> <Input  type="date"></Input> <Spacer y={0.2} />EN 2 EXEMPLAIRES (1 POUR CHACUNE DES PARTIES) SIGNATURE DU REPRESENTANT DE L'ENTREPRISE SIGNATURE DU MAITRE D'OUVRAGE (OU CLIENT)</Text>
          <Spacer y={2} />

          <Textarea label="Note" placeholder="Add Notes" />
          <Spacer y={2} />
          <Text style={{color: "red"}}>CACHET DES ENTREPRISES</Text>
          <Spacer y={.5} />
          <DrawingCanvas>LU ET APPROUVE, LE CLIENT</DrawingCanvas>
          <Spacer y={1} />
          <DrawingCanvas>LU ET APPROUVE, L'INSTALLATEUR</DrawingCanvas>

        </Container>
      </Layout>
    </>
  );
}
