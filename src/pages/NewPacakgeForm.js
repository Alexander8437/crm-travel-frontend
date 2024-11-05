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
  const [addCityAndNight, setAddCityAndNight] = useState([
    // {
    //   hotelCity: '',
    //   hotelCityId: null,
    //   fromStartDay: 0,
    //   to: 0
    // }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showItiForm, setShowItiForm] = useState(false);
  // const [showIti, setShowIti] = useState([{ value: 'add-field', label: '➕ Add Extra Field' }])

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

  const [openItems, setOpenItems] = useState({});

  const toggleAccordion = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index], // Toggle the clicked item
    }));
  };

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
    // setShowIti([])
  }
  const handleAddItineraryDay = () => {
    if (Number(nights) > 0 && selectedHotelCity !== null) {
      let l = addCityAndNight.length;
      const addIti = {
        'hotelCity': selectedHotelCity.label,
        'hotelCityId': selectedHotelCity.value,
        'fromStartDay': l === 0 ? 1 : addCityAndNight[l - 1].to,
        'to': l === 0 ? Number(nights) : addCityAndNight[l - 1].to + Number(nights)
      }
      setDays((prev) => prev + Number(nights))
      const iti = itinerariesList.filter((it) => it.label === selectedHotelCity.label)
      if (l !== 0) {
        setAddCityAndNight([
          ...addCityAndNight,
          addIti])
      } else {
        // setAddCityAndNight([addIti])
        addCityAndNight.push(addIti)
      }
      setSelectedHotelCity(null)
      setNights(0)
      // iti.map((i) => {
      //   showIti.push(i)
      // })
    } else {
      if (selectedHotelCity === null && Number(nights) === 0)
        alert('Select City and Enter correct days')
      else if (Number(nights) === 0)
        alert('Select Valid Days...')
      else
        alert('Select City...')
    }
    // console.log(showIti)
  }
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form data submitted:', formData);
  //   setIsModalOpen(false); // Close modal after submit
  // };

  const handlePageChange = () => {
    // if (formData.packageTitle !== '' && selectedStartCity !== null && selectedEndCity !== null && selectedDestinations.length !== 0) {
    setPage(2)
    // } else {
    //   alert("Enter or select data...")
    // }
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
            <table className="w-full bg-white border-2 border-collapse border-black">
              <thead className="gap-4 ">
                {/* <th>Itinerary City ID</th> */}
                <th className=" border-2 border-black">Itinerary City</th>
                <th className=" border-2 border-black">From</th>
                <th className=" border-2 border-black">To</th>
                <th className=" border-2 border-black">Action</th>
                {/* <th>Number of Nights</th> */}
              </thead>
              {addCityAndNight.length > 0 && addCityAndNight.map(i => (
                <tbody className="text-center  border-collapse border-1 border-black">
                  {/* <td>{i.hotelCityId}</td> */}
                  <td className=" border-2 border-black">{i.hotelCity}</td>
                  <td className=" border-2 border-black">Day {i.fromStartDay}</td>
                  <td className=" border-2 border-black">Day {i.to}</td>
                  <td className=" border-2 border-black">Add</td>

                </tbody>
              ))}
            </table>
          </div>
          <div className="flex mb-4 gap-2 justify-evenly w-full">
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
            <div className="w-1/3">
              <label htmlFor="destinations" className="block text-sm font-medium">No of Nights</label>
              <input
                type="number"
                id="packageName"
                name="noOFDays"
                value={nights}
                min={0}
                onChange={(e) => setNights(e.target.value)}
                className="mt-1 h-[38px] p-2 w-full border border-1 border-[#e5e7eb] rounded"
                placeholder="No. of night..."
              />
              {/* <input type="text" className="" placeholder="No. of night..." /> */}
            </div>
            <div className="w-1/4 flex items-end border border-1 min-h-full">
              <button className="bg-red-600 py-1 rounded-sm px-2 mb-1 text-white 
              hover:bg-white hover:text-red-600 hover:border-red-600 border-[1px]" onClick={handleAddItineraryDay}>Add</button>
            </div>
          </div>
          <div className="mb-6 gap-2">
            <label htmlFor="destinations" className="block text-sm font-medium">Itineraries</label>

            {Array.from({ length: days }, (_, index) => (
              <div className="flex flex-col items-center truncate w-full mt-2">
                {/* <label className="h-full bg-gray-700 p-1 border-b-2 text-white px-2 rounded-sm">
                  Day: {index + 1} </label>
                <Select
                  className="w-full border rounded"
                  value={selectedItineraries}
                  onChange={(selectedOption) => handleItineraryChange(selectedOption, index)}
                  options={destinations}
                /> */}

                <div className="flex w-full justify-between bg-red-700 text-white p-2 rounded mb-2 cursor-pointer" onClick={() => toggleAccordion(index)}>
                  <h3 className="">Day {index + 1}</h3>
                  <button>
                    {openItems[index] ? '-' : '+'} </button>
                </div>
                <div className={`accordion-content overflow-x-hidden transition-[max-height] duration-1500 ease-in-out ${openItems[index] ? 'max-h-fit' : 'max-h-0'
                  }`} >
                  <div key={index} className="mb-6">
                    <div className="shadow-md p-4 bg-white rounded-lg">
                      {/* <div className="flex justify-between mb-4 bg-red-700 rounded">
                        <h3 className="text-white p-2">Day {index + 1}</h3>
                        <button
                          type="button"
                          className="text-white p-2 rounded font-bold"
                        >
                          -
                        </button>
                      </div> */}

                      <div className="mb-4 p-2">
                        <label
                          htmlFor={`title-${index}`}
                          className="block text-sm font-medium"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id={`title-${index}`}
                          className="mt-1 p-2 w-full border rounded bg-gray-200"
                          name="title"
                          placeholder="Enter Title"
                        // value={formData.days[index].title}
                        // onChange={(e) => handleInputChange(e, index)}
                        />
                      </div>

                      <div className="mb-4 p-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium">
                          Description
                        </label>
                        <CKEditor
                          className=""
                          editor={ClassicEditor}
                          // data={editorData}
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
                            // setEditorData(data);
                          }}
                        />
                      </div>

                      <div className="mb-4 p-2">
                        <h3 className="block text-sm font-medium mb-2">Meals</h3>
                        <div className="flex justify-between gap-2 mb-4">
                          <div className="w-1/3 flex items-center">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="breakfast"
                                // checked={formData.days[index].meals.breakfast}
                                // onChange={(e) => handleMealChange(e, index)}
                                className="mr-2"
                              />
                              Breakfast
                            </label>
                          </div>
                          <div className="w-1/3 flex items-center">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="lunch"
                                // checked={formData.days[index].meals.lunch}
                                // onChange={(e) => handleMealChange(e, index)}
                                className="mr-2"
                              />
                              Lunch
                            </label>
                          </div>
                          <div className="w-1/3 flex items-center">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="dinner"
                                // checked={formData.days[index].meals.dinner}
                                // onChange={(e) => handleMealChange(e, index)}
                                className="mr-2"
                              />
                              Dinner
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Hotels Table */}
                      <div className="mb-4">
                        <h3 className="bg-gray-600 text-white p-2 rounded rounded-b-none">
                          Select Hotel
                        </h3>
                        <table className="min-w-full bg-white mb-4 border rounded rounded-t-none">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="py-2 px-4 border-r">Budget</th>
                              <th className="py-2 px-4 border-r">Deluxe</th>
                              <th className="py-2 px-4 border-r">Luxury</th>
                              <th className="py-2 px-4">Standard</th>
                            </tr>
                          </thead>
                          <tbody className="bg-gray-50 rounded-lg">
                            <tr>
                              {/* Budget Column */}
                              <td className="py-2 px-4 border-r">
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Hotel Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Type"
                                    className="mt-1 border w-full h-[36px] rounded p-2 border-gray-300"
                                  />
                                </div>
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Room Type
                                  </label>
                                  <Select
                                    // options={RoomTypeOptions}
                                    placeholder="Rating"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium">
                                    Meal Type
                                  </label>
                                  <Select
                                    // options={MealTypeOptions}
                                    placeholder="Meals"
                                    className="mt-1"
                                  />
                                </div>
                              </td>

                              {/* Deluxe Column */}
                              <td className="py-2 px-4 border-r">
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Hotel Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Type"
                                    className="mt-1 border w-full h-[36px] rounded p-2 border-gray-300"
                                  />
                                </div>
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Room Type
                                  </label>
                                  <Select
                                    // options={RoomTypeOptions}
                                    placeholder="Rating"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium">
                                    Meal Type
                                  </label>
                                  <Select
                                    // options={MealTypeOptions}
                                    placeholder="Meals"
                                    className="mt-1"
                                  />
                                </div>
                              </td>

                              {/* Luxury Column */}
                              <td className="py-2 px-4 border-r">
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Hotel Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Type"
                                    className="mt-1 border w-full h-[36px] rounded p-2 border-gray-300"
                                  />
                                </div>
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Room Type
                                  </label>
                                  <Select
                                    // options={RoomTypeOptions}
                                    placeholder="Rating"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium">
                                    Meal Type
                                  </label>
                                  <Select
                                    // options={MealTypeOptions}
                                    placeholder="Meals"
                                    className="mt-1"
                                  />
                                </div>
                              </td>

                              {/* Standard Column */}
                              <td className="py-2 px-4">
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Hotel Name
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Type"
                                    className="mt-1 border w-full h-[36px] rounded p-2 border-gray-300"
                                  />
                                </div>
                                <div className="mb-2">
                                  <label className="block text-sm font-medium">
                                    Room Type
                                  </label>
                                  <Select
                                    // options={RoomTypeOptions}
                                    placeholder="Rating"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium">
                                    Meal Type
                                  </label>
                                  <Select
                                    // options={MealTypeOptions}
                                    placeholder="Meals"
                                    className="mt-1"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`activities-${index}`}
                          className="block text-sm font-medium bg-gray-600 text-white p-2 rounded rounded-b-none">
                          Select Activities
                        </label>
                        <div className="border rounded rounded-t-none p-4 bg-gray-200">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor={`activities-${index}`}
                          >
                            Activities
                          </label>
                          <select
                            id={`activities-${index}`}
                            className="mt-1 w-full border rounded p-2 outline-none"
                            name="activities"
                          // value={formData.days[index].activities}
                          // onChange={(e) => handleInputChange(e, index)}
                          >
                            <option>Select Activity</option>
                            <option>Select Activity</option>
                            <option>Select Activity</option>
                            <option>Select Activity</option>
                            {/* Add options here */}
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`activities-${index}`}
                          className="block text-sm font-medium bg-gray-600 text-white p-2 rounded rounded-b-none"
                        >
                          Sightseeing
                        </label>
                        <div className="border rounded rounded-t-none p-4 bg-gray-200">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor={`activities-${index}`}
                          >
                            sightView
                          </label>
                          <div className="relativ">
                            <input
                              type="text"
                              id="sightseeing"
                              className="mt-1 p-2 w-full border border-gray-300 rounded bg-white"
                              name="sightseeing"
                              placeholder="Abu Dhabi City tour (Dubai, United Arab Emirates)"
                              list="sightseeing-options"
                            />
                            <datalist id="sightseeing-options">
                              <option value="Abu Dhabi City tour (Dubai, United Arab Emirates)" />
                              <option value="Abu Dhabi city tour with Ferrari world (Dubai, United Arab Emirates)" />
                            </datalist>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor={`transportationDetails-${index}`}
                          className="block text-sm font-medium bg-gray-600 text-white p-2 rounded rounded-b-none"
                        >
                          Transportation Types
                        </label>
                        <div className="border rounded rounded-t-none p-4 bg-gray-200">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor={`transportation-${index}`}
                          >
                            Transportation
                          </label>
                          <input
                            type="text"
                            id={`transportationDetails-${index}`}
                            className="mt-1 p-2 w-full border rounded "
                            name="transportationDetails"
                            placeholder="Enter a Transportation..."
                          // value={formData.days[index].transportationDetails}
                          // onChange={(e) => handleInputChange(e, index)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


              </div>
            ))}
            {/* {days !== 0 &&
              <div className="flex justify-center items-center mt-4">
                <button className="bg-blue-200 p-2 border rounded-sm border-b-2"
                  onClick={() => setShowItiForm(true)}>Create Desired Itinerary</button>
              </div>} */}
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
