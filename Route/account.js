const express = require("express");
const AccountRouter = express.Router();

const accountModel = require('../models/account');

const {sequelize, DataTypes} = require("../database/connection");
const Account = accountModel(sequelize, DataTypes);

const auth = require("../middleware/auth");
const { successHandler, errorHandler } = require('../middleware/response');


// Create a new account
AccountRouter.post('/', async (req, res) => {
  try {
    const account = await Account.create(req.body);
    successHandler(res, account, 'Account created successfully', 201);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get all accounts
AccountRouter.get('/', auth, async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10; 
  const offset = parseInt(req.query.offset, 10) || 0; 

  try {
    const accounts = await Account.findAndCountAll({
      limit,
      offset,
    });

    successHandler(res, {
      total: accounts.count,
      limit,
      offset,
      data: accounts.rows,
    });
  } catch (err) {
    errorHandler(err);
  }
});

// Get an account by ID
AccountRouter.get('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    successHandler(res, account, 'Account fetched successfully');
  } catch (err) {
    errorHandler(res, err);
  }
});

// Update an account by ID
AccountRouter.put('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    await account.update(req.body);
    successHandler(res, account, 'Account updated successfully');
  } catch (err) {
    errorHandler(res, err);
  }
});

// Delete an account by ID
AccountRouter.delete('/:id', auth, async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    await account.destroy();
    successHandler(res, { message: 'Account deleted successfully' });
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = AccountRouter;