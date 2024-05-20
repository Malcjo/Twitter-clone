import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/db"
import { signIn } from "next-auth/react"
import { getToken } from "next-auth/jwt"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',//json web token
    },
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.

            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session
        },
        async signIn({ user, account, profile, email, credentials }) {

            return true;  // Return true to allow sign in
        },
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
}
export default NextAuth(authOptions);

