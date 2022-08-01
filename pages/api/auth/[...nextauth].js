import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import connectDB from '../../../middleware/mongodb'
import User from "../../../models/user"

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
    ,
    async signIn(user) {
      await connectDB();
      try {
        const res = await User.findOne({ email: user.user.email });
        if (res) {
          
          console.log("EMAIL APPROVED");

          return true
        } else {
          console.log("NOT A VALID EMAIL");
          return false
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }

})



