'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
	 return await queryInterface.bulkInsert(
		 "Users", 
		 [
			 {
				fullName: "Kobe Bryant",
				email: "kobr@blackmamba.com",
				createdAt: new Date(),
				updatedAt: new Date()
			 },
			 {
				fullName: "Karina Barinova",
				email: "kbarinova11@gmail.com",
				createdAt: new Date(),
				updatedAt: new Date()
				},
			{
				fullName: "Anna Hannelson",
				email: "anna@ann.com",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		 ]
	 )
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return await queryInterface.bulkDelete("Users", null, {});
	}
};
