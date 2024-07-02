// server.js
require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');

const LoginRouter = require("./Route/login");
const AccountRouter = require("./Route/account");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", LoginRouter);
app.use("/account", AccountRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
