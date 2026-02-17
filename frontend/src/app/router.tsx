import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/home-page';
import SetupPage from '../pages/setup/setup-page';
import NotFoundPage from '../pages/not-found/not-found-page';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
