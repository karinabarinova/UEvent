const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv');
const app = express();
const port = process.env.PORT;
const errorHandler = require('./middleware/errorHandler');
const public = require('path').join(__dirname, 'resources');

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const db = require('./sequelize/models');
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and Resync Database");
    initial();
})

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    });
    Role.create({
        id: 3,
        name: "company"
    })
}

app.use(express.static(public));
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/company', require('./controllers/company'));
app.use('/api/event', require('./controllers/event'));

app.use(errorHandler);

app.listen(port, () => {
    console.log("App is listening on port " + port);
})