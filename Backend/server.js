const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()
const app = express()
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected"))
    .catch(err => console.log("Error while connecting", err));

const auth_routering = require('./routes/Authroutes');
app.use('/Event/auth', auth_routering);
const category_routering = require('./routes/Categoryroutes');
app.use('/Event/category', category_routering);
const event_routering = require('./routes/Eventroutes');
app.use('/Event/main',event_routering);
app.listen(process.env.PORT,()=>{
    console.log(`Server is started`)
})