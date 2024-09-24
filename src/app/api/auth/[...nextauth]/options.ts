import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";

export const authOptions: NextAuthOptions = {

    providers: [

        CredentialsProvider({

            id: "credentials",
            name: "credentials",
            
            credentials: {
                
                email: { label: "Email", type: "text ", placeholder: "email" },
                password: { label: "Password", type: "password" },
                
            },

            async authorize(credentials: any): Promise<any>{
                await dbConnect()

                try {
                    
                    const user = await userModel.findOne({
                        $or: [
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error("Incorrect password")
                    }

                } catch (error: any) {
                    throw new Error(error)
                }
            
            }
        })
    
    ],
    callbacks:{
        async session({ session, token }) {
            if(token){
                session.user._id = token._id,
                session.user.isVerified = token.isVerified,
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {
         
            if(user){
                token._id = user._id?.toString(),
                token.isVerified = user.isVerified,
                token.role = user.role
            }

            return token
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,


}