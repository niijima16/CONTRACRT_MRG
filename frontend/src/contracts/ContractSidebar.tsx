// src/contracts/ContractSidebar.tsx
import React from 'react';
import type { Contract } from '../types/contract';
import sidebarStyles from '../styles/ContractSidebar.module.css';

type Props = {
  contracts: Contract[];
  selectedId: number | null;
  onSelect: (c: Contract) => void;
};

const ContractSidebar: React.FC<Props> = ({ contracts, selectedId, onSelect }) => {
  if (contracts.length === 0) {
    return <p className={sidebarStyles.empty}>契約データがありません。</p>;
  }
  return (
    <nav className={sidebarStyles.container}>
      <ul className={sidebarStyles.list}>
        {contracts.map(c => (
          <li key={c.id}>
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