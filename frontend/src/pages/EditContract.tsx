// /frontend/src/pages/EditContract.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Contract } from '../types/Contracts';
import ContractForm from '../components/ContractForm';

const EditContract: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    axios.get<Contract>(`http://localhost:8000/contracts/${id}/`)
      .then(res => setContract(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (data: Contract) => {
    axios.put(`http://localhost:8000/contracts/${id}/`, data)
      .then(() => {
        alert('更新しました');
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  if (!contract) return <div>読み込み中...</div>;

  return (
    <div>
      <h1>契約編集</h1>
      <ContractForm defaultValues={contract} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditContract;