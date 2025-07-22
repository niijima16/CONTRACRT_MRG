// src/pages/InvoicesPage.tsx
import React, { useEffect, useState } from 'react';
import InvoiceSidebar from '../app_invoices/InvoiceSidebar';
import InvoiceDetail  from '../app_invoices/InvoiceDetail';
import InvoiceForm  from '../app_invoices/invoiceForm';
import { fetchInvoices, deleteInvoice } from '../api/invoices';
import type { Invoice } from '../types/invoice';

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices]         = useState<Invoice[]>([]);
  const [selectedInvoice, setSelected]  = useState<Invoice | null>(null);
  const [isEditing, setIsEditing]       = useState(false);

  // 一覧取得 → state にセット
  useEffect(() => {
    fetchInvoices().then(setInvoices).catch(console.error);
  }, []);

  // 削除ハンドラ
  const handleDelete = async () => {
    if (!selectedInvoice) return;
    if (!window.confirm('本当に削除しますか？')) return;
    await deleteInvoice(selectedInvoice.id);
    const updated = await fetchInvoices();
    setInvoices(updated);
    setSelected(null);
  };

  return (
    <div className="flex h-full">
      {/* 左サイドバー：請求書一覧 */}
      <aside className="w-1/4 border-r overflow-auto">
        <InvoiceSidebar
          invoices={invoices}
          selectedId={selectedInvoice?.id ?? null}
          onSelect={(inv) => {
            setSelected(inv);
            setIsEditing(false);
          }}
        />
      </aside>

      {/* 右メイン：詳細表示 or 編集フォーム or プレースホルダー */}
      <main className="flex-1 p-6 overflow-auto">
        {/* 何も選択していないとき */}
        {!selectedInvoice && (
          <p>請求書を選択してください。</p>
        )}

        {/* 詳細表示モード */}
        {selectedInvoice && !isEditing && (
          <InvoiceDetail
            invoice={selectedInvoice}
            onEdit={() => setIsEditing(true)}   // ← InvoiceDetail の Props に合わせて
            onDelete={handleDelete}             // ← InvoiceDetail の Props に合わせて
          />
        )}

        {/* 編集フォームモード */}
        {selectedInvoice && isEditing && (
          <InvoiceForm
            invoice={selectedInvoice}
            onClose={() => setIsEditing(false)} // ← InvoiceForm の Props に合わせて
            onSaved={() => {
              // 保存後リロード＆編集モード解除
              fetchInvoices().then(setInvoices).catch(console.error);
              setIsEditing(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default InvoicesPage;