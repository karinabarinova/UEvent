const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv');
const passport = require('passport'), GoogleStrategy = require('passport-google-oauth20')
const app = express();
const port = process.env.PORT;
const errorHandler = require('./middleware/errorHandler');
const public = require('path').join(__dirname, 'resources');
const cron = require('node-cron');
const notificationCron = require('./helpers/cron');
const db = require('./sequelize/models');
const {socialLogin} = require("./services/auth");
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/avatarImages', express.static('avatarImages'))
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb',}))
app.use(errorHandler);
app.use(passport.initialize())

passport.serializeUser((user, cb) => {
    return cb(null, user.id)
})

passport.deserializeUser((user, cb) => {
    return cb(null, user.id)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/google-auth"
    },
    (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile)
    }
))

app.post('/api/google', async (req, res, next) => {
    const {tokenId} = req.body
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const {name, email, picture} = ticket.getPayload();
    socialLogin(email)
        .then((data) => res.status(200).json({data, message: "Logged in successfully"}))
        .catch(next)
    ;
})

const Role = db.role;

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

cron.schedule('* * * * *', async function () {
    await notificationCron();
});

app.listen(port, () => {
    console.log("App is listening on port " + port);
})