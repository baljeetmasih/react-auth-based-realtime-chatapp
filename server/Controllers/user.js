import mongoose from "mongoose";
import user from "../Model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const privateKey = process.env.PRIVATE_KEY

/**
 * Signin request handler
 * @param {*} req 
 * @param {*} res 
 */
export const signin = async (req , res) => {
    const { email, password } = req.body
    try {
        
      const existingEmail = await user.findOne({email})  

      if(!existingEmail) return res.status(404).send({message : "Your email is not register our system..."})
      
      const isPasswordCorrect = await bcrypt.compare(password,existingEmail.password)

      if(!isPasswordCorrect) return res.status(403).send({message : "Invalid Credentials."})

      const token = await jwt.sign({email : existingEmail.email, id : existingEmail._id},privateKey,{expiresIn : "1hr"})

      res.status(200).send(
        {
            message : "Your account login successfully.",
            results : existingEmail,
            token : token
        }
    )

    } catch (error) {
        res.status(403).send({message : error.message})
    }
}


/**
 * Signup request handler
 * @param {*} req 
 * @param {*} res 
 */
export const signup = async (req , res) => {

    const { firstname , lastname, email , password, username, profile } = req.body

    try {
        
      const existingEmail = await user.findOne({email})  

      if(existingEmail) return res.status(404).send({message : "Email already in used."})


      const hashPassword = await bcrypt.hash(password, 12)


      const userInfo = await user.create({
        email : email,
        password : hashPassword,
        userName : username,
        lastName : lastname,
        firstName : firstname,
        profile   : profile
      })

      const token = jwt.sign( { email: userInfo.email, id: userInfo._id }, privateKey, { expiresIn: "1h" } );

      res.status(200).send(
        {
            message : "Your account successfully created.",
            results : userInfo,
            token : token
        }
        )



    } catch (error) {
        res.status(403).send({message : error.message+' jjjjj'})
    }
}