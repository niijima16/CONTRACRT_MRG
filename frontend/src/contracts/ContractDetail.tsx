// /src/contracts/ContractDetail.tsx
import React from 'react';
import type { Contract } from '../types/contract';
import detailStyles from '../styles/ContractDetail.module.css';
import '../styles/modal.module.css';

type Props = {
  contract: Contract;
};

const ContractDetail: React.FC<Props> = ({ contract }) => (
  <div className={detailStyles.detailContainer}>
    <h2 className={detailStyles.title}>{contract.employee_name}</h2>
    <table className={detailStyles.detailTable}>
      <tbody>
        <tr>
          <td className={detailStyles.labelCell}>働き方</td>
          <td>{contract.work_style}</td>
        </tr>
        {/* 以下同様に */}
        <tr>
          <td className={detailStyles.labelCell}>契約期間</td>
          <td>{contract.contract_start_date} ～ {contract.contract_end_date}</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>案件名</td>
          <td>{contract.project_name}</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>契約先会社</td>
          <td>{contract.client_company}</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>契約先住所</td>
          <td>{contract.client_address ?? '未入力'}</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>単価</td>
          <td>{contract.unit_price} 万円/月</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>超過単価</td>
          <td>{contract.overtime_unit_price} 円/時</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>控除単価</td>
          <td>{contract.deduction_unit_price} 円/時</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>生産時間</td>
          <td>{contract.working_hours_min} ～ {contract.working_hours_max} 時間/月</td>
        </tr>
        <tr>
          <td className={detailStyles.labelCell}>担当者</td>
          <td>
            {contract.managers.map((m, i) => (
              <div key={i}>{m.name}（{m.email}）</div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ContractDetail;