const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv');
const app = express();
const port = process.env.PORT;
const errorHandler = require('./middleware/errorHandler');
const public = require('path').join(__dirname, 'resources');
const cron = require('node-cron');
const notificationCron = require('./helpers/cron');

const corsOptions = {
    origin: "http://localhost:3006"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const db = require('./sequelize/models');
const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and Resync Database");
//     initial();
// })

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
app.use('/api/user', require('./controllers/user'));


app.use(errorHandler);

cron.schedule('* * * * *', async function() {
    await notificationCron();
});

app.listen(port, () => {
    console.log("App is listening on port " + port);
})