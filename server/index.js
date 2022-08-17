import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();


// get router list here

import userRoutes from './Router/user.js'
import profileRotes from './Router/profile.js'
import chatRotes from './Router/chat.js'





const database_url = process.env.DATABASE_URL
const port = process.env.PORT || 5000


const app = express();

app.use(bodyParser.json({extended:true,limit :'30mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '30mb'}))

app.use(cors())



app.use('/user', userRoutes)
app.use('/profile', profileRotes)
app.use('/chat', chatRotes)



mongoose.connect(database_url,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(port,() => {
        console.log(`Server runing on port no `,port)
    })
})
.catch((error) => console(error))

