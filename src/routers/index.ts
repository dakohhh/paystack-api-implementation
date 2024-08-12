import express from 'express';
import payment from './payments';

const router = express.Router();

export default (): express.Router => {
    payment(router);
    return router;
};
