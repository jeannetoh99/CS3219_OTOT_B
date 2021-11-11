const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/userValidation');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/users')
  .post(validate(userValidation.createUser), userController.createUser)
  .get(userController.getUsers)
  .delete(userController.clearUsers);

router
  .route('/users/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
