const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/send-request', friendController.sendFriendRequest);

router.post('/accept-request', friendController.acceptFriendRequest);

router.post('/reject-request', friendController.rejectFriendRequest);

router.get('/list-friends/:auth0Id', friendController.listFriends);


router.post('/end-friendship', friendController.endFriendship);

router.get('/incoming-requests/:auth0Id', friendController.getIncomingFriendRequests);



module.exports = router;
