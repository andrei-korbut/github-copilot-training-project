import React from 'react';
import { formatNumber } from '../../../utils/format-number';
import { useUpdateMileage } from '../hooks';

interface DashboardHeaderProps {
  carId: number | null;
  carName: string;
  currentKm: number;
  onMileageUpdated: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  carId,
  carName,
  currentKm,
  onMileageUpdated,
}) => {
  const {
    isEditing,
    editValue,
    isLoading,
    error,
    startEditing,
    cancelEditing,
    handleInputChange,
    handleSave,
    handleKeyDown,
  } = useUpdateMileage(carId, currentKm, onMileageUpdated);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{carName}</h2>
      
      {!isEditing ? (
        // Display Mode
        <div className="flex items-center gap-3">
          <p className="text-lg text-gray-600">
            Current Mileage:{' '}
            <span className="font-semibold text-gray-900">
              {formatNumber(currentKm)} km
            </span>
          </p>
          <button
            onClick={startEditing}
            className="text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
            title="Edit mileage"
            aria-label="Edit mileage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      ) : (
        // Edit Mode
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Mileage (km)
          </label>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={editValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                placeholder="Enter mileage"
                autoFocus
                min="0"
                step="1"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <div className="flex gap-2">
              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                title="Save"
                aria-label="Save mileage"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* Cancel Button */}
              <button
                onClick={cancelEditing}
                disabled={isLoading}
                className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                title="Cancel"
                aria-label="Cancel editing"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Press Enter to save, Esc to cancel
          </p>
        </div>
      )}
    </div>
  );
};

