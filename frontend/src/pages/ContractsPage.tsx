// /src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractList from '../contracts/ContractList';
import ContractDetail from '../contracts/ContractDetail';
import ContractForm from '../contracts/ContractForm';
import { fetchContracts } from '../api/contracts';
import type { Contract } from '../types/contract';
import styles from '../styles/ContractsPage.module.css';
import '../styles/modal.css';

const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadContracts = async () => {
    try {
      const data = await fetchContracts();
      setContracts(data);
    } catch (error) {
      console.error('契約一覧の取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleEdit = (contract: Contract) => {
    setSelectedContract(contract);
    setIsEditing(true);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setSelectedContract(null);
  };

  const handleUpdated = () => {
    loadContracts();
    setIsEditing(false);
    setSelectedContract(null);
  };

  return (
    <div className={styles.pageContainer}>
      {/* main を左、aside を右へ移動 */}
      <main className={styles.main}>
        {selectedContract ? (
          isEditing ? (
            <ContractForm
              contract={selectedContract}
              onClose={handleFormClose}
              onUpdated={handleUpdated}
            />
          ) : (
            <ContractDetail contract={selectedContract} />
          )
        ) : (
          <p className={styles.placeholder}>社員を選択してください。</p>
        )}
      </main>

      <aside className={styles.sidebar}>
        <ContractList contracts={contracts} onEdit={handleEdit} />
      </aside>
    </div>
  );
};

export default ContractsPage;