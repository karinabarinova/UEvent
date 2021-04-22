const config = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../sequelize/models');
const User = db.user;
const Role = db.ROLES;
const Op = db.Sequelize.Op;
const sendEmail = require('../helpers/sendMail');

module.exports = {
    login,
    register,
    verifyEmail
}

//TODO:  add forgotPassword,resetPassword,

async function register(params) {
    if (await User.findOne({ where: { email: params.email } })) {
        // send already registered error in email to prevent account enumeration
        // await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Email is already taken";
    }

    const role = Role.includes(params.role) ? params.role : "user";
    
    // create account object
    const user = await User.create({
            email: params.email,
            password: bcrypt.hashSync(params.password, 8),
            firstName: params.firstName,
            lastName: params.lastName,
            role,
            validation_str: randomTokenString()
        })

    await sendVerificationEmail(user);
}

async function login({email, password}) {
    const user = await User.findOne({
        where: {
            email: email.toLowerCase()
        }
    })

    if (!user || !user.email_validated || !(await bcrypt.compare(password, user.password))) {
        throw 'Email or password is incorrect'
    }

    const accessToken = jwt.sign({id: user.userId}, config.secret, {
        expiresIn: 86400 //24 hours
    });
    return {
        ...basicDetails(user),
        accessToken,
        expiresIn: 86400
    }
}

async function verifyEmail({ token }) {
    const user = await User.findOne({
        where: {
            validation_str: token
        }
    })
    if (!user) throw 'Verification failed';

    user.email_validated = true;
    user.validation_str = null;
    await user.save();
}

async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `localhost:3000/api/auth/verify-email?token=${user.validation_str}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/api/auth/verify-email</code> api route:</p>
                   <p><code>${user.validation_str}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'Sign-up USOF API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    const { userId, email, role, createdAt, updatedAt, firstName, lastName } = user;
    return { userId, email, role, createdAt, updatedAt, firstName, lastName };
}