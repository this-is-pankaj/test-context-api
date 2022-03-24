const axios = require('axios');

export const makeCall =  async (config) => {
  return axios(config);
};


