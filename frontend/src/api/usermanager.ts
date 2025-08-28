// frontend/src/api/usermanager.ts
import axios from 'axios';
import type { UserManager } from '../types/usermanager_types';

// APIのベースURL
const BASE_URL = 'http://localhost:8000/api/users/';

// 全ユーザー取得
export async function fetchUsers(): Promise<UserManager[]> {
  const response = await axios.get<UserManager[]>(`${BASE_URL}`);
  return response.data;
}

// ユーザー作成
export async function createUser(data: {
  email: string;
  password: string;
}): Promise<UserManager> {
  const response = await axios.post<UserManager>(`${BASE_URL}`, data);
  return response.data;
}