import { v4 as uuidv4 } from 'uuid';

export default {
  generateReqId: (req, res, next) => {
    // generates a random string as tracking ID
    req.reqId = uuidv4();
    next();
  },
};