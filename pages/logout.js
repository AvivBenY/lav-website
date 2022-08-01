import { signOut } from "next-auth/react"
import Link from "next/link"

export default function logout(){

return(
    
<Link href='/index' ><button onClick={() => 
signOut()}>Sign out</button></Link>
)
}