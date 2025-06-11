// /src/contracts/ContractList.tsx
import React from 'react';
import type { Contract } from '../types/contract';

type Props = {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
};

const ContractList: React.FC<Props> = ({ contracts, onEdit }) => {
  if (contracts.length === 0) {
    return <p className="p-4 text-gray-600">契約データがありません。</p>;
  }

  return (
    <div className="p-8">
      {contracts.map((contract) => (
        <div key={contract.id} className="border border-gray-300 rounded bg-white shadow-md mb-8">
          <div className="flex justify-between items-center border-b px-6 py-3 bg-gray-100">
            <h2 className="text-xl font-bold">{contract.employee_name}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
              onClick={() => onEdit(contract)}
            >
              編集
            </button>
          </div>
          <table className="w-full text-sm table-fixed border-collapse">
            <tbody>
              <tr><td className="w-40 px-6 py-2 font-medium">働き方</td><td>{contract.work_style}</td></tr>
              <tr><td className="px-6 py-2 font-medium">契約期間</td><td>{contract.contract_start_date} ～ {contract.contract_end_date}</td></tr>
              <tr><td className="px-6 py-2 font-medium">案件名</td><td>{contract.project_name}</td></tr>
              <tr><td className="px-6 py-2 font-medium">契約先会社</td><td>{contract.client_company}</td></tr>
              <tr><td className="px-6 py-2 font-medium">契約先住所</td><td>{contract.client_address}</td></tr>
              <tr><td className="px-6 py-2 font-medium">単価</td><td>{contract.unit_price} 万円/月</td></tr>
              <tr><td className="px-6 py-2 font-medium">超過単価</td><td>{contract.overtime_unit_price} 円/時</td></tr>
              <tr><td className="px-6 py-2 font-medium">控除単価</td><td>{contract.deduction_unit_price} 円/時</td></tr>
              <tr><td className="px-6 py-2 font-medium">生産時間</td><td>{contract.working_hours_min} ～ {contract.working_hours_max} 時間/月</td></tr>
              <tr>
                <td className="px-6 py-2 font-medium">担当者</td>
                <td>
                  {contract.managers.map((m) => `${m.name}（${m.email}）`).join('、')}
                </td>
              </tr>
              <tr><td className="px-6 py-2 font-medium">支払いサイト</td><td>支払日 {contract.payment_site_days} 日後</td></tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ContractList;