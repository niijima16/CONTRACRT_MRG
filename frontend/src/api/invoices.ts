// frontend/src/api/invoices.ts
import axios from 'axios';
import type { Invoice, InvoiceItem } from '../types/invoice';

const BASE_URL = 'http://localhost:8000/api/invoices/';

/** 請求書一覧取得 */
export const fetchInvoices = () =>
  axios.get<Invoice[]>(BASE_URL).then(r => r.data);

/** 単一請求書取得 */
export const fetchInvoice = (id: number) =>
  axios.get<Invoice>(`${BASE_URL}${id}/`).then(r => r.data);

/** 請求書更新 */
export const updateInvoice = (id: number, data: Invoice) =>
  axios.put<Invoice>(`${BASE_URL}${id}/`, data).then(r => r.data);

/** 明細一覧取得（必要なら） */
export const fetchInvoiceItems = (invoiceId: number) =>
  axios.get<InvoiceItem[]>(`${BASE_URL}${invoiceId}/invoice-items/`).then(r => r.data);

/** 請求書削除 */
export const deleteInvoice = (id: number) =>
  axios.delete(`${BASE_URL}${id}/`);

/** 明細行削除 */
export const deleteInvoiceItem = (invoiceId: number, itemId: number) =>
  axios.delete(`${BASE_URL}${invoiceId}/invoice-items/${itemId}/`);