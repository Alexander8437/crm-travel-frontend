import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";

const Hotel = ({ isOpen, onClose }) => {
  const [country, setCountry] = useState("Select");
  const [state, setState] = useState("Select");
  const [destination, setDestination] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [starRating, setStarRating] = useState(null);
  const [editorData, setEditorData] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelPincode, setHotelPincode] = useState("");
  const [status, setStatus] = useState("Active");
  const [roomTypeName, setRoomTypeName] = useState("Single");
  const [bedSize, setBedSize] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [roomStatus, setRoomStatus] = useState("Active");
  const [offSeasonPrice, setOffSeasonPrice] = useState("");
  const [extraBedPrice, setExtraBedPrice] = useState("");
  const [directHotelPrice, setDirectHotelPrice] = useState("");
  const [thirdPartyPrice, setThirdPartyPrice] = useState("");

  // Track the current page
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleReset = () => {
    // Reset all states to initial values
    setCountry("Select");
    setState("Select");
    setDestination("");
    setHotelName("");
    setStarRating(null);
    setEditorData("");
    setContactPersonName("");
    setContactPersonNumber("");
    setContactEmail("");
    setHotelAddress("");
    setHotelPincode("");
    setStatus("Active");
    setRoomTypeName("Single");
    setBedSize("");
    setMaxPerson("");
    setRoomStatus("Active");
    setOffSeasonPrice("");
    setExtraBedPrice("");
    setDirectHotelPrice("");
    setThirdPartyPrice("");
    setCurrentPage(0);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log({
      country,
      state,
      destination,
      hotelName,
      starRating,
      editorData,
      contactPersonName,
      contactPersonNumber,
      contactEmail,
      hotelAddress,
      hotelPincode,
      status,
      roomTypeName,
      bedSize,
      maxPerson,
      roomStatus,
      offSeasonPrice,
      extraBedPrice,
      directHotelPrice,
      thirdPartyPrice,
    });
    // Reset the form after submission
    handleReset();
    onClose();
  };

  const pages = [
    // Page 1: Basic Information
    <div key="1" className="p-4">
      <h3 className="bg-red-700 text-white p-2 rounded">Basic Information</h3>
      <div className="flex gap-2 mb-2">
        <div className="w-1/3">
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            Country Name
          </label>
          <Select
            options={[
              { value: "India", label: "India" },
              { value: "Russia", label: "Russia" },
              { value: "USA", label: "USA" },
            ]}
            value={country}
            onChange={setCountry}
            placeholder="Select Country"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State Name
          </label>
          <Select
            options={[
              { value: "Maharashtra", label: "Maharashtra" },
              { value: "California", label: "California" },
              { value: "Moscow", label: "Moscow" },
            ]}
            value={state}
            onChange={setState}
            placeholder="Select State"
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="destination"
            className="block text-sm font-medium mb-1"
          >
            Destination Name
          </label>
          <Select
            options={[
              { value: "Mumbai", label: "Mumbai" },
              { value: "Los Angeles", label: "Los Angeles" },
              { value: "Saint Petersburg", label: "Saint Petersburg" },
            ]}
            value={destination}
            onChange={setDestination}
            placeholder="Select Destination"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        <div className="w-2/3">
          <label htmlFor="hotelName" className="block text-sm font-medium">
            Hotel Name
          </label>
          <input
            type="text"
            id="hotelName"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Hotel Name"
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="starRating"
            className="block text-sm font-medium mb-1"
          >
            Star Ratings
          </label>
          <Select
            options={[
              { value: "1", label: "1 Star" },
              { value: "2", label: "2 Stars" },
              { value: "3", label: "3 Stars" },
              { value: "4", label: "4 Stars" },
              { value: "5", label: "5 Stars" },
            ]}
            value={starRating}
            onChange={setStarRating}
            placeholder="Select Rating"
          />
        </div>
      </div>
      <div className="mb-2">
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
      <div className="flex gap-2 mb-4">
        <div className="w-1/3">
          <label
            htmlFor="contactPersonName"
            className="block text-sm font-medium"
          >
            Contact Person Name
          </label>
          <input
            type="text"
            id="contactPersonName"
            value={contactPersonName}
            onChange={(e) => setContactPersonName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Name"
          />
        </div>
        <div className="w-1/3">
          <label
            htmlFor="contactPersonNumber"
            className="block text-sm font-medium"
          >
            Contact Person Number
          </label>
          <input
            type="text"
            id="contactPersonNumber"
            value={contactPersonNumber}
            onChange={(e) => setContactPersonNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Number"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="contactEmail" className="block text-sm font-medium">
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Email"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label htmlFor="hotelAddress" className="block text-sm font-medium">
            Hotel Address
          </label>
          <input
            type="text"
            id="hotelAddress"
            value={hotelAddress}
            onChange={(e) => setHotelAddress(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Address"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="hotelPincode" className="block text-sm font-medium">
            Hotel Pincode
          </label>
          <input
            type="text"
            id="hotelPincode"
            value={hotelPincode}
            onChange={(e) => setHotelPincode(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Pincode"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <Select
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
            value={status}
            onChange={(e) => setStatus(e.value)}
            placeholder="Select Status"
          />
        </div>
      </div>
    </div>,

    // Page 2: Room Details
    <div key="2" className="p-4">
      <h3 className="bg-red-700 text-white p-2 rounded mb-4">Add Room Details</h3>
      <div className="flex gap-2 mb-4">
        <div className="w-1/3">
          <label htmlFor="roomType" className="block text-sm font-medium mb-2">
            Room Type Name
          </label>
          <Select
            options={[
              { value: "Single", label: "Single" },
              { value: "Double", label: "Double" },
              { value: "Suite", label: "Suite" },
            ]}
            value={roomTypeName}
            onChange={setRoomTypeName}
            placeholder="Select Room Type"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="bedSize" className="block text-sm font-medium mb-1">
            Bed Size
          </label>
          <input
            type="text"
            id="bedSize"
            value={bedSize}
            onChange={(e) => setBedSize(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Bed Size"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="maxPerson" className="block text-sm font-medium mb-1">
            Max Person
          </label>
          <input
            type="number"
            id="maxPerson"
            value={maxPerson}
            onChange={(e) => setMaxPerson(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Max Person"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label htmlFor="roomStatus" className="block text-sm font-medium">
            Room Status
          </label>
          <Select
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
            value={roomStatus}
            onChange={setRoomStatus}
            placeholder="Select Room Status"
          />
        </div>
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
    </div>,

    // Page 3: Price Details
    <div key="3" className="p-4">
      <h3 className="bg-red-700 text-white p-2 rounded mb-4">Add Price Details</h3>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label htmlFor="offSeasonPrice" className="block text-sm font-medium">
            Off-Season Price
          </label>
          <input
            type="number"
            id="offSeasonPrice"
            value={offSeasonPrice}
            onChange={(e) => setOffSeasonPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Price"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="extraBedPrice" className="block text-sm font-medium">
            Extra Bed Price
          </label>
          <input
            type="number"
            id="extraBedPrice"
            value={extraBedPrice}
            onChange={(e) => setExtraBedPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Price"
          />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="w-1/2">
          <label
            htmlFor="directHotelPrice"
            className="block text-sm font-medium"
          >
            Direct Hotel Price
          </label>
          <input
            type="number"
            id="directHotelPrice"
            value={directHotelPrice}
            onChange={(e) => setDirectHotelPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Price"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="thirdPartyPrice"
            className="block text-sm font-medium"
          >
            Third Party Price
          </label>
          <input
            type="number"
            id="thirdPartyPrice"
            value={thirdPartyPrice}
            onChange={(e) => setThirdPartyPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Price"
          />
        </div>
      </div>
    </div>,
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"
        } mt-4 sm:mt-8 md:mt-12 lg:w-[800px] sm:w-[400px] md:w-[500px]`}
    >
      <button
        onClick={onClose}
        className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3  py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700"
      >
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Hotels</h2>
      </div>
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 overflow-y-auto h-[calc(100vh-160px)]">
        {pages[currentPage]}
      </form>

      <div className="flex justify-start items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12 left-0">
        {currentPage > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Back
          </button>
        )}
        {currentPage < pages.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="bg-red-700 text-white px-4 py-2 rounded shadow ml-2"
          >
            Next
          </button>
        )}
        {currentPage === pages.length - 1 && (
          <div className="flex space-x-4 ml-2">
            <button
              type="button"
              className="bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-red-700 text-white px-4 py-2 rounded shadow"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;