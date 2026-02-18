import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Input, Alert, Card } from '../../components/ui';
import { LoadingSpinner } from '../../components/feedback';
import { useFetchTemplates } from '../../features/templates/hooks/use-fetch-templates';
import { useCarForm, useCreateCar } from '../../features/cars/hooks';
import { MaintenanceItemSelector, MaintenanceItemForm } from '../../features/cars/components';

const AddCarPage: React.FC = () => {
  const navigate = useNavigate();
  const { templates, isLoading, error: fetchError } = useFetchTemplates();
  const [nonArchivedTemplates, setNonArchivedTemplates] = useState<typeof templates>([]);

  const {
    formData,
    errors,
    handleNameChange,
    handleCurrentKmChange,
    toggleTemplate,
    updateMaintenanceItem,
    validateForm,
    convertToDto,
    setErrors,
  } = useCarForm();

  const {
    submitCar,
    isSubmitting,
    showSuccess,
    serverError,
  } = useCreateCar({
    onSuccess: () => {
      navigate('/cars');
    },
    onValidationError: setErrors,
  });

  useEffect(() => {
    setNonArchivedTemplates(templates.filter(t => !t.archived));
  }, [templates]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const dto = convertToDto();
      await submitCar(dto);
    }
  };

  const handleCancel = () => {
    navigate('/cars');
  };

  const selectedTemplateIds = new Set(formData.selectedTemplates.keys());
  const selectedItems = Array.from(formData.selectedTemplates.values());

  if (isLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCancel}
            className="mb-4"
          >
            ← Back to Cars
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Alert variant="success" className="mb-6">
            Car created successfully
          </Alert>
        )}

        {/* Server Error */}
        {serverError && (
          <Alert variant="error" className="mb-6">
            {serverError}
          </Alert>
        )}

        {/* Fetch Error */}
        {fetchError && (
          <Alert variant="error" className="mb-6">
            Failed to load maintenance templates. Please refresh the page.
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Car Details */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Car Details</h2>
            <div className="space-y-6">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                error={errors.name}
                disabled={isSubmitting}
                placeholder="Enter car name"
                autoFocus
              />

              <Input
                label="Current Mileage (km)"
                type="number"
                min="0"
                value={formData.currentKm || ''}
                onChange={(e) => handleCurrentKmChange(parseInt(e.target.value) || 0)}
                error={errors.currentKm}
                disabled={isSubmitting}
                placeholder="Enter current mileage"
              />
            </div>
          </Card>

          {/* Step 2: Assign Maintenance Items */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Assign Maintenance Items
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Select maintenance templates to track for this car. You can customize intervals and add last service information.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Available Templates
                </h3>
                <MaintenanceItemSelector
                  templates={nonArchivedTemplates}
                  selectedTemplateIds={selectedTemplateIds}
                  onToggle={toggleTemplate}
                  disabled={isSubmitting}
                />
              </div>

              {selectedItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Configure Selected Items ({selectedItems.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedItems.map((item) => (
                      <MaintenanceItemForm
                        key={item.template.id}
                        item={item}
                        errors={errors.maintenanceItems?.get(item.template.id)}
                        onUpdate={(field, value) =>
                          updateMaintenanceItem(item.template.id, field, value)
                        }
                        disabled={isSubmitting}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : 'Save Car'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddCarPage;
