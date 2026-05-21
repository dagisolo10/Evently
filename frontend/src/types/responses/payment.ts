import type { Payment, } from "@/types/models/payment";
import type { ApiResult } from "@/lib/api/api-responses";

export type GetPaymentsResponse = ApiResult<{ payments: Payment[] }>;
export type GetEventPaymentsResponse = ApiResult<{ payments: Payment[] }>;
export type AddPaymentResponse = ApiResult<{ payment: Payment }>;
export type UpdatePaymentResponse = ApiResult<{ payment: Payment }>;
export type DeletePaymentResponse = ApiResult<{ payment: Payment }>;

