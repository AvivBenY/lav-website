import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session, status: loading } = useSession();
    console.log(session, loading);
    if (session) {
        if (session.user.email !== "benyedidia123@gmail.com") {
            {
                alert("invalid user sign-in");
                signOut();
            }
        } else {
            return (
                <>
                    {console.log("session", session)}
                    Signed in as {session.user.email} <br />
                    <button onClick={() => { signOut() }}>Sign out</button>
                </>
            )
        }
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

