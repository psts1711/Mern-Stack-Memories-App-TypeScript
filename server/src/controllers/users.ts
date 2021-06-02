import User from '../models/userModel';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export class Users{
    static async signin(req,res){
        // application/x-www-form-urlencoded method using
        const {email, password} = req.body;

        try {
            const existingUser:any = await User.findOne({email});
            if(!existingUser)
            {
               return res.status(404).json({message: "User doesn't exits."});
            }else
                {
                const isPasswordCorrect:any = await bcrypt.compare(password, existingUser.password);
                if(!isPasswordCorrect)
                {
                    return res.status(400).json({message: "Invalid Credentials."});
                }else
                    {
                    const token:any= jwt.sign({email:existingUser.email, id:existingUser._id}, 'test', {expiresIn: "1h"});
                    return res.status(200).json({result: existingUser, token});
                }
            }
        }catch (e) {
            return res.status(500).json({message: 'Something went wrong! Please try again later.'})
        }
    }

    static async signup(req, res){
        // application/x-www-form-urlencoded method using

        const {firstName, lastName, email, password, confirmPassword} = req.body;
        try{
            const existUser = await User.findOne({email});

            if(existUser) return res.status(400).json({message: "User already exist!"});

            if(password !== confirmPassword)
            {
                return res.status(400).json({message: "Password don't match"});
            }else{
                const hashPassword = await bcrypt.hash(password, 12);

                const result:any = await User.create({name: `${firstName} ${lastName}`, email, password: hashPassword});

                const token:any = jwt.sign({email:result.email, id:result._id}, 'test', {expiresIn: "1h"});

                return res.status(200).json({result, token});
            }

        }catch (e) {
            return res.status(500).json({
                message: 'Something went wrong! Please try again later.'
            })
        }
    }
}