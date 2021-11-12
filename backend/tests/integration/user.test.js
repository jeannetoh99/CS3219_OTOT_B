const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const setupTestDB = require('../utils/setupTestDB');
const app = require('../../src/app');
const User = require('../../src/models/userModel');
const { userOne, userTwo, insertUsers } = require('../fixtures/userFixture');

setupTestDB();

describe('User routes', () => {
  describe('POST /users', () => {
    let newUser;

    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        phone: '98765432',
      };
    });

    test('should return 201 and successfully create new user if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      });

      const dbUser = await User.findById(res.body.id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, phone: newUser.phone });
    });

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail';

      await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne]);
      newUser.email = userOne.email;

      await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /users', () => {
    test('should return 200', async () => {
      await insertUsers([userOne, userTwo]);

      const res = await request(app)
        .get('/api/users')
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual(expect.any(Array));
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toEqual({
        id: userOne._id.toHexString(),
        name: userOne.name,
        email: userOne.email,
        phone: userOne.phone,
      });
    });
  });

  describe('GET /users/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get(`/api/users/${userOne._id}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        email: userOne.email,
        name: userOne.name,
        phone: userOne.phone,
      });
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/api/users/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await insertUsers([userTwo]);

      await request(app)
        .get(`/api/users/${userOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('DELETE /users/:userId', () => {
    test('should return 204 if data is ok', async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/api/users/${userOne._id}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeNull();
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete('/api/users/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user already is not found', async () => {
      await insertUsers([userOne]);

      await request(app)
        .delete(`/users/${userOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe('PUT /users/:userId', () => {
    test('should return 200 and successfully update user if data is ok', async () => {
      await insertUsers([userOne]);

      const updateBody = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        phone: '88888888',
      };

      console.log(userOne._id)

      const res = await request(app)
        .put(`/api/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        name: updateBody.name,
        email: updateBody.email,
        phone: '88888888',
      });

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({ name: updateBody.name, email: updateBody.email, phone: '88888888' });
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([userOne]);
      const updateBody = { name: faker.name.findName() };

      await request(app)
        .put(`/api/users/invalidId`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is invalid', async () => {
      await insertUsers([userOne]);
      const updateBody = { email: 'invalidEmail' };

      await request(app)
        .put(`/api/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is already taken', async () => {
      await insertUsers([userOne, userTwo]);
      const updateBody = { email: userTwo.email };

      await request(app)
        .put(`/api/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should not return 400 if email is my email', async () => {
      await insertUsers([userOne]);
      const updateBody = { email: userOne.email };

      await request(app)
        .put(`/api/users/${userOne._id}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });
  });
});