import Header from '../Components/Header'
import styles from '../styles/Home.module.css'
import '../styles/globals.css'
import BottomLinks from '../components/BottomLinks'
import { SessionProvider } from "next-auth/react"
import ContextProvider from '../Context/Context'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <div className={styles.container}>
      <SessionProvider session={session}>
        <ContextProvider>
          <Header />
          <Component {...pageProps} />
          <BottomLinks />
        </ContextProvider>
      </SessionProvider>
    </div>
  )
}

export default MyApp