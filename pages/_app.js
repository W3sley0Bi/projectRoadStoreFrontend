// 1. Import `createTheme`
import { NextUIProvider, Text } from "@nextui-org/react"

import { Provider } from 'react-redux';
import { store } from '../stores/store';
import { theme } from "../js/theme"


// const store = configureStore({
//   reducer: {
//     token: tokenReducer,
//     uid: uidReducer,
//   }
// });



function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    
    <NextUIProvider theme={theme} >
        <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  );
}

export default MyApp;