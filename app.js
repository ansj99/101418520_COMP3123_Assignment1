const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB_URL = "mongodb+srv://ansjoju:bAzQHdk8Kwfcw32i@mycluster.tiegk.mongodb.net/comp3123-assignment1?retryWrites=true&w=majority&appName=MyCluster"; 
const app = express();
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes.js')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to the MongoDB Atlas database.");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h3>Full Stack Development - COMP3123 | ANS JOJU | 101418520</h3>");
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(8085, () => {
    console.log("Server is listening on port 8085");
});


