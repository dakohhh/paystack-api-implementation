import http from './xhr';
import { PaystackSuccessResponse, IBanks } from '@/types/payment';
import { BadRequestException } from '@/utils/exceptions';

export const APIGetAllBanks = async () => http.get<PaystackSuccessResponse<IBanks[]>>('/bank?currency=NGN').then((res) => res.data.data);

export const APIVerifyBankAccountNumber = async (data: { account_number: string; bank_code: string }) =>
    http
        .get<PaystackSuccessResponse<any>>(`/bank/resolve?account_number=${data.account_number}&bank_code=${data.bank_code}`)
        .then((res) => res)
        .catch((err) => {
            throw new BadRequestException(err.response.data?.message);
        });

export const APICreateTransferReciepient = async (data: { name: string; account_number: string; bank_code: string; currency: string }) =>
    http
        .post<PaystackSuccessResponse<any>>('/transferrecipient', { ...data, type: 'nuban' }) // add the type nuban in the request
        .then((res) => res.data)
        .catch((err) => {
            throw new BadRequestException(err.response.data?.message);
        });

export const APITransferFunds = async (data: { amount: number; recipient: string; reference: string; reason: string }) =>
    http
        .post<PaystackSuccessResponse<any>>('/transfer', {...data, source: 'balance'})
        .then((res) => res.data)
        .catch((err) => {
            throw new BadRequestException(err.response.data?.message);
        });


