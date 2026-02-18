import React from 'react';
import { Modal, Input, DateInput, Button, Alert } from '../../../components/ui';
import { formatDate } from '../../../utils/format-date';
import { formatNumber } from '../../../utils/format-number';
import type { CarMaintenanceItem } from '../../../types/car';

interface TrackChangeModalProps {
  isOpen: boolean;
  item: CarMaintenanceItem;
  kmValue: string;
  dateValue: string;
  isLoading: boolean;
  error: string | null;
  onKmChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

export const TrackChangeModal: React.FC<TrackChangeModalProps> = ({
  isOpen,
  item,
  kmValue,
  dateValue,
  isLoading,
  error,
  onKmChange,
  onDateChange,
  onSubmit,
  onCancel,
}) => {
  const intervalLabel = item.intervalType === 'km' ? 'km' : 'days';
  
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={`Track Maintenance: ${item.maintenanceTemplateName}`} maxWidth="lg">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        {/* Maintenance Item Details */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Template:</span>
            <span className="text-sm text-gray-900 font-semibold">{item.maintenanceTemplateName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Interval:</span>
            <span className="text-sm text-gray-900">
              Every {formatNumber(item.intervalValue)} {intervalLabel}
            </span>
          </div>
          {item.intervalType === 'km' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Last Service:</span>
                <span className="text-sm text-gray-900">
                  {item.lastServiceKm !== undefined ? `${formatNumber(item.lastServiceKm)} km` : 'Not recorded'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Next Due:</span>
                <span className="text-sm text-gray-900">
                  {item.calculatedNextKm !== undefined ? `${formatNumber(item.calculatedNextKm)} km` : 'N/A'}
                </span>
              </div>
            </>
          )}
          {item.intervalType === 'time' && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Last Service:</span>
                <span className="text-sm text-gray-900">
                  {item.lastServiceDate ? formatDate(item.lastServiceDate) : 'Not recorded'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Next Due:</span>
                <span className="text-sm text-gray-900">
                  {item.calculatedNextDate ? formatDate(item.calculatedNextDate) : 'N/A'}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Input Field - Conditional based on interval type */}
        {item.intervalType === 'km' && (
          <Input
            label="Service Km"
            type="number"
            value={kmValue}
            onChange={(e) => onKmChange(e.target.value)}
            placeholder="Enter km"
            disabled={isLoading}
          />
        )}

        {item.intervalType === 'time' && (
          <DateInput
            label="Service Date"
            value={dateValue}
            onChange={onDateChange}
            placeholder="dd/mm/yyyy"
            disabled={isLoading}
          />
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
