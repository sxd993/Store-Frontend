import { memo } from 'react';
import { Modal } from '../../../../shared/components/Modal.jsx';
import { UniversalFilter } from './UniversalFilter.jsx';

export const MobileFilter = memo(({   
  data,
  filterValues,
  filterSetters,
  onApply,
  onReset,
  isOpen,
  onClose,
  isLoading
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 max-h-[90vh] overflow-y-auto max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-light text-gray-900">Фильтры</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <UniversalFilter
          data={data}
          filterValues={filterValues}
          filterSetters={filterSetters}
          onApply={onApply}
          onReset={onReset}
          isLoading={isLoading}
          className="space-y-6"
        />
      </div>
    </Modal>
  );
});