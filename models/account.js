// models/account.js
'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
    }
  }

  Account.init({
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(16),
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      get() {
        return this.getDataValue('birthday')?.toISOString().split('T')[0]; // Format as yyyy-mm-dd
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const date = this.getDataValue('created_at');
        return date ? `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]}` : null; // Format as yyyy-mm-dd hh:mm:ss
      },
    },
    last_modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const date = this.getDataValue('last_modified');
        return date ? `${date.toISOString().split('T')[0]} ${date.toTimeString().split(' ')[0]}` : null; // Format as yyyy-mm-dd hh:mm:ss
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: false,
    hooks: {
      beforeCreate: async (account) => {
        if (account.password) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
      beforeUpdate: async (account) => {
        if (account.password) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
    },
  });

  return Account;
};
