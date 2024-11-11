import React from 'react';

const TableComponent = ({ columns, data, isSelectable }) => {
  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="py-2 px-4 border-b">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b text-center">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="py-2 px-4">
                {typeof column.render === 'function'
                  ? column.render(row)
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
