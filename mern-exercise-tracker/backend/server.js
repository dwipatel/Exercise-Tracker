const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

//creating express server
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
//once it is opened, it prints this
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
//when url ends with these, it loads everything from the corresponding file
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})