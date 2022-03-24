import { makeCall } from '../utils';

module.exports = {
  getSessionStatus: async (id: String) => {
    try {
      const config = {
        url: `https://api.veriff.internal/sessions/${id}`,
        method: 'GET',
      }
      const { data } = await makeCall(config);
      return data;
    } catch (exc) {
      throw exc;
    }
  },
};