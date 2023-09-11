const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const  route  = require('./components/routes/route')
const app = express()
const PORT = 5000

//middleware
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded())


app.use('/', route)  


//==== mongoDB connection

mongoose.connect('mongodb+srv://newuser:newuser@cluster0.ghayzlv.mongodb.net/techdome',
    { useNewUrlParser: true }
)
    .then(() => console.log('mongoDB is connected'))
    .catch((err) => console.log(err))



app.listen(PORT, ()=> {console.log(`server is running on port ${PORT}`);})


