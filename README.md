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
> mysql -u root
> CREATE USER kbarinova@localhost IDENTIFIED BY 'swagswag69-69';
> GRANT ALL PRIVILEGES ON * . * TO kbarinova@localhost;

```
#usage:
```md
> npm start
> cd front
> npm start
```

#screenshots
![Alt text](/resources/events.png?raw=true "Events Page Home")
![Alt text](/resources/orders.png?raw=true "Orders Page")
![Alt text](/resources/account.png?raw=true "Account Page")


#dependencies:<br/>
```md
    "@fullcalendar/core": "^5.5.1",
    "@fullcalendar/daygrid": "^5.5.0",
    "@fullcalendar/interaction": "^5.5.0",
    "@fullcalendar/react": "^5.5.0",
    "@fullcalendar/timegrid": "^5.5.1",
    "@testing-library/jest-dom": "^5.11.9",
    "@testing-library/react": "^11.2.5",
    "@testing-library/user-event": "^12.6.3",
    "axios": "^0.21.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-icons": "^4.2.0",
    "react-redux": "^7.2.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.2",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.2.1",
    "web-vitals": "^1.1.0"
```
##licenses:<br/>
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

##Author:<br/>
**Karina Barinova** :bowtie: 
**Nadya Onoprienko** :bowtie: 