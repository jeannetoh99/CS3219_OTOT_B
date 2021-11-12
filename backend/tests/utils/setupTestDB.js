const mongoose = require('mongoose');

const mongodbUrl = 'mongodb://localhost/test';

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(mongodbUrl, { useNewUrlParser: true});
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;