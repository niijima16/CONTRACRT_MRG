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
      {contracts.map((c) => (
        <div key={c.id} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.employeeName}>{c.employee_name}</div>
            <button className={styles.editButton} onClick={() => onEdit(c)}>
              編集
            </button>
          </div>
          <table className={styles.table}>
            <tbody>
              <tr><td className={styles.label}>働き方</td><td>{c.work_style}</td></tr>
              <tr><td className={styles.label}>契約期間</td><td>{c.contract_start_date} ～ {c.contract_end_date}</td></tr>
              <tr><td className={styles.label}>案件名</td><td>{c.project_name}</td></tr>
              <tr><td className={styles.label}>契約先会社</td><td>{c.client_company}</td></tr>
              <tr><td className={styles.label}>契約先住所</td><td>{c.client_address || '未入力'}</td></tr>
              <tr><td className={styles.label}>単価</td><td>{c.unit_price} 万円/月</td></tr>
              <tr><td className={styles.label}>超過単価</td><td>{c.overtime_unit_price} 円/時</td></tr>
              <tr><td className={styles.label}>控除単価</td><td>{c.deduction_unit_price} 円/時</td></tr>
              <tr><td className={styles.label}>生産時間</td><td>{c.working_hours_min}～{c.working_hours_max} 時間/月</td></tr>
              <tr><td className={styles.label}>支払いサイト</td><td>{c.payment_site_days} 日後</td></tr>
              <tr>
                <td className={styles.label}>担当者</td>
                <td>
                  {c.managers.map((m, i) => (
                    <div key={i}>
                      {m.name}（{m.email}）
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ContractList;