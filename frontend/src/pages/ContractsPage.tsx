// /src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractForm from '../contracts/ContractForm';
import ContractDetail from '../contracts/ContractDetail';
import ContractList from '../contracts/ContractList';
import type { Contract } from '../types/contract';
import { fetchContracts } from '../api/contracts';
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
    <div className="flex h-screen">
      {/* 左サイドバー（一覧） */}
      <aside style={{ width: '50%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <ContractList contracts={contracts} onEdit={handleEdit} />
      </aside>

      {/* 右詳細表示 */}
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {selectedContract ? (
          <ContractDetail contract={selectedContract} />
        ) : (
          <p style={{ color: '#888' }}>社員を選択してください。</p>
        )}
      </main>

      {/* モーダル編集フォーム */}
      {isEditing && selectedContract && (
        <div className="modal-overlay" onClick={handleFormClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ContractForm
              contract={selectedContract}
              onClose={handleFormClose}
              onUpdated={handleUpdated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractsPage;