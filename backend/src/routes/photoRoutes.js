const express = require('express');
const photoController = require('../controllers/photoController');

const router = express.Router();

router
  .route('/photos')
  .get(photoController.getPhotos);

router
  .route('/photos/:id')
  .get(photoController.getPhotoById);

module.exports = router;
