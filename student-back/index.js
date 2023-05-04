const express = require('express');
const {mongoose} = require('./config/dbConnection');
const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000, ()=>{console.log('server listens at port:', 3000);});
app.use('/students', studentController);