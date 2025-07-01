// /src/contracts/ContractList.tsx
import React from 'react';
import type { Contract } from '../types/contract';
import styles from '../styles/ContractList.module.css';

type Props = {
  contracts: Contract[];
  onEdit: (contract: Contract) => void;
};

const ContractList: React.FC<Props> = ({ contracts, onEdit }) => {
  if (contracts.length === 0) {
    return <p className={styles.empty}>契約データがありません。</p>;
  }

  return (
    <div className={styles.container}>
      {contracts.map((contract) => (
        <div key={contract.id} className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.name}>{contract.employee_name}</h2>
            <button
              className={styles.editButton}
              onClick={() => onEdit(contract)}
            >
              編集
            </button>
          </div>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.labelCell}>働き方</td>
                <td>{contract.work_style}</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>契約期間</td>
                <td>{contract.contract_start_date} ～ {contract.contract_end_date}</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>案件名</td>
                <td>{contract.project_name}</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>契約先会社</td>
                <td>{contract.client_company}</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>契約先住所</td>
                <td>{contract.client_address ?? '未入力'}</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>単価</td>
                <td>{contract.unit_price} 万円/月</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>超過単価</td>
                <td>{contract.overtime_unit_price} 円/時</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>控除単価</td>
                <td>{contract.deduction_unit_price} 円/時</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>生産時間</td>
                <td>{contract.working_hours_min} ～ {contract.working_hours_max} 時間/月</td>
              </tr>
              <tr>
                <td className={styles.labelCell}>担当者</td>
                <td>
                  {contract.managers.map((m, i) => (
                    <div key={i}>{m.name}（{m.email}）</div>
                  ))}
                </td>
              </tr>
              <tr>
                <td className={styles.labelCell}>支払いサイト</td>
                <td>{contract.payment_site_days} 日後</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ContractList;