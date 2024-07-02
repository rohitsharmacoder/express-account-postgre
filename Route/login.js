const express = require("express");
const LoginRouter = express.Router();

const { Account } = require('../models/account');
const { successHandler, errorHandler } = require('../middleware/response');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

LoginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await Account.findOne({ where: { email } });
    console.log({account});
    if (!account) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = password === account.password; //await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: account.id, email: account.email }, 'your_jwt_secret_key', { expiresIn: '1h' });
    successHandler(res, { message: 'Login successful', token });
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = LoginRouter;