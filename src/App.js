import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import ItemDetailPage from './pages/ItemDetailPage';
import UserDashboardPage from './pages/UserDashboardPage';
import ReportLossPage from './pages/ReportLossPage';
import Header from './components/Header';
import ClaimedItemsPage from './pages/ClaimedItemsPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/report" element={<ReportLossPage />} /> {/* Rute baru untuk ReportLossPage */}
          <Route path="/claimed" element={<ClaimedItemsPage />} />
          {/* Feel free to add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
