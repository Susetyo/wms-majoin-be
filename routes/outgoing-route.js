const {
  outgoingData
} = require('../controllers/outgoing-controller');
const express = require('express');
const outgoingRouter = express.Router();

outgoingRouter.route('/')
    .post(outgoingData)

module.exports = outgoingRouter;