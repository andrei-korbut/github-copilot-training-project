import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/home-page';
import SetupPage from '../pages/setup/setup-page';
import CarsListPage from '../pages/cars/cars-list-page';
import AddCarPage from '../pages/cars/add-car-page';
import CarDetailPage from '../pages/cars/car-detail-page';
import DashboardPage from '../pages/dashboard/dashboard-page';
import NotFoundPage from '../pages/not-found/not-found-page';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/cars" element={<CarsListPage />} />
      <Route path="/cars/new" element={<AddCarPage />} />
      <Route path="/cars/:id" element={<CarDetailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
