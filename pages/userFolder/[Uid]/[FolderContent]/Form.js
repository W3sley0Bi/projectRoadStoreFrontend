import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Input,Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useTheme, NextUIProvider, Text, Textarea , Spacer, Container} from "@nextui-org/react";
import Layout from "../../../../components/Layout";
import FormInstallLK from "../../../../components/FormInstallLK"

export default function Form() {
    const { theme } = useTheme();

  return (
    <>
      <Layout>
    <FormInstallLK >
    </FormInstallLK>
    <Spacer y={5} />
    <Container style={{color: theme.colors.primary.value, margin: 'auto',}} gap={3}>
    <Textarea width ="100%" label="Notes" placeholder="Add Notes" />
          </Container>
    </Layout>
    </>
  );
}
