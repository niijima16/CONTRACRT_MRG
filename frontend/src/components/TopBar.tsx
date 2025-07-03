import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/TopBar.module.css'

/**
 * ページ上部のグローバルナビゲーション
 */
const TopBar: React.FC = () => (
  <header className={styles.topbar}>
    <nav className={styles.nav}>
      <Link to="/contracts">契約情報</Link>
      <Link to="/invoices">請求書</Link>
      <Link to="/clients">契約先情報</Link>
      <Link to="/sales">売上情報</Link>

    </nav>
  </header>
)

export default TopBar