import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from '../../components/ui';
import { LoadingSpinner, EmptyState } from '../../components/feedback';
import { CarList } from '../../features/cars/components';
import { useFetchCars } from '../../features/cars/hooks';

const CarsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { cars, isLoading, error } = useFetchCars();

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cars</h1>
          <Button
            variant="primary"
            onClick={() => navigate('/cars/new')}
          >
            + Add Car
          </Button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p className="font-medium">Error loading cars</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && cars.length === 0 && (
          <EmptyState message="No cars available. Add your first car to get started." />
        )}

        {/* Cars List */}
        {!isLoading && !error && cars.length > 0 && (
          <CarList cars={cars} />
        )}
      </div>
    </Container>
  );
};

export default CarsListPage;
