// src/contracts/ContractDetail.tsx
import React from 'react';
import type { Contract } from '../types/contract';
import styles from '../styles/ContractDetail.module.css';

type Props = {
  /** 表示する契約データ */
  contract: Contract;
  /** 「編集」ボタン押下時のハンドラ */
  onEdit: () => void;
  /** 「削除」ボタン押下時のハンドラ */
  onDelete: () => void;
};

/**
 * 契約の詳細表示コンポーネント
 */
const ContractDetail: React.FC<Props> = ({ contract, onEdit, onDelete }) => (
  <div className={styles.detailContainer}>
    {/* 編集・削除ボタン */}
    <div className={styles.buttonRow}>
      <button className={styles.editButton} onClick={onEdit}>
        編集
      </button>
      <button className={styles.deleteButton} onClick={onDelete}>
        削除
      </button>
    </div>

    {/* 社員名見出し */}
    <h2 className={styles.title}>
      {contract.employee_name} の契約情報
    </h2>

    {/* 契約内容テーブル */}
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.tdLabel}>働き方</td>
          <td className={styles.tdValue}>{contract.work_style}</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>契約期間</td>
          <td className={styles.tdValue}>
            {contract.contract_start_date} ～ {contract.contract_end_date}
          </td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>案件名</td>
          <td className={styles.tdValue}>{contract.project_name}</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>契約先会社</td>
          <td className={styles.tdValue}>{contract.client_company}</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>契約先住所</td>
          <td className={styles.tdValue}>
            {contract.client_address ?? '未入力'}
          </td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>単価</td>
          <td className={styles.tdValue}>{contract.unit_price} 万円/月</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>超過単価</td>
          <td className={styles.tdValue}>{contract.overtime_unit_price} 円/時</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>控除単価</td>
          <td className={styles.tdValue}>{contract.deduction_unit_price} 円/時</td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>生産時間</td>
          <td className={styles.tdValue}>
            {contract.working_hours_min} ～ {contract.working_hours_max} 時間/月
          </td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>担当者</td>
          <td className={styles.tdValue}>
            {contract.managers.map((m, i) => (
              <div key={i}>
                {m.name}（{m.email}）
              </div>
            ))}
          </td>
        </tr>
        <tr>
          <td className={styles.tdLabel}>支払いサイト</td>
          <td className={styles.tdValue}>{contract.payment_site_days} 日後</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ContractDetail;