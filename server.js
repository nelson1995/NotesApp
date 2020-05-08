const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('../NotesApp/config/database.config');
const app = express();

// parse requests of type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of type application/json
app.use(bodyParser.json());

//create a mongoose db connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to database");
}).catch(errorMsg => {
    console.log("Failed to connect to database ... ", errorMsg);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({ "message": "welcome to notesApp" });
});

require('./app/routes/note.routes')(app);

app.listen(3000, () => {
    console.log("Server listening requests from port 3000 !");
});