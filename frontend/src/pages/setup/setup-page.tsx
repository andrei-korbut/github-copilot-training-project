import React, { useState } from 'react';
import { Container, Button, Alert } from '../../components/ui';
import { LoadingSpinner, EmptyState } from '../../components/feedback';
import { TemplateList } from '../../features/templates/components/template-list';
import { useFetchTemplates } from '../../features/templates/hooks/use-fetch-templates';
import AddTemplateForm from './components/add-template-form';

const SetupPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { templates, isLoading, error, refetch } = useFetchTemplates();

  const handleAddSuccess = async () => {
    setShowAddForm(false);
    await refetch();
  };

  const handleAddCancel = () => {
    setShowAddForm(false);
  };

  const handleEdit = (id: number) => {
    // Placeholder for Task 03 - Edit Template
    console.log('Edit template:', id);
  };

  const handleArchive = (id: number) => {
    // Placeholder for Task 04 - Archive Template
    console.log('Archive template:', id);
  };

  const handleRestore = (id: number) => {
    // Placeholder for Task 04 - Restore Template
    console.log('Restore template:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="xl" className="py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Maintenance Templates</h1>
            <Button onClick={() => setShowAddForm(true)}>
              Add Template
            </Button>
          </div>

          {/* Error Notification */}
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && templates.length === 0 && (
            <EmptyState message="No maintenance templates available." />
          )}

          {/* Templates List */}
          {!isLoading && !error && templates.length > 0 && (
            <TemplateList
              templates={templates}
              onEdit={handleEdit}
              onArchive={handleArchive}
              onRestore={handleRestore}
            />
          )}
        </div>
      </Container>

      {showAddForm && (
        <AddTemplateForm onSuccess={handleAddSuccess} onCancel={handleAddCancel} />
      )}
    </div>
  );
};

export default SetupPage;
