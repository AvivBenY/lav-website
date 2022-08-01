import { signOut } from "next-auth/react"
import Link from "next/link"

export default function logout(){

return(
    
<Link href='/index' ><button onClick={() => 
signOut()}>Sign out</button></Link>
// signOut({ callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL })}>Sign out</button></Link>
)
}