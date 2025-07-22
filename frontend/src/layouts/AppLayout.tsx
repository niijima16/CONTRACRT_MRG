// src/layouts/AppLayout.tsx
import React from 'react';
import TopBar from '../components/TopBar';
import styles from '../styles/AppLayout.module.css';

interface AppLayoutProps {
  /** ページ固有の中身 */
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <div className={styles.appContainer}>
    {/* ── 共通ヘッダー */}
    <TopBar />

    {/* ── ページ固有コンテンツ */}
    <div className={styles.contentContainer}>
      {children}
    </div>
  </div>
);

export default AppLayout;