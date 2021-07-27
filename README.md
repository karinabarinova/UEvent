# Table of Content
# UEvent

##description:

Our challenge was to create the service called uevent that helps organize/buy tickets to events

##**Database tables**:<br/>

- Users<br/>
- Events<br/>
- Companies<br/>
- Subscriptions<br/>
- Orders<br/>
- Formats<br/>
- Themes<br/>

#Future plans
- Functionality to choose whether the user wants to receive notifications about new visitors of their own event
- Invite friends to see event info
- Separate page for creating notifications – choose a theme of the reminder and the reminder body
- Functionality to choose who can see the list of event visitors (everybody or only users who are going to the event)

#installation:
```md
> npm install
> CREATE USER kbarinova@localhost IDENTIFIED BY 'swagswag69-69';
> GRANT ALL PRIVILEGES ON * . * TO kbarinova@localhost;

```
#usage:
```md
> npm start
> cd client
> npm start
```

#screenshots
![Alt text](/resources/events.png?raw=true "Events Page Home")
![Alt text](/resources/orders.png?raw=true "Orders Page")
![Alt text](/resources/account.png?raw=true "Account Page")


#dependencies:<br/>
```md
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "node-cron": "^3.0.0",
    "nodemailer": "^6.5.0",
    "pg": "^8.6.0",
    "pg-hstore": "^2.3.3",
    "qrcode": "^1.4.4",
    "sequelize": "^6.6.2",
    "stripe": "^8.151.0"
    "@material-ui/core": "^4.11.4",
    "@material-ui/icons": "^4.11.2",
    "@reduxjs/toolkit": "^1.5.1",
    "@stripe/react-stripe-js": "^1.4.1",
    "@stripe/stripe-js": "^1.15.0",
    "@testing-library/jest-dom": "^5.12.0",
    "@testing-library/react": "^11.2.6",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "downshift": "^6.1.3",
    "eventemitter3": "^4.0.7",
    "google-maps-react": "^2.0.6",
    "history": "^5.0.0",
    "i18next": "^20.3.1",
    "jwt-decode": "^3.1.2",
    "lodash.debounce": "^4.0.8",
    "nprogress": "^0.2.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-i18next": "^11.10.0",
    "react-places-autocomplete": "^7.3.0",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "react-transition-group": "^4.4.1",
    "redux-logger": "^3.0.6",
    "styled-components": "^5.2.3",
```
##licenses:<br/>
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

##Author:<br/>
**Karina Barinova** :bowtie: 
**Nadya Onoprienko** :bowtie: 