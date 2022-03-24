import { makeCall } from '../utils';

const contextMapper = {
  'document-front': 'front',
  'document-back': 'back',
};

module.exports = {
  getAllMediaForSession: async (id: string) => {
    try {
      const config = {
        url: `https://api.veriff.internal/sessions/${id}/media`,
        method: 'GET',
      }
      const { data } = await makeCall(config);
      return data;
    } catch (exc) {
      throw exc;
    }
  },
  getMediaContextForSession: async (id: string) => {
    try {
      const config = {
        url: `https://api.veriff.internal/media-context/${id}`,
        method: 'GET',
      }
      const { data } = await makeCall(config);
      return data;
    } catch (exc) {
      throw exc;
    }
  },
  getContext: (type: string) => contextMapper[type] || 'none',
};