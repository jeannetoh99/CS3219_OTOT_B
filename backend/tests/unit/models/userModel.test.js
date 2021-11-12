const faker = require('faker');
const User = require('../../../src/models/userModel');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        phone: '12345678',
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if name is empty', async () => {
      newUser.name = '';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if phone is invalid (non-numeric)', async () => {
      newUser.phone = 'invalidPhone';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if phone is invalid (not 8 digits)', async () => {
      newUser.phone = '123456789';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });
});
