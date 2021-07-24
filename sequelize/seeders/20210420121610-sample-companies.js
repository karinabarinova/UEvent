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
// 		 "Companies", 
// 		 [
// 			{
// 				name: "SpaceX",
// 				description: "Aerospace manufacturer, space transportation services and communications company headquartered in Hawthorne, California.",
// 				owner: 1, //TODO: add location,
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
// 			{
//                 name: "Trello",
// 				description: "Trello is a web-based, Kanban-style, list-making application and is a subsidiary of Atlassian. Originally created by Fog Creek Software in 2011, it was spun out to form the basis of a separate company in 2014",
// 				owner: 1,
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
//             {
//                 name: "Google",
// 				description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
// 				owner: 2,
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			},
//             {
//                 name: "Amazon",
// 				description: "Amazon.com, Inc is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
// 				owner: 2,
// 				createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
// 				updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
// 			}
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
// 		return await queryInterface.bulkDelete("Companies", null, {});
// 	}
// };
