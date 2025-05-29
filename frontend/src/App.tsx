// /frontend/src/App.tsx
import React from 'react';
import ContractList from './pages/ContractList';

const App: React.FC = () => {
  return (
    <div>
      <h1>契約一覧</h1>
      <ContractList />
    </div>
  );
};

export default App;