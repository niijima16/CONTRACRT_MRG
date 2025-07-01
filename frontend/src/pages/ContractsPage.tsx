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
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 初回・更新時に一覧を取得
  useEffect(() => {
    fetchContracts()
      .then((data) => setContracts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={pageStyles.pageContainer}>
      {/* ── 左サイドバー：社員リスト */}
      <aside className={pageStyles.sidebar}>
        <div className={sidebarStyles.header}>契約情報</div>
        <div className={sidebarStyles.header}>社員名</div>

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
                  setSelectedContract(c);
                  setIsEditing(false);
                }}
              >
                {c.employee_name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── 右メイン：詳細 or 編集フォーム or プレースホルダー */}
      <main className={pageStyles.main}>
        {!selectedContract && (
          <p className={pageStyles.placeholder}>社員を選択してください。</p>
        )}

        {selectedContract && !isEditing && (
          <ContractDetail
            contract={selectedContract}
            onEdit={() => setIsEditing(true)}  // ← 編集モードに切り替える
          />
        )}

        {selectedContract && isEditing && (
          <ContractForm
            contract={selectedContract}
            onClose={() => setIsEditing(false)}
            onUpdated={() => {
              // 保存されたあと再取得＆詳細表示を閉じる
              fetchContracts()
                .then((data) => {
                  setContracts(data);
                  setIsEditing(false);
                })
                .catch((err) => console.error(err));
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ContractsPage;