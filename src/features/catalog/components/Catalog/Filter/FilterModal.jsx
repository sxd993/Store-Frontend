import { memo } from 'react';
import { Modal } from '../../../../../shared/ui/Modal.jsx';
import { UniversalFilter } from './UniversalFilter.jsx';

export const FilterModal = memo(({
  isOpen,
  onClose,
  data,
  filterValues,
  filterSetters,
  onApply,
  onReset,
  isLoading
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        {/* Компактный заголовок */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            <h3 className="text-base font-light text-gray-900">Фильтры</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300 p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Компактные фильтры */}
        <div className="space-y-3">
          <UniversalFilter
            data={data}
            filterValues={filterValues}
            filterSetters={filterSetters}
            onApply={onApply}
            onReset={onReset}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
});