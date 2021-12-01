import express from 'express';
// replace const express = require('express'); But need to change sth in package.json
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

// for every express application, initialize app
const app = express();

dotenv.config();

// general setup of bodyParsor to appropriately send requests
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// use middleware
// ***first param: start path for all routes inside posts.js
// this should be below cors
app.use('/posts', postRoutes);

// as soon as you come to this app, we have to have sth.
// Add a greeting route 2021/11/11
// sth we are gonna see after going to the actual deployed versions
app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

// now connect our server application with database (MongoDB) --> variable is now in .env
// specifically http://www.mongodb.com/cloud/atlas Host database on their cloud
const PORT = process.env.PORT || 5000;

// if database connection successful..then..(run on localhost5000)
// if unsuccessful, catch... 
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
