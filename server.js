const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const apiRoutes = require('./routes/apiRoutes');

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username
        user: 'root',
        password: 'G3tfucked1!',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

app.use('/api', apiRoutes);

//default route for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});