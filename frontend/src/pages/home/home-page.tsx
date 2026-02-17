import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Car Maintenance Tracker
        </h1>
        <p className="text-gray-600">
          Frontend is running successfully
        </p>
        <Link to="/setup">
          <Button size="lg">Go to Setup</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
