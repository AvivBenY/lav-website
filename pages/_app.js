import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'
import BottomLinks from '../components/BottomLinks'
import { SessionProvider } from "next-auth/react"
import ContextProvider from '../Context/Context'
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <div className={styles.container}>
      <SessionProvider session={session}>
        <ContextProvider>
          <Head>
            <link rel="shortcut icon" href="/logo.png" />
          </Head>
          <Header />
          <Component {...pageProps} />
          <BottomLinks />
        </ContextProvider>
      </SessionProvider>
    </div>
  )
}

export default MyApp