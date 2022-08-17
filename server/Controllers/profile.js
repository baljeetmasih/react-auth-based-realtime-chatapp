import mongoose from "mongoose";
import Pusher from "pusher";
import user from "../Model/user.js"
import channels from "../Model/channel.js";
import chats from "../Model/chat.js";


const app_id = "1065430"
const key = "b13594dd7281243e4dd4"
const secret = "f9680be47f8f633bea73"
const cluster = "ap2"

const pusher = new Pusher({
    appId     : app_id,
    key       : key,
    secret    : secret,
    cluster   : cluster,
  });



import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const getAllProifle = async (req, res) => {
    const {id} = req.params
    try {

    const data = await channels
    .find({form : {$regex : `${id}`, to : {$regex : `${id}`}}},'from to channel status _id')
    
    if(data.length === 0){
        res.status(200).send([])
        return
    }
    let pairs = []

    for await (let d of data){
        let userid = ''
        if(d.to != id)
            userid = d.to
        if(d.from != id)
            userid = d.from
        
        var addData = await user.find({_id : userid},'userName email firstName lastName profile _id')
        var channel = d
        var profile =  addData[0] 

        var finalData = {
            channel,
            profile
        }

        pairs.push(finalData)

      
            
    }

    //  data.forEach(async (d) => {
       

    //     let userid = ''
    //     if(d.to != id)
    //           userid = d.to
    //     if(d.from != id)
    //         userid = d.from

    //     var addData = await user.find({_id : userid},'userName email firstName lastName profile _id')

    //     // console.log('===================')
    //     // console.log(d)
    //     // console.log('===================')
        
    //     let profile = addData[0]
    //     let channel = d

    //     let pairData = await {
    //         profile,
    //         channel
    //     }

    //      pairs.push(pairData)
    // })


    res.status(200).send(pairs)



    } catch (error) {
        console.log(error.message)
        // res.status(404).send({message : error.message})
    }
}

export const searchAllProifle = async (req, res) => {
    
    const  keyword  = req.params.keyword 
    const  userId  = req.params.id
    try {
        // find documents based on our query and projection
        const data = await user.find({
             _id : {$nin :userId },
             userName: { $regex: keyword},
             email: { $regex: keyword}},'email firstName lastName _id profile')
             
             res.status(200).send(data)

    } catch (error) {
        console.log(error.message)
        // res.status(404).send({message : error.message})
    }
}

/**
 * get profile info
 */

export const getProfileInfo = async (req , res) => {
    const  selectedId   = req.params.selectedId
    const  currentUesrID   = req.params.currentUesrID

    try {
        if(!mongoose.isValidObjectId(selectedId)) return res.status(403).send({message : "User id is not vaild."})
        const data = await user.find({_id : Object(selectedId)},'_id email firstName lastName profile userName')
        res.status(200).send(data)
        
    } catch (error) {
        res.status(403).send({message : error.message})

    }
}


/**
 * Start chat 
 */

export const startChatChannel = async (req , res) => {
    const {from , to , message, channel } = req.body

    try {

       var chanel;
       var channelID;

        //   // if both user already in channel  
        let flag = false;

        let chanel1  = await channels.find({from : from , to : to })
        let chanel2  = await channels.find({from : to , to : from })

        if(chanel1.length === 0 || chanel2.length === 0){
            flag = true
            if(chanel1.length > 0) {channelID = chanel1[0]._id;   }
            if(chanel2.length > 0) {channelID = chanel2[0]._id;   }
        }else{
            chanel = await channels.create({from : from, to : to , status : false }) 
            channelID =   chanel._id 
        }


        const messages = await chats.create({from : from, to : to , message : message , channel : channelID })


        await pusher.trigger('earthy-table-890', 'message', messages);


        res.status(200).send({results : messages,channel : channelID })

        
    } catch (error) {
        res.status(404).send({message : error.message})
    }
}