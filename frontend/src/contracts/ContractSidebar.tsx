// src/contracts/ContractSidebar.tsx
import React from 'react';
import type { Contract } from '../types/contract';
import sidebarStyles from '../styles/ContractSidebar.module.css';

type Props = {
  /** 表示する契約データの配列 */  
  contracts: Contract[];
  /** 現在選択中の契約ID。なければ null */  
  selectedId: number | null;
  /** 契約を選択したときに呼び出されるハンドラ */  
  onSelect: (c: Contract) => void;
};

/**
 * サイドバーに契約リストを表示するコンポーネント
 * - 契約データが空の場合はメッセージを表示
 * - 各契約名をボタンとして表示し、クリックで選択ハンドラを呼び出す
 */
const ContractSidebar: React.FC<Props> = ({
  contracts,
  selectedId,
  onSelect,
}) => {
  // データが一件もない場合は「データなし」メッセージを表示
  if (contracts.length === 0) {
    return (
      <p className={sidebarStyles.empty}>
        契約データがありません。
      </p>
    );
  }

  return (
    <nav className={sidebarStyles.container}>
      <ul className={sidebarStyles.list}>
        {contracts.map((c) => (
          <li key={c.id}>
            {/* 選択中の契約はスタイルを切り替えて強調表示 */}
            <button
              className={
                c.id === selectedId
                  ? sidebarStyles.activeItem
                  : sidebarStyles.item
              }
              onClick={() => onSelect(c)}
            >
              {c.employee_name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ContractSidebar;