import mongoose from "mongoose";

const users = mongoose.Schema({
    userName : {
        type : String,
    },
    email    : {
        type : String
    },
    password : {
        type : String
    },
    firstName :  {
        type : String
    },
    lastName : {
        type : String
    },
    profile : {
        type : String
    }
})

 const user = mongoose.model('user',users)

 export default user