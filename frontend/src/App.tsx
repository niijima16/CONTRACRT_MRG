// /src/App.tsx
import React from 'react';
import ContractList from './contracts/ContractList';

const App: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold my-4">契約管理システム</h1>
      <ContractList />
    </div>
  );
};

export default App;