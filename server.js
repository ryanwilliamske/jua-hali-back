const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser:true, 
    useCreateIndex: true, 
    useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("We have connected successfully to MongoDB! Yay");
});


const disasterRouter = require('./routes/disasters');

app.use('/disasters',disasterRouter);

app.listen(port, () => {
    console.log(`Running on: ${port}`);
});