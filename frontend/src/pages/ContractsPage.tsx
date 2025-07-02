// src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractDetail from '../contracts/ContractDetail';
import ContractForm   from '../contracts/ContractForm';
import type { Contract } from '../types/contract';
import { fetchContracts } from '../api/contracts';
import pageStyles    from '../styles/ContractsPage.module.css';
import sidebarStyles from '../styles/ContractSidebar.module.css';

const ContractsPage: React.FC = () => {
  // ── State定義 ───────────────────────────────────────────
  /** 契約一覧データ */
  const [contracts, setContracts]       = useState<Contract[]>([]);
  /** 現在選択中の契約（詳細表示対象） */
  const [selectedContract, setSelected] = useState<Contract | null>(null);
  /** 編集モードかどうか */
  const [isEditing, setIsEditing]       = useState(false);
  /** 新規作成モードかどうか */
  const [isCreating, setIsCreating]     = useState(false);

  // ── データ取得 ─────────────────────────────────────────
  /**
   * 契約一覧をサーバーから取得してstateにセットする
   */
  const reload = () => {
    fetchContracts()
      .then(setContracts)
      .catch((err) => {
        console.error('契約一覧の取得に失敗しました:', err);
      });
  };
  // 初回レンダー時に一度だけreloadを呼び出す
  useEffect(reload, []);

  // ── ハンドラ ───────────────────────────────────────────
  /**
   * 「新規作成」ボタン押下時の処理
   * - 既存の選択をクリアし、新規作成フォームを表示する
   */
  const handleCreate = () => {
    setSelected(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  // ── レンダリング ───────────────────────────────────────
  return (
    <div className={pageStyles.pageContainer}>
      {/* ── 左サイドバー ─────────────────────────────── */}
      <aside className={pageStyles.sidebar}>
        {/* 見出し */}
        <div className={sidebarStyles.header}>
          <span>契約情報</span>
        </div>
        {/* 新規作成ボタン */}
        <div className={sidebarStyles.header}>
          <button
            className={sidebarStyles.createButton}
            onClick={handleCreate}
          >
            新規作成
          </button>
        </div>
        {/* 契約リスト */}
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
                  // 選択した契約を詳細表示モードに切り替え
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

      {/* ── 右メイン ─────────────────────────────────────── */}
      <main className={pageStyles.main}>
        {/* 何も選択・作成中でない場合のプレースホルダー */}
        {!selectedContract && !isCreating && (
          <p className={pageStyles.placeholder}>
            社員を選択してください。
          </p>
        )}

        {/* 詳細表示モード */}
        {selectedContract && !isEditing && !isCreating && (
          <ContractDetail
            contract={selectedContract}
            onEdit={() => setIsEditing(true)}  // 編集モードに切り替え
          />
        )}

        {/* 編集フォームモード */}
        {selectedContract && isEditing && (
          <ContractForm
            contract={selectedContract}
            onClose={() => setIsEditing(false)}  // キャンセル時に編集モード解除
            onUpdated={() => {
              reload();     // 更新後に再読み込み
              setIsEditing(false);
            }}
          />
        )}

        {/* 新規作成フォームモード */}
        {isCreating && (
          <ContractForm
            contract={{
              // 空の初期オブジェクトを渡す
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
            onClose={() => setIsCreating(false)}   // キャンセル時に作成モード解除
            onUpdated={() => {
              reload();       // 作成後に再読み込み
              setIsCreating(false);
            }}
            isNew={true}    // 新規フラグを渡す
          />
        )}
      </main>
    </div>
  );
};

export default ContractsPage;