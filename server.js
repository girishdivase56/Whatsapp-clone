// importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'



//app config
const app = express()
const port = process.env.PORT || 8001
//const DBUrl = process.nextTick.DBUrl || "mongodb://127.0.0.1:27017"

const pusher = new Pusher({
    appId: "1622737",
    key: "2a73f7d98c81d65545e8",
    secret: "e795e48a1dfb67aad520",
    cluster: "eu",
    useTLS: true
  });


//middleware
app.use(express.json())
app.use(cors())
// app.use((req, res, next) =>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     next()
// })



//DB config
const conUrl = 'mongodb+srv://whatsapp-mern:whatsapp-mern@cluster0.eoo6jlk.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(conUrl,{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 30000, // Adjust the connection timeout value (in milliseconds)
    // socketTimeoutMS: 30000, // Adjust the socket timeout value (in milliseconds)
    // heartbeatFrequencyMS: 20000, // Adjust the heartbeat frequency value (in milliseconds)
    // localThresholdMS: 50, // Adjust the local threshold value (in milliseconds)
},).then(() => 
    console.log("we are connected"))

.catch((err) => console.log(err));


const db = mongoose.connection
db.once('open', () =>{
    console.log("DB Connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) =>{
        console.log(change)

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',
              {
                name:messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
              }  
            )
        } else {
            console.log('Error Triggered Pusher')
        }
    })
})

//????

//api routes
app.get('', (req, res) => res.status(200).send("Hello word"))

app.get('/messages/sync', (req, res) =>{
    Messages.find().then((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage).then((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(`New message created: \n ${data}`)
        }
    })
})

//listen
app.listen(port, () => console.log(`listening on localhost: ${port}`))