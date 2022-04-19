const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const connectDB = require('./server/database/connection')
const adminRoutes= require('./server/routes/adminRoutes')
const userRoutes= require('./server/routes/userRoutes')
const movieRoutes= require('./server/routes/movieRoutes')





dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8181

app.use(morgan('tiny'));

// database connection
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}))


app.get('/',(req, res)=>{
   return res.send("Crud Application 2");
})

// routers
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);
app.use('/api/movie',movieRoutes);



app.listen(PORT,()=> { console.log(`Server is running on http://localhost:${PORT}`)});
