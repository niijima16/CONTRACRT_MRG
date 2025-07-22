// src/contracts/InvoiceForm.tsx
import React, { useState } from 'react';
import type { Invoice } from '../types/invoice';
import { updateInvoice } from '../api/invoices';
import formStyles from '../styles/InvoiceForm.module.css';

type Props = {
  /** 編集対象の請求書データ */
  invoice: Invoice;
  /** キャンセル時に呼ばれるハンドラ */
  onClose: () => void;
  /** 保存後に一覧を再取得するハンドラ */
  onSaved: () => void;
};

/**
 * 請求書編集フォームコンポーネント
 */
const InvoiceForm: React.FC<Props> = ({ invoice, onClose, onSaved }) => {
  // 型に合わせて初期化
  const [formData, setFormData] = useState<Invoice>({ ...invoice });
  const [saving, setSaving]     = useState(false);

  /** 汎用入力変更ハンドラ */
  const handleChange = <K extends keyof Invoice>(key: K, value: Invoice[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  /** フォーム送信 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateInvoice(formData.id, formData);
      alert('請求書を保存しました');
      onSaved();
    } catch (err) {
      console.error(err);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={formStyles.overlay}>
      <div className={formStyles.modal}>
        <h2 className={formStyles.title}>請求書を編集</h2>
        <form onSubmit={handleSubmit}>
          {/* 請求書番号 */}
          <div className={formStyles.field}>
            <label>請求書番号</label>
            <input
              type="text"
              value={formData.invoice_number}
              onChange={e => handleChange('invoice_number', e.target.value)}
            />
          </div>

          {/* 登録番号 */}
          <div className={formStyles.field}>
            <label>登録番号</label>
            <input
              type="text"
              value={formData.registration_number}
              onChange={e => handleChange('registration_number', e.target.value)}
            />
          </div>

          {/* 銀行名 */}
          <div className={formStyles.field}>
            <label>金融機関名</label>
            <input
              type="text"
              value={formData.bank_name}
              onChange={e => handleChange('bank_name', e.target.value)}
            />
          </div>

          {/* 支店名 */}
          <div className={formStyles.field}>
            <label>支店名</label>
            <input
              type="text"
              value={formData.branch_name}
              onChange={e => handleChange('branch_name', e.target.value)}
            />
          </div>

          {/* 口座番号 */}
          <div className={formStyles.field}>
            <label>口座番号</label>
            <input
              type="text"
              value={formData.account_number}
              onChange={e => handleChange('account_number', e.target.value)}
            />
          </div>

          {/* 口座名義 */}
          <div className={formStyles.field}>
            <label>口座名義</label>
            <input
              type="text"
              value={formData.account_holder}
              onChange={e => handleChange('account_holder', e.target.value)}
            />
          </div>

          {/* 発行日 */}
          <div className={formStyles.field}>
            <label>送信日</label>
            <input
              type="date"
              value={formData.sent_date}
              onChange={e => handleChange('sent_date', e.target.value)}
            />
          </div>

          {/* 支払期日 */}
          <div className={formStyles.field}>
            <label>支払期日</label>
            <input
              type="date"
              value={formData.payment_due_date}
              onChange={e => handleChange('payment_due_date', e.target.value)}
            />
          </div>

          {/* どの契約に紐づけるか（ドロップダウンなどで選択可） */}
          <div className={formStyles.field}>
            <label>契約</label>
            <input
              type="number"
              value={formData.contract}
              onChange={e => handleChange('contract', Number(e.target.value))}
            />
          </div>

          {/* アクションボタン */}
          <div className={formStyles.buttons}>
            <button type="button" onClick={onClose} disabled={saving}>
              キャンセル
            </button>
            <button type="submit" disabled={saving}>
              {saving ? '保存中…' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;