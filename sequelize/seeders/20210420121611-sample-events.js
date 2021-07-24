// 'use strict';

// const bcrypt = require('bcryptjs');

// module.exports = {
// 	up: async (queryInterface, Sequelize) => {
// 		/**
// 		 * Add seed commands here.
// 		 *
// 		 * Example:
// 		 * await queryInterface.bulkInsert('People', [{
// 		 *   name: 'John Doe',
// 		 *   isBetaMember: false
// 		 * }], {});
// 		*/
// 	 return await queryInterface.bulkInsert(
// 		 "Events", 
// 		 [
// 			{
// 				name: "Node.js MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 1, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(40.730610 -73.935242)'),
//                 // location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [40.730610, -73.935242]
// 				// }, 
//                 price : 120,
//                 promoCodes: ["SALE2021"],
//                 theme: "JS",
//                 format: "Conference",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
// 			{
// 				name: "Docker MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 2, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
//                 price : 50,
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(39.799999 -89.650002)'),

// 				// location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [39.799999, -89.650002]
// 				// }, 
//                 promoCodes: ["SALE2021"],
//                 theme: "Docker",
//                 format: "Conference",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
//             {
// 				name: "Front-end MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 1, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
//                 price : 75,
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(30.455000 -84.253334)'),
// 				// location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [30.455000, -84.253334]
// 				// },
//                 promoCodes: ["SALE2021"],
//                 theme: "React.js",
//                 format: "Conference",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
//             {
// 				name: "Game Dev MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 2, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
//                 price : 180,
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(29.749907 -95.358421)'),
// 				// location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [29.749907, -95.358421]
// 				// },
//                 promoCodes: ["SALE2021"],
//                 theme: "C++",
//                 format: "Online",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
//             {
//                 name: "AI MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 1, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
//                 price : 300,
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(33.830517 -116.545601)'),

// 				// location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [33.830517, -116.545601]
// 				// },
//                 promoCodes: ["SALE2021"],
//                 theme: "Python",
//                 format: "Conference",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
//             },
//             {
//                 name: "React Native MeetUp",
// 				description: "Welcome to the Node.js Meetup! We are focused on bringing you exciting tech talks in all things node. Expect meetups roughly every 1 month, except for summer and winter breaks. Also, we run a newsletter. Once every few weeks, it sends you the top 3 - 5 most interesting & insightful JS related articles of the last weeks, updates about our meetup, the larger scene in Berlin, upcoming local & European events, as well as job opportunities, both in Berlin and for remote jobs.",
// 				organizer: 2, 
//                 startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
//                 price : 250,
// 				location: Sequelize.fn('ST_GeomFromText', 'POINT(33.427204 -111.939896)'),

// 				// location: {
// 				// 	type: 'Point',
// 				// 	coordinates: [33.427204, -111.939896]
// 				// },
//                 promoCodes: ["SALE2021"],
//                 theme: "React Native",
//                 format: "Conference",
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
//             }
// 		 ]
// 	 )
// 	},

// 	down: async (queryInterface, Sequelize) => {
// 		/**
// 		 * Add commands to revert seed here.
// 		 *
// 		 * Example:
// 		 * await queryInterface.bulkDelete('People', null, {});
// 		 */
// 		return await queryInterface.bulkDelete("Events", null, {});
// 	}
// };
