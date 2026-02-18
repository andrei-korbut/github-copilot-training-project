import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Card } from '../../components/ui';

const CarsListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cars</h1>
          <Button
            variant="primary"
            onClick={() => navigate('/cars/new')}
          >
            + Add Car
          </Button>
        </div>

        <Card className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Cars List Page</p>
          <p className="text-sm text-gray-400">
            This is a placeholder page. Full implementation coming in Task #05.
          </p>
        </Card>
      </div>
    </Container>
  );
};

export default CarsListPage;
