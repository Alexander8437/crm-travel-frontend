import React from 'react';

const TableComponent = ({ columns, data, isSelectable }) => {
  return (
    // <div className="overflow-x-auto">
    //   <table className="w-full bg-white border border-gray-300">
    //     <thead>
    //       <tr>
    //         {isSelectable && (
    //           <th className="border border-gray-300 p-2 text-white" style={{
    //             background: "linear-gradient(90deg, #0a0e73 0%, #737373 100%)",
    //             textAlign: 'center'
    //           }}>
    //             Select
    //           </th>
    //         )}
    //         {columns.map((column, index) => (
    //           <th key={index} className="border border-gray-300 p-2 text-white" style={{
    //             background: "linear-gradient(90deg, #0a0e73 0%, #737373 100%)",
    //             textAlign: 'center'
    //           }}>
    //             {column}
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {rows.map((row, rowIndex) => (
    //         <tr key={rowIndex}>
    //           {isSelectable && (
    //             <td className="border border-gray-300 p-2 text-center">
    //               <input type="checkbox" />
    //             </td>
    //           )}
    //           {columns.map((column, colIndex) => (
    //             <td key={colIndex} className="border border-gray-300 p-2 text-center">
    //               {typeof row[column] === 'string' || typeof row[column] === 'number'
    //                 ? row[column]
    //                 : React.cloneElement(row[column])
    //               }
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <table className="min-w-full bg-white">
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
