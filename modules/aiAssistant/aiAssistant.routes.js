const express = require('express');
const router = express.Router();
const controller = require('./aiAssistant.controller');

router.post('/ask', controller.handleAiAsk);

module.exports = router;
