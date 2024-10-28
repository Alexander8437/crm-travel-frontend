import React, { useEffect, useState } from "react";
import Select, { components } from 'react-select';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CreatableSelect from "react-select/creatable";
import api from "../apiConfig/config";
import axios from "axios";
import PackageItinerary from "./PackageItinerary";

const NewPackageForm = ({ isOpen, onClose }) => {
  const [nights, setNights] = useState(0)
  const [days, setDays] = useState(0)
  const [page, setPage] = useState(1)
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [selectedItineraries, setSelectedItineraries] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [selectedStartCity, setSelectedStartCity] = useState()
  const [selectedEndCity, setSelectedEndCity] = useState()
  const [selectedSupplier, SetSelectedSupplier] = useState(null)
  const [addItineraryDay, setAddItineraryDay] = useState(1)
  const [packageImage, setPackageImage] = useState(null)
  const [selectedHotelCity, setSelectedHotelCity] = useState(null)
  const [destinations, setDestinations] = useState([])
  const [addCityAndNight, setAddCityAndNight] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showItiForm, setShowItiForm] = useState(false);
  const [showIti, setShowIti] = useState([{ value: 'add-field', label: '➕ Add Extra Field' }
  ])

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // const handleSelect = (ranges) => {
  //   console.log(ranges); // Check the selected date ranges in the console
  //   setState([ranges.selection]);
  // };

  const [formData, setFormData] = useState({
    packageTitle: '',
    packageCode: '',
    supplier: '',
    noOfDays: '',
    noOfNights: '',
    packageCategory: '',
    packageType: '',
    Description: '',
  });


  useEffect(() => {
    axios.get(`${api.baseUrl}/destination/getall`)
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.destinationName // or any display label you want
        }));
        setDestinations(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const destinations = [
  //   { value: '1', label: 'Paris' },
  //   { value: '2', label: 'New York' },
  //   { value: '3', label: 'Tokyo' },
  //   { value: '4', label: 'London' },
  //   { value: '5', label: 'Sydney' }
  // ];

  const [itinerariesList, setItinerayList] = useState([
    { value: 1, label: 'Ranchi' },
    { value: 2, label: 'Goa' },
    { value: 3, label: 'Verkala' },
    { value: 4, label: 'Shimla' },
    { value: 5, label: 'Goa' }
  ])

  const [supplier, setSupplier] = useState(
    [{ value: '1', label: 'Supplier 1' },
    { value: '2', label: 'Supplier 2' },
    { value: '3', label: 'Supplier 3' },
    { value: '4', label: 'Supplier 4' },
    { value: '5', label: 'Supplier 5' },]
  );

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


  const CustomOptions = (props) => {
    return (
      <components.Option {...props}>
        {props.data.value === 'add-form' ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true); // Open modal on button click
            }}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {props.data.label}
          </button>
        ) : (
          props.children
        )}
      </components.Option>
    );
  };
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

  // setAddItineraryDay(addItineraryDay + 1)
  const handleItinearayReset = () => {
    setDays(0);
    setAddCityAndNight([]);
    setShowIti([])
  }
  const handleAddItineraryDay = () => {
    if (Number(nights) > 0 && selectedHotelCity !== null) {
      const addIti = {
        'hotelCity': selectedHotelCity.label,
        'hotelCityId': selectedHotelCity.value,
        'noOfNights': Number(nights) - 1,
        'noOfDays': Number(nights)
      }
      setDays((prev) => prev + Number(nights))
      const iti = itinerariesList.filter((it) => it.label === selectedHotelCity.label)
      addCityAndNight.push(addIti)
      setSelectedHotelCity(null)
      setNights(0)
      iti.map((i) => {
        showIti.push(i)
      })
    } else {
      if (selectedHotelCity === null && Number(nights) <= 0)
        alert('Select City and Enter correct days')
      else if (Number(nights) <= 0)
        alert('Select Valid Days...')
      else
        alert('Select City...')
    }
    console.log(showIti)
  }
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form data submitted:', formData);
  //   setIsModalOpen(false); // Close modal after submit
  // };

  const handlePageChange = () => {
    if (formData.packageTitle !== '' && selectedStartCity !== null && selectedEndCity !== null && selectedDestinations.length !== 0) {
      setPage(2)
    } else {
      alert("Enter or select data...")
    }
  }
  const handleFileChange = () => {
  }
  const handleSupplierChange = () => {
  }

  const handleStartCityChange = (selectedStartCity) => {
    setSelectedStartCity(selectedStartCity)
  }

  const handleEndCityChange = (selectedEndCity) => {
    setSelectedEndCity(selectedEndCity)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleChange = (selectedOptions) => {
    setSelectedDestinations(selectedOptions);
    console.log(selectedOptions)
  };

  const handleItineraryChange = (selectedOption, index) => {

    setSelectedItineraries({ ...selectedItineraries, selectedOption });
    // selectedItineraries.push(selectedOptions)
    console.log(typeof (selectedItineraries))
    console.log(selectedItineraries)
    // console.log(i)
  };

  const handleInclusionChange = (selectedOptions) => {
    setSelectedInclusions(selectedOptions);
    console.log(selectedInclusions)
    for (let i = 0; i < selectedInclusions.length; i++) {
      if (selectedInclusions[i].__isNew__) {
        console.log(selectedInclusions[i])
      }
    }
  };

  const handleExclusionChange = (selectedOptions) => {
    setSelectedExclusions(selectedOptions);
    console.log(selectedExclusions)
    for (let i = 0; i < selectedExclusions.length; i++) {
      if (selectedExclusions[i].__isNew__) {
        console.log(selectedExclusions[i])
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedDestinations.map(option => option.label).join(', ');
    // console.log(formData)
  };


  return (
    <div className={`fixed top-8 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : `translate-x-[950px]`} mt-4 sm:top-18 md:top-18 lg:w-[800px] sm:w-full md:w-[700px] z-10`}>
      <button onClick={onClose} className="absolute top-[12px] lg:left-[-22px] font-semibold w-8 text-white text-sm bg-red-700 square px-3 py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700 sm:right-4 md:right-4 xs:right-4">X</button>
      <div className="flex justify-between items-center p-4 bg-white shadow-md top-12">
        <h2 className="text-lg font-bold text-black">New Package</h2>
      </div>
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 overflow-y-auto h-[calc(100vh-160px)]" onSubmit={handleSubmit}>
        {page === 1 && <>
          <div className="mb-4">
            <h3 className="bg-red-700 text-white p-2 rounded">Basic Package Details</h3>
          </div>
          <div className="flex gap-2 w-full h-16 mb-2">
            <div className="w-1/3 h-full">
              <label htmlFor="destinations" className="block text-sm font-medium">Package Title</label>
              <input
                type="text"
                id="packageName"
                name="packageTitle"
                value={formData.packageTitle}
                onChange={handleInputChange}
                className="mt-1 h-[38px] p-2 w-full border border-1 border-[#e5e7eb] rounded"
                placeholder="Enter Package Title..."
              />
            </div>
            <div className="w-1/3 h-full">
              <label htmlFor="destinations" className="block text-sm font-medium">Start City</label>
              <Select
                className="mt-1 w-full border rounded z-40"
                value={selectedStartCity}
                onChange={handleStartCityChange}
                options={destinations}
              // components={{ Option: CustomOption }}
              // closeMenuOnSelect={true}
              // hideSelectedOptions={true}
              // isClearable={true}
              />
            </div>
            <div className="w-1/3 h-full">
              <label htmlFor="destinations" className="block text-sm font-medium">End City</label>
              <Select
                className="mt-1 w-full border rounded z-40"
                value={selectedEndCity}
                onChange={handleEndCityChange}
                options={destinations}
              // components={{ Option: CustomOption }}
              // closeMenuOnSelect={true}
              // hideSelectedOptions={true}
              // isClearable={true}
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 w-full gap-2">
            <div className="w-1/2">
              <label htmlFor="destinations" className="block text-sm font-medium">Destination Covered</label>
              <Select
                className="mt-1 w-full border rounded z-30"
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
            <div className="w-1/2">
              <label htmlFor="destinations" className="block text-sm font-medium">Supplier</label>
              <Select
                className="mt-1 w-full border rounded z-30"
                value={selectedSupplier}
                onChange={(selectedSupplier) => {
                  SetSelectedSupplier(selectedSupplier);
                  formData.supplier = selectedSupplier.value
                }}
                options={supplier}
              />
            </div>

          </div>
          <div className="flex justify-between mb-2 w-full gap-2">
            <div className="w-1/2">
              <label htmlFor="destinations" className="block text-sm font-medium">Package Category</label>
              <Select
                className="mt-1 w-full border rounded z-20"
                // value={selectedStartCity}
                // onChange={handleStartCityChange}
                options={destinations}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="destinations" className="block text-sm font-medium">Images</label>
              <input
                type="file"
                className="w-full text-gray-700 mt-1 p-[4.5px] bg-white rounded border border-gray-200"
                name="image"
                // multiple
                onChange={handleFileChange}
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
        </>
        }
        {page === 2 && <>
          <div className="mb-4">
            <h3 className="bg-red-700 text-white p-2 rounded">Itinerary</h3>
          </div>
          <div className="flex mb-4 gap-2 justify-between">
            <table className="w-full bg-white">
              <thead className="gap-4">
                {/* <th>Itinerary City ID</th> */}
                <th>Itinerary City</th>
                <th>Number of days</th>
                {/* <th>Number of Nights</th> */}
              </thead>
              {addCityAndNight.map(i => (
                <tbody className="text-center">
                  {/* <td>{i.hotelCityId}</td> */}
                  <td>{i.hotelCity}</td>
                  <td>{i.noOfDays}</td>
                  {/* <td>{i.noOfNights}</td> */}
                </tbody>
              ))}
            </table>
          </div>
          <div className="flex mb-4 gap-2 h-14">
            <div className="w-1/2">
              <label htmlFor="destinations" className="block text-sm font-medium">Add Hotel City</label>
              <Select
                className="mt-1 w-full border rounded "
                value={selectedHotelCity}
                onChange={setSelectedHotelCity}
                options={destinations}
              />
              {/* <input type="text" className="w-full p-2 " placeholder="Enter Hotel Stay..." /> */}
            </div>
            <div className="w-1/4">
              <label htmlFor="destinations" className="block text-sm font-medium">No of Days</label>
              <input
                type="number"
                id="packageName"
                name="noOFDays"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                className="mt-1 h-[38px] p-2 w-full border border-1 border-[#e5e7eb] rounded"
                placeholder="No. of night..."
              />
              {/* <input type="text" className="" placeholder="No. of night..." /> */}
            </div>
            <div className="w-1/4 flex items-end border border-1 ">
              <button className="bg-red-200 px-4 h-[38px] mt-3" onClick={handleAddItineraryDay}>Add</button>
            </div>
          </div>
          <div className="mb-6 gap-2">
            <label htmlFor="destinations" className="block text-sm font-medium">Itineraries</label>

            {Array.from({ length: days }, (_, index) => (
              <div className="flex items-center truncate w-full mt-2">
                <label className="h-full bg-gray-700 p-1 border-b-2 text-white px-2 rounded-sm">
                  Day: {index + 1} </label>
                <Select
                  className="w-full border rounded"
                  value={selectedItineraries}
                  onChange={(selectedOption) => handleItineraryChange(selectedOption, index)}
                  options={destinations}
                // isMulti
                // components={{ Option: CustomOptions }}
                // classNamePrefix="select"
                // closeMenuOnSelect={false}
                // hideSelectedOptions={false}
                // isClearable={true}
                />
              </div>
            ))}
            {days !== 0 &&
              <div className="flex justify-center items-center mt-4">
                <button className="bg-blue-200 p-2 border rounded-sm border-b-2"
                  onClick={() => setShowItiForm(true)}>Create Desired Itinerary</button>
              </div>
            }
          </div>
          {showItiForm && (
            // <div className="bg-white border-2 rounded-md">
            <div
              className="submenu-menu" style={{ right: showItiForm ? "0" : "-100%" }}>
              <PackageItinerary isOpen={showItiForm} onClose={() => setShowItiForm(false)} />
            </div>
            // </div>
          )}

        </>}
        {page === 3 && <>
          <div className="mb-6">
            <h3 className="bg-red-700 text-white p-2 rounded">Inclusions/Exclusions</h3>
          </div>
          <div className="mb-4">
            <label htmlFor="destinations" className="block text-sm font-medium">Whats included</label>
            {/* <Select
            className="mt-1 w-full border rounded"
            value={selectedInclusions}
            onChange={handleInclusionChange}
            options={inclusions}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          /> */}
            <CreatableSelect
              isMulti
              value={selectedInclusions}
              onChange={handleInclusionChange}
              options={inclusions}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option: CustomOption }}
              isClearable={true}
              placeholder="Type or select options..."
            />
          </div>
          <div className="mb-6">
            <label htmlFor="destinations" className="block text-sm font-medium">Whats Excluded</label>
            {/* <Select
            className="mt-1 w-full border rounded"
            value={selectedExclusions}
            onChange={handleExclusionChange}
            options={exclusions}
            isMulti
            components={{ Option: CustomOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={true}
          /> */}
            <CreatableSelect
              isMulti
              className="mt-1 w-full border rounded"
              value={selectedExclusions}
              onChange={handleExclusionChange}
              options={exclusions}
              placeholder="Type or select options..."
              closeMenuOnSelect={false}
              components={{ Option: CustomOption }}
              hideSelectedOptions={false}
              isClearable={true}
            />
          </div>
          {/* <div className="mb-4">
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
        </div> */}

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
        </>
        }
        <div className="flex items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12 left-0 right-0">

          {page === 1 && <>
            <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded shadow mr-1" disabled>Back</button>
            <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={handlePageChange}
            >Next</button></>}
          {page === 2 && <>
            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded shadow mr-1"
              onClick={() => setPage(1)}>Back</button>
            <button type="button" className="bg-red-700 text-white px-4 py-2 mr-1 rounded shadow"
              onClick={() => setPage(3)}>Next</button>
            <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow" onClick={handleItinearayReset}>Reset</button>
          </>
          }
          {page === 3 && <>
            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded shadow mr-1"
              onClick={() => setPage(2)}>Back</button>
            <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded shadow mr-1">Submit</button>
            <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow">Reset</button></>}


        </div>
      </form>

    </div>
  );
};

export default NewPackageForm;
