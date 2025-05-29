// /frontend/src/components/ContractForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import type { Contract } from '../types/Contracts';

interface Props {
  defaultValues: Contract;
  onSubmit: (data: Contract) => void;
}

const ContractForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const { register, handleSubmit } = useForm<Contract>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>社員名: <input {...register('employee_name')} /></label><br />
      <label>案件名: <input {...register('project_name')} /></label><br />
      <label>契約開始日: <input type="date" {...register('contract_start_date')} /></label><br />
      <label>契約終了日: <input type="date" {...register('contract_end_date')} /></label><br />
      <label>働き方:
        <select {...register('work_style')}>
          <option value="onsite">常駐</option>
          <option value="remote">リモート</option>
          <option value="hybrid">ハイブリッド</option>
        </select>
      </label><br />
      <button type="submit">保存</button>
    </form>
  );
};

export default ContractForm;