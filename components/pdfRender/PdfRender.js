import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// Create Document Component
export default function PdfRender(prop){
    return(
  <Document height="100%"  file={prop.url}>
    <Page size="A4" />

  </Document>
)
    }