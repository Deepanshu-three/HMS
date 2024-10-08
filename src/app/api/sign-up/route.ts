import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/user.model";
import bcrypt from 'bcryptjs'


export async function POST(request: Request){

    await dbConnect();

    try {
        
        const {name, email, password} = await request.json();

        const existingUserByEmail = await userModel.findOne({email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User alredy exist with this email"
                }, {status: 400})
            }
            else{

                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

                await existingUserByEmail.save();

            }
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
            })
            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,
            name,
            verifyCode
        )

        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: "Something went wrong"
            }, {status: 500})
        }

        return Response.json({
            success: true,
            message: "User registered successfully please verify your email"
        }, {status: 201})


    } catch (error) {
        console.log("Error regestering user",error)

        return Response.json({
            success: false,
            message: "Error regestering user"
        }, {status: 500})
    }   

}