// /frontend/src/features/contracts/ContractList.tsx
import React from 'react';
import type { Contract } from './types';

interface Props {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
  onCreate: () => void;
  onDelete: (id: number) => void;
}

const ContractList: React.FC<Props> = ({ contracts, onEdit, onCreate, onDelete }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        新規作成
      </button>
      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">{contract.project_name}</h2>
          <p className="text-sm text-gray-600">{contract.employee_name}（{contract.work_style}）</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(contract)}
              className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
            >
              編集
            </button>
            <button
              onClick={() => contract.id && onDelete(contract.id)}
              className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractList;
