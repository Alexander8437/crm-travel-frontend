import React, { useState } from "react";
import Select, { components } from 'react-select';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";



const NewPackageForm = ({ isOpen, onClose }) => {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [selectedItineraries, setSelectedItineraries] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    console.log(ranges); // Check the selected date ranges in the console
    setState([ranges.selection]);
  };

  const [formData, setFormData] = useState({
    packageTitle: '',
    packageCode: '',
    noOfDays: '',
    noOfNights: '',
    packageType: '',
    Description: '',
  });

  // Sample destinations for testing
  const destinations = [
    { value: '1', label: 'Paris' },
    { value: '2', label: 'New York' },
    { value: '3', label: 'Tokyo' },
    { value: '4', label: 'London' },
    { value: '5', label: 'Sydney' }
  ];

  const itineraries = [
    { value: '1', label: 'Day 1: Paris' },
    { value: '2', label: 'Day 2: New York' },
    { value: '3', label: 'Day 3: Tokyo' },
    { value: '4', label: 'Day 4: London' },
    { value: '5', label: 'Day 5: Sydney' }
  ];

  const inclusions = [
    { value: '1', label: 'Inclusion 1' },
    { value: '2', label: 'Inclusion 2' },
    { value: '3', label: 'Inclusion 3' },
    { value: '4', label: 'Inclusion 4' },
    { value: '5', label: 'Inclusion 5' },
  ];

  const exclusions = [
    { value: '1', label: 'Exclusion 1' },
    { value: '2', label: 'Exclusion 2' },
    { value: '3', label: 'Exclusion 3' },
    { value: '4', label: 'Exclusion 4' },
    { value: '5', label: 'Exclusion 5' },
  ]

  // Custom Option Component
  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 10 }}
        />
        {props.label}
      </components.Option>
    );
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleChange = (selectedOptions) => {
    setSelectedDestinations(selectedOptions);
  };

  const handleItineraryChange = (selectedOptions) => {
    setSelectedItineraries(selectedOptions);
  };

  const handleInclusionChange = (selectedOptions) => {
    setSelectedInclusions(selectedOptions);
  };

  const handleExclusionChange = (selectedOptions) => {
    setSelectedExclusions(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedDestinations.map(option => option.label).join(', ');
  };


  return (
    <div className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"} mt-4 sm:mt-8 md:mt-12 lg:w-[800px] sm:w-[400px] md:w-[500px] z-50`}>
      <button onClick={onClose} className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3  py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700">X</button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Package</h2>
      </div>
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 overflow-y-auto h-[calc(100vh-160px)]" onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">Basic Package Details</h3>
        </div>
        <div className="flex gap-2 w-full">

          <div className="mb-4 w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">Destinations</label>
            <Select
              className="mt-1 w-full border h-full rounded"
              value={selectedDestinations}
              onChange={handleChange}
              options={destinations}
              isMulti
              components={{ Option: CustomOption }}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isClearable={true}
            />
          </div>
          <div className="mb-4 w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">Package Title</label>
            <input
              type="text"
              id="packageName"
              name="packageTitle"
              value={formData.packageTitle}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter Package Title..."
            />

          </div>
        </div>
        <div className="flex justify-between mb-4 w-full gap-2">
          {/* <div className="w-1/3">
            <label htmlFor="destinations" className="block text-sm font-medium">Package Code</label>
            <input
              type="text"
              id="packageCode"
              name="packageCode"
              value={formData.packageCode}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter Package Code..."
            />
          </div> */}
          <div className="w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">No of Days</label>
            <input
              type="number"
              id="noOfDays"
              name="noOfDays"
              value={formData.noOfDays}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Days"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">No of Nights</label>
            <input
              type="number"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
              ],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
        <div className="mb-4">
          <h3 className="bg-red-700 text-white p-2 rounded">Itinerary</h3>
        </div>
        <div className="mb-6">
          <label htmlFor="destinations" className="block text-sm font-medium">Itineraries</label>
          <Select
            className="mt-1 w-full border rounded"
            value={selectedItineraries}
            onChange={handleItineraryChange}
            options={itineraries}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          />
        </div>

        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">Inclusions/Exclusions</h3>
        </div>
        <div className="mb-4">
          <label htmlFor="destinations" className="block text-sm font-medium">Whats included</label>
          <Select
            className="mt-1 w-full border rounded"
            value={selectedInclusions}
            onChange={handleInclusionChange}
            options={inclusions}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="destinations" className="block text-sm font-medium">Whats Excluded</label>
          <Select
            className="mt-1 w-full border rounded"
            value={selectedExclusions}
            onChange={handleExclusionChange}
            options={exclusions}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          />
        </div>
        <div className="mb-4">
          <h3 className="bg-red-700 text-white p-2 rounded">Discount</h3>
        </div>
        <div className="mb-4">
          <label htmlFor="destinations" className="block text-sm font-medium">Value</label>
          <input
            type="text"
            id="noOfNights"
            name="noOfNights"
            value={formData.noOfNights}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="No of Nights"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destinations" className="block text-sm font-medium">Conditions</label>
          <input
            type="text"
            id="noOfNights"
            name="noOfNights"
            value={formData.noOfNights}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
            placeholder="No of Nights"
          />
        </div>
        <div className="flex justify-between mb-6 gap-2">
          <div className="w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">Valid From</label>
            <input
              type="date"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">Valid Till</label>
            <input
              type="date"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="bg-red-700 text-white p-2 rounded">Package Price</h3>
        </div>
        <div className="flex justify-between gap-2 mb-4">
          <div className="w-1/3">
            <label htmlFor="destinations" className="block text-sm font-medium">Actual Price</label>
            <input
              type="text"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="destinations" className="block text-sm font-medium">GST</label>
            <input
              type="text"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="destinations" className="block text-sm font-medium">Total Price</label>
            <input
              type="text"
              id="noOfNights"
              name="noOfNights"
              value={formData.noOfNights}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              placeholder="No of Nights"
            />
          </div>
        </div>
        <div className="flex items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12 left-0 right-0">
          <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded shadow mr-1">Submit</button>
          <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default NewPackageForm;
