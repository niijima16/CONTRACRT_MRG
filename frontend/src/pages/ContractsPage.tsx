// src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractDetail from '../app_contracts/ContractDetail';
import ContractForm   from '../app_contracts/ContractForm';
import type { Contract } from '../types/contract';
import { fetchContracts, deleteContract } from '../api/contracts';
import pageStyles    from '../styles/ContractsPage.module.css';
import sidebarStyles from '../styles/ContractSidebar.module.css';

/**
 * 契約管理画面のメインコンポーネント
 */
const ContractsPage: React.FC = () => {
  // ── State 定義 ───────────────────────────────────
  const [contracts, setContracts]           = useState<Contract[]>([]);          // 契約一覧
  const [selectedContract, setSelected]     = useState<Contract | null>(null);  // 選択中の契約
  const [isEditing, setIsEditing]           = useState(false);                  // 編集モードフラグ
  const [isCreating, setIsCreating]         = useState(false);                  // 新規作成モードフラグ

  // ── API 呼び出し ─────────────────────────────────
  /** 一覧を取得し state にセット */
  const reload = () => {
    fetchContracts()
      .then(setContracts)
      .catch((err) => console.error('契約一覧取得エラー:', err));
  };
  useEffect(reload, []);

  /**
   * 選択中の契約を削除する
   * @param id 削除対象の契約ID
   */
  const handleDelete = async (id: number) => {
    if (!window.confirm('本当にこの契約を削除しますか？')) return;
    try {
      await deleteContract(id);
      alert('削除しました');
      // 削除後は一覧を再取得＆詳細画面を閉じる
      reload();
      setSelected(null);
      setIsEditing(false);
      setIsCreating(false);
    } catch (err) {
      console.error('削除エラー:', err);
      alert('削除に失敗しました');
    }
  };

  /** 新規作成モードに切り替える */
  const handleCreate = () => {
    setSelected(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  return (
    <div className={pageStyles.pageContainer}>
      {/* ── 左サイドバー：契約リスト + 新規作成ボタン ── */}
      <aside className={pageStyles.sidebar}>
        <div className={sidebarStyles.header}>
          <span>契約情報</span>
        </div>
        <div className={sidebarStyles.header}>
          <button className={sidebarStyles.createButton} onClick={handleCreate}>
            新規作成
          </button>
        </div>
        <ul className={sidebarStyles.list}>
          {contracts.map((c) => (
            <li key={c.id}>
              <button
                className={
                  c.id === selectedContract?.id
                    ? sidebarStyles.activeItem
                    : sidebarStyles.item
                }
                onClick={() => {
                  setSelected(c);
                  setIsEditing(false);
                  setIsCreating(false);
                }}
              >
                {c.employee_name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── 右メイン：詳細表示／編集フォーム／新規フォーム ── */}
      <main className={pageStyles.main}>
        {/* 契約未選択かつ新規作成モードでないとき */}
        {!selectedContract && !isCreating && (
          <p className={pageStyles.placeholder}>社員を選択してください。</p>
        )}

        {/* 詳細表示モード */}
        {selectedContract && !isEditing && !isCreating && (
          <ContractDetail
            contract={selectedContract}
            onEdit={() => setIsEditing(true)}
            onDelete={() => handleDelete(selectedContract.id!)}
          />
        )}

        {/* 編集フォームモード */}
        {selectedContract && isEditing && (
          <ContractForm
            contract={selectedContract}
            onClose={() => setIsEditing(false)}
            onUpdated={() => {
              reload();
              setIsEditing(false);
            }}
          />
        )}

        {/* 新規作成フォームモード */}
        {isCreating && (
          <ContractForm
            contract={{
              id: undefined,
              employee_name: '',
              work_style: 'remote',
              contract_start_date: '',
              contract_end_date: '',
              project_name: '',
              client_company: '',
              client_address: '',
              unit_price: 0,
              overtime_unit_price: 0,
              deduction_unit_price: 0,
              working_hours_min: 0,
              working_hours_max: 0,
              payment_site_days: 0,
              managers: [],
              created_at: '',
              updated_at: '',
            }}
            onClose={() => setIsCreating(false)}
            onUpdated={() => {
              reload();
              setIsCreating(false);
            }}
            isNew={true}
          />
        )}
      </main>
    </div>
  );
};

export default ContractsPage;