import { v4 as uuidv4 } from 'uuid';

export default {
  generateReqId: (req, res, next) => {
    req.reqId = uuidv4();
    next();
  },
};