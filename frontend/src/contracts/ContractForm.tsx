// /src/contracts/ContractForm.tsx
import React, { useState } from 'react';
import type { Contract, ContractManager } from '../types/contract';
import { updateContract } from '../api/contracts';

type Props = {
  contract: Contract;
  onClose: () => void;
  onUpdated: () => void;
};

const ContractForm: React.FC<Props> = ({ contract, onClose, onUpdated }) => {
  const [formData, setFormData] = useState<Contract>({ ...contract });
  const [managers, setManagers] = useState<ContractManager[]>([...contract.managers]);

  const handleChange = <K extends keyof Contract>(key: K, value: Contract[K]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleManagerChange = <
    K extends keyof ContractManager
    >(
    index: number,
    key: K,
    value: ContractManager[K]
    ) => {
    const updated = [...managers];
    updated[index] = {
        ...updated[index],
        [key]: value,
    };
    setManagers(updated);
    };

  const addManager = () => {
    setManagers([...managers, { name: '', email: '' }]);
  };

  const removeManager = (index: number) => {
    const updated = [...managers];
    updated.splice(index, 1);
    setManagers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContract(formData.id!, { ...formData, managers });
    onUpdated();
  };

  const fields: { key: keyof Contract; label: string; type?: string }[] = [
    { key: 'employee_name', label: '社員名' },
    { key: 'project_name', label: '案件名' },
    { key: 'client_company', label: '契約先会社名' },
    { key: 'client_address', label: '契約先住所' },
    { key: 'contract_start_date', label: '契約開始日', type: 'date' },
    { key: 'contract_end_date', label: '契約終了日', type: 'date' },
    { key: 'unit_price', label: '単価（万円/月）', type: 'number' },
    { key: 'overtime_unit_price', label: '超過単価（円/時）', type: 'number' },
    { key: 'deduction_unit_price', label: '控除単価（円/時）', type: 'number' },
    { key: 'working_hours_min', label: '下限時間（h/月）', type: 'number' },
    { key: 'working_hours_max', label: '上限時間（h/月）', type: 'number' },
    { key: 'payment_site_days', label: '支払いサイト（日）', type: 'number' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">契約編集フォーム</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type || 'text'}
                value={formData[key] as string | number | undefined}
                onChange={(e) => {
                  const value = type === 'number' ? Number(e.target.value) : e.target.value;
                  handleChange(key, value as never);
                }}
                className="w-full border px-2 py-1"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">働き方</label>
            <select
              value={formData.work_style}
              onChange={(e) => handleChange('work_style', e.target.value as Contract['work_style'])}
              className="w-full border px-2 py-1"
            >
              <option value="remote">リモート</option>
              <option value="onsite">常駐</option>
              <option value="hybrid">ハイブリッド</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">担当者</label>
            {managers.map((m, i) => (
              <div key={i} className="border p-2 mb-2 rounded space-y-2">
                <input
                  type="text"
                  value={m.name}
                  onChange={(e) => handleManagerChange(i, 'name', e.target.value)}
                  className="w-full border px-2 py-1"
                  placeholder="氏名"
                />
                <input
                  type="email"
                  value={m.email}
                  onChange={(e) => handleManagerChange(i, 'email', e.target.value)}
                  className="w-full border px-2 py-1"
                  placeholder="メールアドレス"
                />
                <button
                  type="button"
                  onClick={() => removeManager(i)}
                  className="text-sm text-red-600"
                >
                  削除
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addManager}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm mt-2"
            >
              担当者を追加
            </button>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;