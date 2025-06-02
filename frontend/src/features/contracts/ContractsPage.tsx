import { useEffect, useState } from 'react';
import ContractList from './ContractList';
import ContractForm from './ContractForm';
import type { Contract } from './types';
import { fetchContracts, deleteContract } from '../../api/contracts';

const ContractsPage = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const loadContracts = async () => {
    const data = await fetchContracts();
    setContracts(data);
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleEdit = (contract: Contract) => {
    setSelectedContract(contract);
  };

  const handleCreate = () => {
    setSelectedContract({
      employee_name: '',
      work_style: 'remote',
      contract_start_date: '',
      contract_end_date: '',
      project_name: '',
      client_company: '',
      client_address: '',
      unit_price: 0,
      overtime_unit_price: 0,
      deduction_unit_price: 0,
      working_hours_min: 0,
      working_hours_max: 0,
      payment_site_days: 0,
      managers: [],
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm('本当に削除しますか？')) {
      await deleteContract(id);
      loadContracts();
    }
  };

  const handleFormClose = () => {
    setSelectedContract(null);
    loadContracts();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">契約一覧</h1>
      <ContractList
        contracts={contracts}
        onEdit={handleEdit}
        onCreate={handleCreate}
        onDelete={handleDelete}
      />
      {selectedContract && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">契約フォーム</h2>
          <ContractForm contract={selectedContract} onClose={handleFormClose} />
        </div>
      )}
    </div>
  );
};

export default ContractsPage;