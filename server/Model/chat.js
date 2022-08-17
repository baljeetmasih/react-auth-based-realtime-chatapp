import mongoose from "mongoose";

const chat = mongoose.Schema({
    from : {
        type : Object
    },
    to : {
        type : Object
    },
    channel : {
        type : String
    },
    message : {
        type : String
    }
})

chat.set('timestamps',{
    createdAt : 'crdAt',
    updateAt :  'updAt',
})

 const chats = mongoose.model('chat',chat)

 export default chats