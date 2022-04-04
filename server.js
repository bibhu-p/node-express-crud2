const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection')


const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8181

app.use(morgan('tiny'));

// database connection
connectDB();


app.use(bodyParser.urlencoded({ extended : true}))


app.get('/',(req, res)=>{
    res.send("Crud Application 2");
})

// routers
app.use('/',require('./server/routes/router'))


app.listen(5000,()=> { console.log(`Server is running on http://localhost:${5000}`)});
