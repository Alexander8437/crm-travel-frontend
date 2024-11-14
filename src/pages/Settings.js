// Settings.js
import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast

const Settings = ({ onClose }) => {
  const [selectedColumns, setSelectedColumns] = useState({
    name: true,
    email: false,
    phone: true,
    role: false,
    status: true,
    action: false,
  });

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const handleSelectAll = () => {
    setSelectedColumns({
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      action: true,
    });
  };

  const handleCancelAll = () => {
    setSelectedColumns({
      name: false,
      email: false,
      phone: false,
      role: false,
      status: false,
      action: false,
    });
  };

  const handleSave = () => {
    console.log("Settings saved:", selectedColumns);
    toast.success("Settings saved successfully!"); // Show success toast
    onClose();
  };

  const handleCancel = () => {
    toast.info("Settings change canceled"); // Show cancel toast
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 z-50 mt-4 sm:mt-8 md:mt-12 w-full md:w-[400px] ${true ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* X button to close the modal */}
      <button
        onClick={onClose}
        className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3 py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700"
      >
        X
      </button>

      <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <h2 className="text-lg font-bold">List Settings</h2>
      </div>

      {/* Wrap the buttons in a div and use flex-col to stack them vertically */}
      <div className="flex flex-col space-y-2 px-4 pb-2 mt-4">
        <div className="flex space-x-4">
          <button className="text-blue-500 border-b-2 border-blue-500 pb-1">
            Columns
          </button>
          <button className="text-gray-500 pb-1">View</button>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4 shadow-sm"></div>

      <div className="px-4">
        <div className="flex justify-between mb-2">
          <button onClick={handleSelectAll} className="text-blue-500">
            Select All
          </button>
          <button onClick={handleCancelAll} className="text-blue-500">
            Cancel All
          </button>
        </div>

        <div className="space-y-2 mb-6">
          {Object.keys(selectedColumns).map((column) => (
            <div key={column} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedColumns[column]}
                onChange={() => handleCheckboxChange(column)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <label className="ml-2 text-gray-700">
                {column.charAt(0).toUpperCase() +
                  column.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom button bar */}
      <div className="fixed left-0 w-full p-3 bg-white shadow-lg flex justify-start space-x-4 bottom-12">
        <button
          type="button"
          className="bg-red-700 text-white px-4 py-2 rounded shadow"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-700 text-white px-4 py-2 rounded shadow"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
