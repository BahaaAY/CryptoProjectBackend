const express = require('express');



const router = express.Router();

const messengerController = require('../controllers/messenger');


router.post('/send', messengerController.sendMessage);
router.post('/outbox', messengerController.readOutBox);
router.post('/inbox', messengerController.readInbox);

module.exports = router;