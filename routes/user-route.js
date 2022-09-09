const {auth} = require('../controllers/user-controller');
const express = require('express');
const userRouter = express.Router();

userRouter.route('/auth').post(auth);
module.exports = userRouter;