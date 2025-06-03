// /src/contracts/ContractDetail.tsx
import React from 'react';
import type { Contract } from '../types/contract';

type Props = {
  contract: Contract;
};

const ContractDetail: React.FC<Props> = ({ contract }) => {
  return (
    <div className="border rounded shadow p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">{contract.employee_name} の詳細情報</h2>
      <table className="w-full border-collapse text-left">
        <tbody>
          <tr><td className="w-40 px-6 py-2 font-medium">働き方</td><td>{contract.work_style}</td></tr>
          <tr><td className="px-6 py-2 font-medium">契約期間</td><td>{contract.contract_start_date} ～ {contract.contract_end_date}</td></tr>
          <tr><td className="px-6 py-2 font-medium">案件名</td><td>{contract.project_name}</td></tr>
          <tr><td className="px-6 py-2 font-medium">契約先会社</td><td>{contract.client_company}</td></tr>
          <tr><td className="px-6 py-2 font-medium">契約先住所</td><td>{contract.client_address ?? '未入力'}</td></tr>
          <tr><td className="px-6 py-2 font-medium">単価</td><td>{contract.unit_price} 万円/月</td></tr>
          <tr><td className="px-6 py-2 font-medium">超過単価</td><td>{contract.overtime_unit_price} 円/時</td></tr>
          <tr><td className="px-6 py-2 font-medium">控除単価</td><td>{contract.deduction_unit_price} 円/時</td></tr>
          <tr><td className="px-6 py-2 font-medium">生産時間</td><td>{contract.working_hours_min} ～ {contract.working_hours_max} 時間/月</td></tr>
          <tr>
            <td className="px-6 py-2 font-medium">担当者</td>
            <td>
              {contract.managers.map((m, i) => (
                <div key={i}>
                  {m.name}（{m.email}）
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContractDetail;