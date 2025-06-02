import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContractsPage from '../features/contracts/ContractsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/contracts" element={<ContractsPage />} />
        {/* 他のルートもここに追加できます */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;