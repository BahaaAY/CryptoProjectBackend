const express = require('express');



const router = express.Router();

const messengerController = require('../controllers/messenger');


router.post('/send', messengerController.sendMessage);
router.post('/outbox', messengerController.readSentMessages);
router.post('/inbox', messengerController.readReceivedMessages);

module.exports = router;