// frontend/src/app_invoices/InvoiceSidebar.tsx
import React from 'react';
import type { Invoice } from '../types/invoice';
import styles from '../styles/InvoiceSidebar.module.css';

type Props = {
  /** サイドバーに並べる請求書リスト */
  invoices: Invoice[];
  /** 現在選択中の請求書ID */
  selectedId: number | null;
  /** 請求書を選択したときに呼ばれる */
  onSelect: (inv: Invoice) => void;
};

const InvoiceSidebar: React.FC<Props> = ({ invoices, selectedId, onSelect }) => {
  if (invoices.length === 0) {
    return <p className={styles.empty}>請求書データがありません。</p>;
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {invoices.map(inv => (
          <li key={inv.id}>
            <button
              className={
                inv.id === selectedId
                  ? styles.activeItem
                  : styles.item
              }
              onClick={() => onSelect(inv)}
            >
              {inv.invoice_number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InvoiceSidebar;