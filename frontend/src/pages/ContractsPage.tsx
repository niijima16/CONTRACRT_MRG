// src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractSidebar from '../contracts/ContractSidebar';
import ContractDetail from '../contracts/ContractDetail';
import ContractForm from '../contracts/ContractForm';
import { fetchContracts } from '../api/contracts';
import type { Contract } from '../types/contract';
import pageStyles from '../styles/ContractsPage.module.css';
import '../styles/modal.module.css'; // グローバル読み込み

const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selected, setSelected] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContracts().then(setContracts);
  }, []);

  const handleSelect = (c: Contract) => {
    setSelected(c);
    setIsEditing(false);
  };
  const handleEdit = () => setIsEditing(true);
  const handleClose = () => setIsEditing(false);
  const handleUpdated = () => {
    fetchContracts().then(data => {
      setContracts(data);
      setIsEditing(false);
      setSelected(data.find(x => x.id === selected?.id) || null);
    });
  };

  return (
    <div className={pageStyles.pageContainer}>
      <aside className={pageStyles.sidebar}>
        <ContractSidebar
          contracts={contracts}
          selectedId={selected?.id || null}
          onSelect={handleSelect}
        />
      </aside>

      <main className={pageStyles.main}>
        {selected ? (
          isEditing ? (
            <ContractForm
              contract={selected}
              onClose={handleClose}
              onUpdated={handleUpdated}
            />
          ) : (
            <>
              <button
                className={pageStyles.editButton}
                onClick={handleEdit}
              >
                編集
              </button>
              <ContractDetail contract={selected} />
            </>
          )
        ) : (
          <p className={pageStyles.placeholder}>社員を選択してください。</p>
        )}
      </main>
    </div>
  );
};

export default ContractsPage;