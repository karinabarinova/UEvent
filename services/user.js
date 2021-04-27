const {User} = require('../sequelize/models');

module.exports = {
    getUserInfo
}

async function getUserInfo(userId) {
    const user = await User.findByPk(userId);
    console.log("proto", User.prototype);
    return {
        user,
        companies: await user.getCompanies(),
        // events: await user.getEvents()
    };
}