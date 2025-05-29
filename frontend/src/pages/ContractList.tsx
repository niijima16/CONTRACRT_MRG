// /frontend/src/pages/ContractList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Contract } from '../types/Contracts';

const ContractList: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    axios
      .get<Contract[]>('http://localhost:8000/contracts/')
      .then((res) => setContracts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>契約一覧</h1>
      <table>
        <thead>
          <tr>
            <th>社員名</th>
            <th>案件名</th>
            <th>契約開始</th>
            <th>契約終了</th>
            <th>働き方</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.employee_name}</td>
              <td>{contract.project_name}</td>
              <td>{contract.contract_start_date}</td>
              <td>{contract.contract_end_date}</td>
              <td>{contract.work_style}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;