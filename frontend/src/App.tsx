// /src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ContractsPage from './pages/ContractsPage';
import InvoicesPage from './pages/InvoicesPage';
// 他のページが増えたらここにインポートして追加できます
// import ClientsPage from './pages/ClientsPage';
// import SalesPage   from './pages/SalesPage';

const App: React.FC = () => (
  <BrowserRouter>
    <AppLayout>
      <Routes>
        {/* ルートアクセス時は /contracts にリダイレクト */}
        <Route path="/" element={<Navigate to="/contracts" replace />} />

        {/* 契約管理ページ */}
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />

        {/* 他アプリを追加するならここにルートを増やします */}
        {/* <Route path="/clients"   element={<ClientsPage />} /> */}
        {/* <Route path="/sales"     element={<SalesPage />} /> */}

        {/* 存在しないパスはトップへ */}
        <Route path="*" element={<Navigate to="/contracts" replace />} />
      </Routes>
    </AppLayout>
  </BrowserRouter>
);

export default App;