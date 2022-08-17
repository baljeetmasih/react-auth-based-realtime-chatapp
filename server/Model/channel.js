import mongoose from "mongoose";

const channel = mongoose.Schema({
    from : {
        type : Object
    },
    to : {
        type : Object
    },
    channel : {
        type : String
    },
    status : {
        type : Boolean
    }
})

 const channels = mongoose.model('pairs',channel)

 export default channels