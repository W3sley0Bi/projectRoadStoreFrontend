// import { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/router";
import { Input, Radio } from "@nextui-org/react";
import { useTheme, NextUIProvider, Text, Textarea, Button } from "@nextui-org/react";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spacer } from "@nextui-org/react";
import DrawingCanvas from "./DrowingCanvas";

export default function FormInstallLK(props) {
const [formState, setFormState] = useState({
  field1: '',
  field2: '',
  filedDate1: '',
  filedDate2: '',
  filedDate3: '',
  filedDate4: '',
  radioValue: '',
  sign1: null,
  sign2: null,

});

const dataFromChild = async(props) => {

if(props.id == 1){
  setFormState(prevState => ({ ...prevState, sign1: props.dataImg }))
}else{
  setFormState(prevState => ({ ...prevState, sign2: props.dataImg }))
}

}



  const { theme } = useTheme();

  return (
    <>
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
            <Input label="M." type="text" placeholder="field1" name="field1" value={formState.field1} onChange={(e)=> setFormState(prevState => ({ ...prevState, field1: e.target.value }))}></Input>
            <Spacer y={.5} />
            <Text>INSTALLATEUR DEA - WORKY.</Text>
            <Spacer y={0.5} />
            <hr/>
            <Spacer y={0.5} />
          
            <Text>
              ET:
            </Text>
            <Spacer y={1} />
          

            <Input label="M." type="text" placeholder="field2" name="field2" value={formState.field2} onChange={(e)=> setFormState(prevState => ({ ...prevState, field2: e.target.value }))} ></Input>
            <Spacer y={1} />
            <Text>RESPONSABLE SITE MATEXPERT_BMW/MINI_VILLE_LA_GRAND AC + GAZ</Text>
            <Spacer y={0.5} />
    <hr/>
    <Spacer y={0.5} />
            <Text>
            CONCERNANT LES TRAVAUX EXECUTES PAR L'ENTREPRISE CITEE CI-DESSUS EN DATE DU
            </Text>
            <Spacer y={1} />
            <Input type="date" placeholder="DD-MM-YYYY" name="filedDate1" value={formState.filedDate1} onChange={(e)=> setFormState(prevState => ({ ...prevState, filedDate1: e.target.value }))}></Input>
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
          <Spacer y={0.5} />

<Row> <input value="radio1" type="radio"  checked={formState.radioValue === 'radio1'}onChange={(e)=> setFormState(prevState => ({ ...prevState, radioValue: e.target.value }))}/><Spacer y={0.2} /><Text>LA RECEPTION EST PRONONCEE SANS RESERVE AVEC EFFET A LA DATE DU</Text><Spacer y={0.2} /><Input type="date" placeholder="DD-MM-YYYY" name="filedDate2" value={formState.filedDate2} onChange={(e)=> setFormState(prevState => ({ ...prevState, filedDate2: e.target.value }))} ></Input></Row>
      <Spacer y={0.2} />
      <Row>    <input value="radio2" type="radio" checked={formState.radioValue === 'radio2'} onChange={(e)=> setFormState(prevState => ({ ...prevState, radioValue: e.target.value }))}/><Spacer y={0.2} /><Text>LA RECEPTION EST PRONONCEE AVEC RESERVES MENTIONNEES DANS L'ETAT DES RESERVES FIGURANT AU VERSO AVEC EFFET A LA DATE DU</Text><Spacer y={0.2} /><Input type="date" placeholder="DD-MM-YYYY" name="filedDate3" value={formState.filedDate3} onChange={(e)=> setFormState(prevState => ({ ...prevState, filedDate3: e.target.value }))}></Input></Row> 
      <Spacer y={0.2} />
      <Row>    <input value="radio3"  type="radio" checked={formState.radioValue === 'radio3'} onChange={(e)=> setFormState(prevState => ({ ...prevState, radioValue: e.target.value }))}/><Spacer y={0.2} /><Text>LA RECEPTION EST REFUSEE OU DIFFEREE (RAYER LA MENTION INUTILE) POUR LES MOTIFS SUIVANTS :</Text></Row> 

          <Spacer y={0.5} />
          <Text>LES GARANTIES DECOULANT DES ARTICLES 1792, 1792-2 ET 1792-3 DU CODE CIVIL COMMENCENT A COURIR A COMPTER DE LA SIGNATURE DU PRESENT PROCES-VERBAL, AVEC OU SANS RESERVE.
            LA SIGNATURE DU PROCES-VERBAL ET LE REGLEMENT DES TRAVAUX AUTORISENT LE MAITRE D'OUVRAGE (OU CLIENT) SOUSSIGNE A PRENDRE POSSESSION DE L'OUVRAGE.</Text>
            <Spacer y={1} />
        <Text>FAIT A VILLE LA GRAND, LE </Text> <Spacer y={0.2} /> <Input  type="date" placeholder="DD-MM-YYYY" name="filedDate4" value={formState.filedDate4} onChange={(e)=> setFormState(prevState => ({ ...prevState, filedDate4: e.target.value }))}></Input> <Spacer y={0.2} /> <Text>EN 2 EXEMPLAIRES (1 POUR CHACUNE DES PARTIES) SIGNATURE DU REPRESENTANT DE L'ENTREPRISE SIGNATURE DU MAITRE D'OUVRAGE (OU CLIENT)</Text>
          <Spacer y={2} />
          
          
          <Text style={{color: "red"}}>CACHET DES ENTREPRISES</Text>
          <Spacer y={.5} />
          <DrawingCanvas id={1} dataBack={dataFromChild} >LU ET APPROUVE, LE CLIENT</DrawingCanvas>
          <Spacer y={1} />
          <DrawingCanvas id={2} dataBack={dataFromChild}>LU ET APPROUVE, L'INSTALLATEUR</DrawingCanvas> 

        </Container>
        {props.getFromData(formState)}

    </>
  );
}
