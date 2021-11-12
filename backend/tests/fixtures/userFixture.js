const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../../src/models/userModel');

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  phone: '87698231'
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  phone: '17823839'
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user })));
};

module.exports = {
  userOne,
  userTwo,
  insertUsers,
};
