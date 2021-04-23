const db = require('../sequelize/models');
const User = db.user;

module.exports = {
    getUserInfo
}

async function getUserInfo(userId) {
    const user = await User.findByPk(userId);
    console.log("proto", User.prototype);
    return {
        user,
        companies: await user.getCompanies()
    };
}