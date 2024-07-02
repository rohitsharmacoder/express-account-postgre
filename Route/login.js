const express = require("express");
const LoginRouter = express.Router();

const { successHandler, errorHandler } = require('../middleware/response');

const {sequelize, DataTypes} = require("../database/connection");
const accountModel = require('../models/account');
const Account = accountModel(sequelize, DataTypes);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

LoginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await Account.findOne({ where: { email } });
    
    if (!account) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: account.id, email: account.email }, 'rohit@test', { expiresIn: '1h' });
    successHandler(res, { message: 'Login successful', token });
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = LoginRouter;