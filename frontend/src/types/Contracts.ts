// /frontend/src/types/Contract.ts

export interface ContractManager {
  id: number;
  name: string;
  email: string;
}

export interface Contract {
  id: number;
  employee_name: string;
  work_style: 'remote' | 'onsite' | 'hybrid';
  contract_start_date: string;
  contract_end_date: string;
  project_name: string;
  client_company: string;
  client_address: string;
  unit_price: number;
  overtime_unit_price: number;
  deduction_unit_price: number;
  working_hours_min: number;
  working_hours_max: number;
  payment_site_days: number;
  created_at: string;
  updated_at: string;
  managers: ContractManager[];
}