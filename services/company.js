// const db = require('../sequelize/models');
const { User, Company } = require('../sequelize/models');

module.exports = {
    getAll,
    getById,
    getEvents,
    add,
    update,
    delete: _delete
}

async function getAll() {
    return await Company.findAll();
}

async function getById(id) {
    return await getCompany(id);
}

async function getEvents(id) {
    const company = await getCompany(id);
    return await company.getEvents();
}

async function add(params, id) {
    const exists = await Company.findOne({
        where: {
            name: params.name
        }
    })
    if (exists)
        throw 'Company already exists';

    const user = await User.findByPk(id);
    const company =  await Company.create({
        name: params.name,
        location: params.location,
        description: params.description,
        owner: id
    });
    
    await user.addCompany(company);
}

async function update(params, id) {
    const exists = await Company.findOne({
        where: {
            name: params.name
        }
    })
    if (exists)
        throw 'Company already exists';
    const company = await getCompany(id);
    Object.assign(company, params);
    await company.save();
    return company.get(); //do I really need it?
}

async function _delete(id) {
    const company = await getCompany(id);
    await company.destroy();
}

async function getCompany(id) {
    const company = await Company.findByPk(id);
    if (!company) throw 'Company not found';
    return company;
}