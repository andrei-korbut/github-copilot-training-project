import React, { useState } from 'react';
import { Container, Card, Button } from '../../components/ui';
import AddTemplateForm from './components/add-template-form';

const SetupPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
    // Future: refresh templates list
  };

  const handleAddCancel = () => {
    setShowAddForm(false);
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

          {/* Content */}
          <Card padding="lg">
            <p className="text-gray-600 text-center">
              No maintenance templates available.
            </p>
            <p className="text-gray-500 text-center mt-2 text-sm">
              (Template list will be implemented in Task 01)
            </p>
          </Card>
        </div>
      </Container>

      {showAddForm && (
        <AddTemplateForm onSuccess={handleAddSuccess} onCancel={handleAddCancel} />
      )}
    </div>
  );
};

export default SetupPage;
