// frontend/src/app_invoices/InvoiceDetail.tsx
import React from 'react';
import type { Invoice, InvoiceItem } from '../types/invoice';
import styles from '../styles/InvoiceDetail.module.css';

type Props = {
  /** 表示する請求書データ */
  invoice: Invoice;
  /** 編集モードに切り替える */
  onEdit: () => void;
  /** 削除処理 */
  onDelete: () => void;
};

/**
 * 請求書詳細表示コンポーネント
 */
const InvoiceDetail: React.FC<Props> = ({ invoice, onEdit, onDelete }) => (
  <div className={styles.container}>
    {/* 編集・削除ボタン */}
    <div className={styles.buttonRow}>
      <button className={styles.editButton} onClick={onEdit}>
        編集
      </button>
      <button className={styles.deleteButton} onClick={onDelete}>
        削除
      </button>
    </div>

    <h2 className={styles.title}>請求書詳細</h2>

    <div className={styles.info}>
      <p><strong>請求書番号:</strong> {invoice.invoice_number}</p>
      <p><strong>登録番号:</strong> {invoice.registration_number}</p>
      <p><strong>銀行名:</strong> {invoice.bank_name}</p>
      <p><strong>支店名:</strong> {invoice.branch_name}</p>
      <p><strong>口座番号:</strong> {invoice.account_number}</p>
      <p><strong>口座名義:</strong> {invoice.account_holder}</p>
      <p><strong>送信日:</strong> {new Date(invoice.sent_date).toLocaleDateString()}</p>
      <p><strong>支払期日:</strong> {new Date(invoice.payment_due_date).toLocaleDateString()}</p>
    </div>

    <h3 className={styles.itemTitle}>明細</h3>
    <table className={styles.itemTable}>
      <thead>
        <tr>
          <th>品目</th>
          <th>数量</th>
          <th>単価</th>
          <th>金額</th>
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((row: InvoiceItem) => {
          const amount = row.quantity * row.unit_price;
          return (
            <tr key={row.id}>
              <td>{row.description}</td>
              <td>{row.quantity}</td>
              <td>¥{row.unit_price.toLocaleString()}</td>
              <td>¥{amount.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default InvoiceDetail;