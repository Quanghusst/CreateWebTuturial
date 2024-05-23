// app.js
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
