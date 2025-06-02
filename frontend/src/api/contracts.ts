// /frontend/src/api/contracts.ts
import axios from 'axios';
import type { Contract } from '@features/contracts/types';
const BASE_URL = 'http://localhost:8000/api/contracts/';

export const fetchContracts = async (): Promise<Contract[]> => {
  const res = await axios.get<Contract[]>(BASE_URL);
  return res.data;
};

export const updateContract = async (id: number, data: Contract): Promise<Contract> => {
  const res = await axios.put<Contract>(`${BASE_URL}${id}/`, data);
  return res.data;
};

export const createContract = async (data: Contract): Promise<Contract> => {
  const res = await axios.post<Contract>(BASE_URL, data);
  return res.data;
};

export const deleteContract = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${id}/`);
};