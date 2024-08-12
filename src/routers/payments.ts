import express from 'express';
import PaymentController from '@/controller/payment.controller';

export default (router: express.Router) => {
    // First get all the banks from paystack
    router.get('/banks/', PaymentController.getAllBanks);

    // THEN resolve the account number, this will verify whether the account number is correct
    router.get('/resolve-account/', PaymentController.ResolveBankAccountNumber);

    // Then create the transfer reciepient and store the reci
    router.post('/reciepient/', PaymentController.createTransferReciepient);


    router.post('/transfer/', PaymentController.transerFunds);
};
