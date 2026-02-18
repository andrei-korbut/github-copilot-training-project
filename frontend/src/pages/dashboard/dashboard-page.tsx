import React, { useState, useEffect } from 'react';
import { Container, Alert } from '../../components/ui';
import { LoadingSpinner, EmptyState } from '../../components/feedback';
import { useFetchCars } from '../../features/cars/hooks';
import { useFetchDashboard, useCarSelector } from '../../features/dashboard/hooks';
import {
  CarSelector,
  DashboardHeader,
  MaintenanceGroup,
} from '../../features/dashboard/components';
import type { DashboardMaintenanceItem } from '../../types/dashboard';

const DashboardPage: React.FC = () => {
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // Fetch all cars for dropdown
  const { cars, isLoading: isLoadingCars, error: carsError } = useFetchCars();

  // Manage car selection
  const { selectedCarId, setSelectedCarId } = useCarSelector(cars);

  // Fetch dashboard data for selected car
  const { dashboard, isLoading: isLoadingDashboard, error: dashboardError, refetch } = useFetchDashboard(selectedCarId);

  // Auto-dismiss success notification after 3 seconds
  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification]);

  const handleMileageUpdated = () => {
    setShowSuccessNotification(true);
    refetch();
  };

  // Group maintenance items by status
  const overdueItems: DashboardMaintenanceItem[] = dashboard?.maintenanceItems.filter(
    (item) => item.status === 'Overdue'
  ) ?? [];

  const dueSoonItems: DashboardMaintenanceItem[] = dashboard?.maintenanceItems.filter(
    (item) => item.status === 'DueSoon'
  ) ?? [];

  const okItems: DashboardMaintenanceItem[] = dashboard?.maintenanceItems.filter(
    (item) => item.status === 'OK'
  ) ?? [];

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Loading State - Cars */}
        {isLoadingCars && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error State - Cars */}
        {carsError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <p className="font-medium">Error loading cars</p>
            <p className="text-sm">{carsError}</p>
          </div>
        )}

        {/* No Cars State */}
        {!isLoadingCars && !carsError && cars.length === 0 && (
          <EmptyState message="No cars available. Add a car first." />
        )}

        {/* Dashboard Content */}
        {!isLoadingCars && !carsError && cars.length > 0 && (
          <>
            {/* Success Notification */}
            {showSuccessNotification && (
              <Alert variant="success" className="mb-6">
                Mileage updated successfully
              </Alert>
            )}

            {/* Car Selector */}
            <div className="mb-8 max-w-md">
              <CarSelector
                cars={cars}
                selectedCarId={selectedCarId}
                onCarSelect={setSelectedCarId}
                disabled={isLoadingDashboard}
              />
            </div>

            {/* Error State - Dashboard */}
            {dashboardError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                <p className="font-medium">Error loading dashboard data</p>
                <p className="text-sm">{dashboardError}</p>
              </div>
            )}

            {/* Loading State - Dashboard */}
            {isLoadingDashboard && (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {/* Dashboard Data */}
            {!isLoadingDashboard && !dashboardError && dashboard && (
              <>
                {/* Dashboard Header */}
                <DashboardHeader
                  carId={selectedCarId}
                  carName={dashboard.carName}
                  currentKm={dashboard.currentKm}
                  onMileageUpdated={handleMileageUpdated}
                />

                {/* Maintenance Groups */}
                <div className="space-y-6">
                  {/* Overdue Section */}
                  <MaintenanceGroup
                    title="Overdue"
                    items={overdueItems}
                    statusColor="red"
                    emptyMessage="No items in this category"
                  />

                  {/* Due Soon Section */}
                  <MaintenanceGroup
                    title="Due Soon"
                    items={dueSoonItems}
                    statusColor="yellow"
                    emptyMessage="No items in this category"
                  />

                  {/* OK Section */}
                  <MaintenanceGroup
                    title="OK"
                    items={okItems}
                    statusColor="green"
                    emptyMessage="No items in this category"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default DashboardPage;
