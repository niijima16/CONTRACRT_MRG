// src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractDetail from '../contracts/ContractDetail';
import ContractForm   from '../contracts/ContractForm';
import type { Contract } from '../types/contract';
import { fetchContracts } from '../api/contracts';
import pageStyles    from '../styles/ContractsPage.module.css';
import sidebarStyles from '../styles/ContractSidebar.module.css';
import '../styles/modal.module.css';

const ContractsPage: React.FC = () => {
  const [contracts, setContracts]       = useState<Contract[]>([]);
  const [selectedContract, setSelected] = useState<Contract | null>(null);
  const [isEditing, setIsEditing]       = useState(false);
  const [isCreating, setIsCreating]     = useState(false);

  // 契約一覧を取得
  const reload = () => {
    fetchContracts().then(setContracts).catch(console.error);
  };
  useEffect(reload, []);

  // 新規作成に入る
  const handleCreate = () => {
    setSelected(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  return (
    <div className={pageStyles.pageContainer}>
      {/* ── 左サイドバー */}
      <aside className={pageStyles.sidebar}>
        <div className={sidebarStyles.header}>
          <span>契約情報</span>
          <button
            className={sidebarStyles.createButton}
            onClick={handleCreate}
          >
            新規作成
          </button>
        </div>

        <ul className={sidebarStyles.list}>
          {contracts.map(c => (
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

      {/* ── 右メイン */}
      <main className={pageStyles.main}>
        {!selectedContract && !isCreating && (
          <p className={pageStyles.placeholder}>社員を選択してください。</p>
        )}

        {/* 詳細表示 */}
        {selectedContract && !isEditing && !isCreating && (
          <ContractDetail
            contract={selectedContract}
            onEdit={() => setIsEditing(true)}
          />
        )}

        {/* 編集フォーム */}
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

        {/* 新規作成フォーム */}
        {isCreating && (
          <ContractForm
            contract={{
              // 空の初期オブジェクト
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