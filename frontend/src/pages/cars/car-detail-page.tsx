import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from '../../components/ui';
import { LoadingSpinner, EmptyState } from '../../components/feedback';
import { MaintenanceItemCard, TrackChangeModal } from '../../features/cars/components';
import { useTrackChange } from '../../features/cars/hooks';
import { getCarById } from '../../features/cars/api/cars-api';
import { formatNumber } from '../../utils/format-number';
import { ApiError } from '../../services/api-client';
import type { Car, CarMaintenanceItem } from '../../types/car';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CarMaintenanceItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCarData = async () => {
    if (!id) {
      setError('Invalid car ID');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const carData = await getCarById(parseInt(id, 10));
      setCar(carData);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 404) {
          setError('Car not found');
        } else {
          setError('Failed to load car details');
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const handleTrackChangeSuccess = async () => {
    setSuccessMessage('Maintenance tracked successfully');
    
    // Refresh car data
    await fetchCarData();
  };

  const trackChangeHook = useTrackChange({
    item: selectedItem,
    currentKm: car?.currentKm || 0,
    onSuccess: handleTrackChangeSuccess,
  });

  // Auto-dismiss success message after 3 seconds with cleanup
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  // Open modal when selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      trackChangeHook.openModal();
    }
  }, [selectedItem]);

  const handleOpenModal = (item: CarMaintenanceItem) => {
    setSelectedItem(item);
  };

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  if (error || !car) {
    return (
      <Container>
        <div className="max-w-7xl mx-auto py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error || 'Car not found'}</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/cars')}>
            Back to Cars
          </Button>
        </div>
      </Container>
    );
  }

  // Destructure car properties for cleaner JSX
  const { maintenanceItems = [], name, currentKm } = car;

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/cars')}
            className="mb-4"
          >
            ← Back to Cars
          </Button>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-lg text-gray-600 mt-2">
                Current Mileage: <span className="font-semibold text-gray-900">{formatNumber(currentKm)} km</span>
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert variant="success" className="mb-6">
            {successMessage}
          </Alert>
        )}

        {/* Maintenance Items Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Maintenance Items ({maintenanceItems.length})
          </h2>
        </div>

        {/* Empty State */}
        {maintenanceItems.length === 0 && (
          <EmptyState message="No maintenance items assigned to this car." />
        )}

        {/* Maintenance Items Grid */}
        {maintenanceItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceItems.map((item) => (
              <MaintenanceItemCard
                key={item.id}
                item={item}
                onTrackChange={() => handleOpenModal(item)}
              />
            ))}
          </div>
        )}

        {/* Track Change Modal */}
        {selectedItem && (
          <TrackChangeModal
            isOpen={trackChangeHook.isOpen}
            item={selectedItem}
            kmValue={trackChangeHook.kmValue}
            dateValue={trackChangeHook.dateValue}
            isLoading={trackChangeHook.isLoading}
            error={trackChangeHook.error}
            onKmChange={trackChangeHook.setKmValue}
            onDateChange={trackChangeHook.setDateValue}
            onSubmit={trackChangeHook.handleSubmit}
            onCancel={trackChangeHook.closeModal}
          />
        )}
      </div>
    </Container>
  );
};

export default CarDetailPage;
