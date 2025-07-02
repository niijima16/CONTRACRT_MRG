// /frontend/src/api/contracts.ts
import axios from 'axios';
import type { Contract } from '../types/contract';

// APIのベースURL
const BASE_URL = 'http://localhost:8000/api/contracts/';

/**
 * 契約情報をすべて取得
 */
export const fetchContracts = async (): Promise<Contract[]> => {
  const response = await axios.get<Contract[]>(BASE_URL);
  return response.data;
};

/**
 * 契約情報を新規作成
 */

export type ContractInput = Omit<Contract, 'id' | 'created_at' | 'updated_at'>;

export const createContract = async (data: ContractInput): Promise<Contract> => {
  const response = await axios.post<Contract>(BASE_URL, data);
  return response.data;
};

/**
 * 契約情報を更新（id指定）
 */
export const updateContract = async (id: number, data: Contract): Promise<Contract> => {
  const response = await axios.put<Contract>(`${BASE_URL}${id}/`, data);
  return response.data;
};

/**
 * 契約情報を削除
 */
export const deleteContract = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${id}/`);
};

