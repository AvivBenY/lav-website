import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import styles from '../styles/SignOut.module.css'
export default function LoginBtn() {
    const { data: session, status: loading } = useSession();
    console.log(session, loading);
    return (
        <div className={styles.mainDiv}>            
                <a className={styles.googleBtn} onClick={() => signIn('google')}>
                    <Image src="/google-login.png" alt="google-signin" width={250} height={60}/></a>
                <a className={styles.googleBtn} onClick={() => signIn('facebook')}>
                    <Image src="/facebook-login.png" alt="facebook-signin" width={250} height={60}/></a>
        </div>
    )
}