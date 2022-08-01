import { signOut } from "next-auth/react"
import styles from '../styles/SignOut.module.css'
import { useSession } from "next-auth/react"

export default function Logout(){

    const { data: session } = useSession();
    
return(
    <div>
        <p>{session.user.name}</p>
        <button className={styles.signOutBtn} onClick={() => 
        signOut({ callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL })}>Sign out</button>
    </div>
)}