import mongoose from "mongoose";
import user from "../Model/user.js"
import channels from "../Model/channel.js";
import chats from "../Model/chat.js";


export const getChatList = async (req , res) => {
    const {channel}= req.params
    try {
        const chatList = await chats.find({channel : channel})
        res.status(200).send({result: chatList , channel : channel})
    } catch (error) {
        res.status(404).send({message : error.message})
    }
}

