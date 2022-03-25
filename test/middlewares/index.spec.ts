import middlewares from '../../src/middlewares';

describe('Middlewares/index.ts', () => {
  describe('generateReqId method', () => {
    it('should add a requestId to the req object', () => {
      const req = {};
      middlewares.generateReqId(req, null, () => {});
      expect(req['reqId'].length).toEqual(36);
    });
  })
})