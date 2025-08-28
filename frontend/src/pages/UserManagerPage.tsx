// frondend/src/pages/UserManagerPage.tsx
import React, { useEffect, useState } from 'react';
import UserList from '../app_usermanager/UserList';
import UserForm from '../app_usermanager/UserForm';
import type { UserManager } from '../types/usermanager_types';
import { fetchUsers, createUser } from '../api/usermanager';
import pageStyles from '../styles/UserManagerPage.module.css'; 

/**
 * ユーザー管理画面のメインコンポーネント
 */
const UserManagerPage: React.FC = () => {
    // ── State 定義 ───────────────────────────────────
    const [users, setUsers] = useState<UserManager[]>([]); // ユーザー一覧
    const [selectedUser, setSelectedUser] = useState<UserManager | null>(null); // 選択中のユーザー

    // ── API 呼び出し ─────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };
        fetchData();
    }, []);

    // ── ユーザー作成ハンドラ ──────────────────────────
    const handleCreateUser = async (userData: { email: string; password: string }) => {
        const newUser = await createUser(userData);
        setUsers([...users, newUser]);
    };

    return (
        <div className={pageStyles.container}>
            <div className={pageStyles.leftPanel}>
                <UserList users={users} onSelectUser={setSelectedUser} />
            </div>
            <div className={pageStyles.rightPanel}>
                <UserForm
                    selectedUser={selectedUser}
                    onCreateUser={handleCreateUser}
                />
            </div>
        </div>
    );
}