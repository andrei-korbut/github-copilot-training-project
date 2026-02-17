import React from 'react';
import { Modal, Input, Select, Button, Alert } from '../../../components/ui';
import { useTemplateForm, useCreateTemplate } from '../hooks';

interface AddTemplateFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddTemplateForm: React.FC<AddTemplateFormProps> = ({ onSuccess, onCancel }) => {
  const {
    formData,
    errors,
    validateForm,
    handleInputChange,
    resetForm,
    setErrors,
    getIntervalValueLabel,
  } = useTemplateForm();

  const {
    createTemplate,
    isSubmitting,
    showSuccess,
    serverError,
    clearServerError,
  } = useCreateTemplate({
    onSuccess,
    onValidationError: setErrors,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await createTemplate(formData);
    }
  };

  const handleCancel = () => {
    resetForm();
    clearServerError();
    onCancel();
  };

  return (
    <Modal isOpen={true} onClose={handleCancel} title="Add Maintenance Template">
      {showSuccess && (
        <Alert variant="success">Template created successfully</Alert>
      )}
      
      {serverError && (
        <Alert variant="error">{serverError}</Alert>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          disabled={isSubmitting}
          autoFocus
        />

        <Select
          label="Interval Type"
          value={formData.intervalType}
          onChange={(e) => handleInputChange('intervalType', e.target.value)}
          error={errors.intervalType}
          disabled={isSubmitting}
        >
          <option value="">Select interval type</option>
          <option value="km">Kilometers</option>
          <option value="time">Time</option>
        </Select>

        <Input
          label={`Interval Value ${getIntervalValueLabel() ? `(${getIntervalValueLabel()})` : ''}`}
          type="number"
          min="1"
          value={formData.intervalValue || ''}
          onChange={(e) => handleInputChange('intervalValue', parseInt(e.target.value) || 0)}
          error={errors.intervalValue}
          disabled={isSubmitting}
        />

        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTemplateForm;
