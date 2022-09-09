const {
  incomingData
} = require('../controllers/incoming-controller');
const express = require('express');
const incomingRouter = express.Router();

incomingRouter.route('/')
    .post(incomingData)

module.exports = incomingRouter;