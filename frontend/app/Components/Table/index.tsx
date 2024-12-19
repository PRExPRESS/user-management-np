import React, { useState, useMemo, useEffect } from 'react';
import { PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface TableColumn {
  header: string;
  key: string;
  render?: (value: any) => React.ReactNode;
  onClick?: (value: any) => void;
  sortType?: 'string' | 'number';
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  onUpdate ?: (value: any) => void,
  onDelete ?: (value: any) => void
}

const Table: React.FC<TableProps> = ({ columns, data, className = '', onUpdate, onDelete }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' | null }>({
    key: 'id', 
    direction: 'asc',
  });

  console.log('data', data);
  const handleSort = (key: string, sortType: 'string' | 'number' | undefined) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortedArray = [...data];
    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      const sortType = columns.find((column) => column.key === key)?.sortType || 'number';

      sortedArray.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (sortType === 'string') {
          return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (sortType === 'number') {
          return direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }
    return sortedArray;
  }, [data, sortConfig, columns]);

  const getChevronIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 text-accent" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-accent" />
    );
  };

  useEffect(() => {
    handleSort('id', 'number'); 
  }, []);

  //handle update
  const handleUpdate = (value: any) => {
    if (onUpdate) {
      onUpdate(value);
    }
  }

  //handle delete
  const handleDelete = (value: any) => {
    if (onDelete) {
      onDelete(value);
    }
  }

  return (
    <div className={`relative overflow-x-auto overflow-y-auto h-full mt-4 w-full ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th
              scope="col"
              className="px-6 py-3 flex items-start justify-start gap-2 cursor-pointer"
              onClick={() => handleSort('id', 'number')} 
            >
              #
              {getChevronIcon('id')}
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => column.sortType && handleSort(column.key, column.sortType)}
              >
                <div className="flex items-center justify-start gap-2">
                  {column.header}
                  {column.sortType && getChevronIcon(column.key)}
                </div>
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {row.id}
              </th>
              {columns.map((column, colIndex) => {
                const cellValue = row[column.key];
                return (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-text-light dark:text-text-dark border-b dark:border-gray-700"
                  >
                    {column.render ? column.render(cellValue) : cellValue}
                  </td>
                );
              })}
              <td className="px-4 py-2 text-sm text-text-dark dark:text-text-light flex">
                <PencilIcon 
                className="w-4 h-4 mt-2 text-text-light dark:text-text-dark cursor-pointer hover:text-accent dark:hover:text-accent" 
                onClick={() => handleUpdate(row)}
                />
                <TrashIcon 
                onClick={() => handleDelete(row)} className="w-4 h-4 mt-2 ml-2 text-text-light dark:text-text-dark cursor-pointer hover:text-red-500 dark:hover:text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
