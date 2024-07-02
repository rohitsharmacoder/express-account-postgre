const accountData = [];
let counter = 1;

console.log({accountData, counter});

const Account = {
  create: (data) => {
    data['pk'] = counter++;
    accountData.push(data);
    console.log({accountData, counter});
    return data;
  },

  findAndCountAll: () => {
    return {count: accountData.length, rows: accountData};
  },

  findByPk: (pk) => {
    const data = accountData.filter(data => data.pk === pk);
    return data?.[0] ? {...data[0]} : null;
  },

  findOne: (payload) => {
    console.log(payload);
    const data = accountData.filter(data => data.email === payload.where.email);
    console.log(data);
    return data?.[0] ? {...data[0]} : null;
  }
}

module.exports = {Account}