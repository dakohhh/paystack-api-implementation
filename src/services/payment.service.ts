import axios from 'axios';
import { APIGetAllBanks, APIVerifyBankAccountNumber, APICreateTransferReciepient, APITransferFunds } from '@/http';
import { IBanks } from '@/types/payment';
import { Request } from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@/utils/exceptions';

class PaymentService {
    static async getAllBanks() {
        const banks = APIGetAllBanks().then((res) =>
            res.map((bank: IBanks) => ({
                id: bank.id,
                code: bank.code,
                name: bank.name,
                currency: bank.currency,
                country: bank.country,
            }))
        );

        return banks;
    }

    static async resolveBankAccountNumber({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            account_number: Joi.string().min(10).max(10).required(),
            bank_code: Joi.string().required(),
        })
            .options({ stripUnknown: true })
            .validate(body);

        if (error) throw new BadRequestException(error.message);

        const resolve_account = await APIVerifyBankAccountNumber({
            account_number: data.account_number,
            bank_code: data.bank_code,
        });

        return resolve_account.data.data;
    }

    // Store the reciepient code in the database, so next time the user makes a transfer you can just use the reciepient code from the database
    static async createTransferReciepient({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            name: Joi.string().required(),
            account_number: Joi.string().min(10).max(10).required(),
            bank_code: Joi.string().required(),
            currency: Joi.string().required(), // NGN
        })
            .options({ stripUnknown: true })
            .validate(body);

        if (error) throw new BadRequestException(error.message);

        const reciepient = await APICreateTransferReciepient({
            name: data.name,
            account_number: data.account_number,
            bank_code: data.bank_code,
            currency: data.currency,
        });

        return reciepient.data;
    }

    static async transferFunds({ body }: Partial<Request>) {
        const { error, value: data } = Joi.object({
            amount: Joi.number().required(), // amount in kobo
            recipient_code: Joi.string().required(),
            reason: Joi.string().required(),
        })
            .options({ stripUnknown: true })
            .validate(body);

        if (error) throw new BadRequestException(error.message);

        // Create a unique reference for the transaction
        // Reference must store in the database, this is neccessary for tracking and verifying the transaction
        const reference = uuidv4();

        const transfer_details = await APITransferFunds({amount: data.amount, recipient: data.recipient_code, reference: reference, reason: data.reason});

        // Once successful Store the transfer code as well as the reference in the database.

        return transfer_details.data;

    }
}

export default PaymentService;
