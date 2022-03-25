import { makeCall } from '../../src/utils';
const { getSessionStatus } = require('../../src/components/session.component');
const testSessionId = {
  success: '90d61876-b99a-443e-994c-ba882c8558b6',
  error: 'testId',
};

jest.mock('../../src/utils', () => ({
    makeCall: async (config: any) => {
      const incomingSession = config.url.substr(-36);
      if (!config.url || incomingSession!== testSessionId.success) {
        throw {
          error: 'Invalid SessionId',
        }
      }
      return {
        data: {
          id: incomingSession, // UUID v4
          status: 'internal_manual_review'            // Status
        }
      }
    },
  })
);

describe('Session.component.ts', () => {
  it('should return session info for valid sessionID', async () => {
    const response = await getSessionStatus(testSessionId.success);
    expect(response).toHaveProperty('id', testSessionId.success);
  });

  it('should throw error for invalid sessionID', async() => {
    const res = await getSessionStatus(testSessionId.error)
      .catch((err) => err);
      expect(res.error).toEqual('Invalid SessionId');
  });
});
