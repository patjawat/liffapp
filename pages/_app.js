import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID

  useEffect(async () => {
    // const liff = (await import('@line/liff')).default
    // try {
    //   await liff.init({ liffId });
    // } catch (error) {
    //   console.error('liff init error', error.message)
    // }
    // if (!liff.isLoggedIn()) {
    //   liff.login();
    // }
  })


  return <Component {...pageProps} />
}

export default MyApp
