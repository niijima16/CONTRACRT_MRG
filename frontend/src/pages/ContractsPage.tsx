// /src/pages/ContractsPage.tsx
import React, { useEffect, useState } from 'react';
import ContractForm from '../contracts/ContractForm';
import ContractDetail from '../contracts/ContractDetail';
import ContractList from '../contracts/ContractList';
import type { Contract } from '../types/contract';
import { fetchContracts } from '../api/contracts';

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
    <div className="flex h-screen relative">
      {/* 左側: 一覧 */}
      <aside className="w-1/2 border-r overflow-auto">
        <ContractList contracts={contracts} onEdit={handleEdit} />
      </aside>

      {/* 右側: 詳細表示 */}
      <main className="flex-1 p-6 overflow-auto">
        {selectedContract ? (
          <ContractDetail contract={selectedContract} />
        ) : (
          <p className="text-gray-500">社員を選択してください。</p>
        )}
      </main>

      {/* 編集モーダル */}
      {isEditing && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">契約編集</h2>
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