const express = require('express');
const multure = require('multer');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multure({
    storage : multure.memoryStorage()
});


router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood);

router.get('/', authMiddleware.authUserMiddleware, foodController.getAllFoodItems);

module.exports = router;