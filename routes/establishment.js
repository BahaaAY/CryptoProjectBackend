const express = require('express');



const router = express.Router();


const establishmentController = require('../controllers/establishment');


router.post('/connect', establishmentController.connect);

module.exports = router;