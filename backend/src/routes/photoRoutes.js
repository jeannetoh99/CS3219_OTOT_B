const express = require('express');
const photoController = require('../controllers/photoController');

const router = express.Router();

router
  .route('/photos')
  .get(photoController.getPhotos);

router
  .route('/photos/:id')
  .get(photosController.getPhotoById);

module.exports = router;
