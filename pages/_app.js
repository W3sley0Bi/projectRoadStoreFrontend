// 1. Import `createTheme`
import { NextUIProvider, Text } from "@nextui-org/react";
import Head from "next/head";

import { Provider } from "react-redux";
import { store } from "../stores/store";
import { lightTheme, darkTheme } from "../js/theme";
import "../styles/style.css";
import "../styles/loader.css";
import { CanvasProvider } from "../components/canvas/CanvasContext";
import { ThemeProvider as NextThemesProvider } from 'next-themes';


import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [topPadding, setTopPadding] = useState(0);

  useEffect(() => {
    console.log(window.safeAreaInsets);

    const topInset = window?.safeAreaInsets?.top || 0;
    setTopPadding(topInset);
  }, []);

  return (
    <div style={{ paddingTop: `${topPadding}px` }}>
      <NextThemesProvider
    defaultTheme="system"
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
      <NextUIProvider >
        <Provider store={store}>
          <CanvasProvider>
            <Head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no"
              />
            </Head>
            <Component {...pageProps} />
          </CanvasProvider>
        </Provider>
      </NextUIProvider>
      </NextThemesProvider>
    </div>
  );
}

export default MyApp;
