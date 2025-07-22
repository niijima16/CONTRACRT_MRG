// frontend/src/types/invoice.ts
// 請求書関連の型定義
// 請求明細行
export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unit_price: number;
}

// 請求基本情報
export interface Invoice {
  id: number;
  invoice_number: string;
  registration_number: string;
  bank_name: string;
  branch_name: string;
  account_number: string;
  account_holder: string;
  sent_date: string;
  payment_due_date: string;
  contract: number;        // contract.id
  items: InvoiceItem[];    // ネストされた明細行
}