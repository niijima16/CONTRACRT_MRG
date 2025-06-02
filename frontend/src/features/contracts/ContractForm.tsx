// /frontend/src/features/contracts/ContractForm.tsx
import React, { useState } from 'react';
import type { Contract, ContractManager } from './types';
import { updateContract, createContract } from '../../api/contracts';

type Props = {
  contract: Contract;
  onClose: () => void;
};

const ContractForm: React.FC<Props> = ({ contract, onClose }) => {
  const [formData, setFormData] = useState<Contract>({ ...contract });
  const [managers, setManagers] = useState<ContractManager[]>([...contract.managers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('_unit_price') || name.includes('working_hours') || name === 'payment_site_days'
        ? Number(value)
        : value,
    }));
  };

  const handleManagerChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedManagers = [...managers];
    if (name === 'name' || name === 'email') {
      updatedManagers[index] = {
        ...updatedManagers[index],
        [name]: value,
      };
      setManagers(updatedManagers);
    }
  };

  const addManager = () => {
    setManagers([...managers, { name: '', email: '' }]);
  };

  const removeManager = (index: number) => {
    const updatedManagers = [...managers];
    updatedManagers.splice(index, 1);
    setManagers(updatedManagers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await updateContract(formData.id, { ...formData, managers });
      alert('更新しました');
    } else {
      await createContract({ ...formData, managers });
      alert('新規作成しました');
    }
    onClose();
  };

  const fields: [keyof Contract, string][] = [
    ['employee_name', '社員名'],
    ['project_name', '案件名'],
    ['client_company', '契約先会社名'],
    ['client_address', '契約先住所'],
    ['contract_start_date', '契約開始日'],
    ['contract_end_date', '契約終了日'],
    ['unit_price', '単価（万円/月）'],
    ['overtime_unit_price', '超過単価（円/時）'],
    ['deduction_unit_price', '控除単価（円/時）'],
    ['working_hours_min', '下限時間（h/月）'],
    ['working_hours_max', '上限時間（h/月）'],
    ['payment_site_days', '支払いサイト（日）'],
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow overflow-y-auto max-h-screen">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            name={key}
            type={typeof formData[key] === 'number' ? 'number' : 'text'}
            value={formData[key] as string | number | undefined}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium">働き方</label>
        <select
          name="work_style"
          value={formData.work_style}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        >
          <option value="remote">リモート</option>
          <option value="onsite">常駐</option>
          <option value="hybrid">ハイブリッド</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">担当者</label>
        {managers.map((manager, index) => (
          <div key={index} className="border p-2 mb-2 rounded space-y-2">
            <input
              type="text"
              name="name"
              placeholder="氏名"
              value={manager.name}
              onChange={(e) => handleManagerChange(index, e)}
              className="w-full border px-2 py-1"
            />
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={manager.email}
              onChange={(e) => handleManagerChange(index, e)}
              className="w-full border px-2 py-1"
            />
            <button
              type="button"
              onClick={() => removeManager(index)}
              className="text-sm text-red-600"
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addManager}
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
        >
          担当者を追加
        </button>
      </div>

      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {formData.id ? '更新' : '作成'}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default ContractForm;