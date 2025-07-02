// src/layouts/AppLayout.tsx
import React from 'react';
import TopBar from '../components/TopBar';
import styles from '../styles/AppLayout.module.css';

interface AppLayoutProps {
  /** レイアウトの中身（ページごとのコンテンツ） */
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <div className={styles.appContainer}>
    {/* ── ヘッダー */}
    <TopBar />

    {/* ── メインの入れ子 */}
    <div className={styles.contentContainer}>
      {children}
    </div>
  </div>
);

export default AppLayout;