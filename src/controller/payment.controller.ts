import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import response from '@/utils/response';
import PaymentService from '@/services/payment.service';

class PaymentController {
    static async getAllBanks(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await PaymentService.getAllBanks();

            res.status(StatusCodes.OK).json(response('all banks info', results));
        } catch (error) {
            next(error);
        }
    }

    static async ResolveBankAccountNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await PaymentService.resolveBankAccountNumber(req);

            res.status(StatusCodes.OK).json(response('account number resolved', results));
        } catch (error) {
            next(error);
        }
    }

    static async createTransferReciepient(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await PaymentService.createTransferReciepient(req);

            res.status(StatusCodes.OK).json(response('reciepient created', results));
        } catch (error) {
            next(error);
        }
    }

    static async transerFunds(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await PaymentService.transferFunds(req);

            res.status(StatusCodes.OK).json(response('transfer successful', results));
        } catch (error) {
            next(error);
        }
    }
}

export default PaymentController;
