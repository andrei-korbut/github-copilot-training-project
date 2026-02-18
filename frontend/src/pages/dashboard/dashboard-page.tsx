import React from 'react';
import { Container } from '../../components/ui';
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
  // Fetch all cars for dropdown
  const { cars, isLoading: isLoadingCars, error: carsError } = useFetchCars();

  // Manage car selection
  const { selectedCarId, setSelectedCarId } = useCarSelector(cars);

  // Fetch dashboard data for selected car
  const { dashboard, isLoading: isLoadingDashboard, error: dashboardError } = useFetchDashboard(selectedCarId);

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
                  carName={dashboard.carName}
                  currentKm={dashboard.currentKm}
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
