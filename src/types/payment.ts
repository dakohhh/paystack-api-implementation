export interface PaystackSuccessResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface IBanks {
    id: number;
    name: string;
    code: string;
    currency: string;
    type: string;
    active: boolean;
    is_deleted: boolean;
    country: string;
}
