const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const GenreRoutes = require('./routes/GenreRoutes');
const UserRoutes = require('./routes/UserRoutes');  // Make sure the file path is correct

const HttpError = require('./model/http-error');




app.use(express.json());
app.use(bodyParser.json());



// to handle cors policy error
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization');
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
        );
    next();
 })


// Route middlewares
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/genre', GenreRoutes);
app.use('/api/user', UserRoutes);




app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route',404);
    throw error;
});

app.use((err,req,res,next)=>{
    // if the response is sent it will pass to another middleware
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500);
    res.json({message: err.message} || 'An unknown error occured');
})
mongoose.connect('mongodb+srv://anushaelsaanub:Faith@faith.g2t4b.mongodb.net/rental?retryWrites=true&w=majority&appName=Faith')
.then(()=>{
    app.listen(8000); 
}).catch(err=>{
    console.log(err);
})