import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Hotel = ({ isOpen, onClose }) => {
  const [country, setCountry] = useState("Select");
  const [state, setState] = useState("Select");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [inputKeyValue, setInputKeyValue] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [editorData, setEditorData] = useState('');


  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleInputKeyChange = (e) => {
    setInputKeyValue(e.target.value);
  };

  // Handle input on key down (Enter or Comma)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputKeyValue.trim()) {
        const newTags = inputKeyValue
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "");
        setTags([...tags, ...newTags]);
        setInputKeyValue("");
      }
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleReset = () => {
    setCountry("Select");
    setState("Select");
    setDestination("");
    setDescription("");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"
        } mt-4 sm:mt-8 md:mt-12 lg:w-[800px] sm:w-[400px] md:w-[500px]`}
    >
      {/* "X" button positioned outside the form box */}
      <button
        onClick={onClose}
        className="absolute top-[12px] left-[-22px]  text-gray-500 bg-gray-200 square w-10 h-10 py-auto rounded-full border border-1 border-gray-500 hover:border-gray-900 hover:text-gray-900"
      >
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Hotels</h2>
      </div>
      {/* Line below the title with shadow */}
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 overflow-y-auto h-[calc(100vh-160px)]"> {/* [calc(100vh-160px)] */}
        <div className="mb-4">
          <h3 className="bg-red-500 text-white p-2 rounded">
            Basic Information
          </h3>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Country Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              State Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Destination Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-2/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Hotels Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Star Ratings
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          {/* <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded h-36 resize-none" // Increased height
              placeholder="Enter a brief description"
            /> */}
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={{
              toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />

        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Contact Person Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Contact Person Number
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Hotel Email
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Hotel Address
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Hotel Pincode
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/2 ">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select id="status" className="mt-1 p-2 w-full border rounded">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="w-1/2">
            <label htmlFor="image" className="block text-sm font-medium">
              Image
            </label>
            <input
              type="file"
              className="w-full text-gray-700 mt-1 p-[4.5px] bg-white rounded border border-gray-200"
            />
          </div>
        </div>
        <div className="flex justify-start space-x-4 mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Save
          </button>
          <button
            type="button"
            // onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Next
          </button>
        </div>
        <div className="mb-6">
          <h3 className="bg-red-500 text-white p-2 rounded">
            Add Room Details
          </h3>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium">
              Room Type Name
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            >
              <option>Single</option>
              <option>Double</option>
              <option>Triple</option>
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Bed Size
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Max Person
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
            />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label htmlFor="status" className="block text-sm font-medium">
              Room Status
            </label>
            <select id="status" className="mt-1 p-2 w-full border rounded">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="w-1/2">
            <label htmlFor="image" className="block text-sm font-medium">
              Room Image
            </label>
            <input
              type="file"
              className="w-full text-gray-700 mt-1 p-[4.5px] bg-white rounded border border-gray-200"
            />
          </div>
        </div>
      </form>

      {/* Line with shadow above the buttons */}
      <div className="flex justify-between items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12 left-0 right-0">
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Submit
          </button>
          <button
            type="button"
            // onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hotel