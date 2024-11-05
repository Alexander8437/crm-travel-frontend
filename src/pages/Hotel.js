import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import api from "../apiConfig/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isArray } from "chart.js/helpers";



const Hotel = ({ isOpen, onClose }) => {
  var pricePage = 0;
  // const [pricePage, setPricePage] = useState(0)
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
  const [status, setStatus] = useState(null);
  const [selectedRoomMaster, setSelectedRoomMaster] = useState(null);
  const [roomMaster, setRoomMaster] = useState([]);
  const [bedSize, setBedSize] = useState("");
  const [maxPerson, setMaxPerson] = useState("");
  const [roomStatus, setRoomStatus] = useState([null]);
  const [offSeasonPrice, setOffSeasonPrice] = useState("");
  const [extraBedPrice, setExtraBedPrice] = useState("");
  const [directHotelPrice, setDirectHotelPrice] = useState("");
  const [thirdPartyPrice, setThirdPartyPrice] = useState("");
  const [addRoomPage, setAddRoomPage] = useState(1)

  const [countryDetails, setCountryDetails] = useState([])
  const [stateDetails, setStateDetails] = useState([])
  const [destinationDetails, setDestinationDetails] = useState([])
  const [destinationOption, setDestinationOption] = useState([])
  const [roomsSelected, setRoomsSelected] = useState([{ id: 0, value: true, label: "Active" }])
  const [allSelectedRoomType, setAllSelectedRoomType] = useState(Array(addRoomPage).fill(null))

  // const allSelectedRoomType = [null]
  const [roomOptions, setRoomOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [stateSelected, setStateSelected] = useState(null)
  const [selectedDestination, setSelectedDestinations] = useState(null)
  const [ipAddress, setIpAddress] = useState()
  const [user, setUser] = useState(null)
  const [hImage, setHImage] = useState(null)
  const [roomTypeImage, setRoomTypeImage] = useState(null)

  const seasons = ["Christmas", "New Year", "Weekend", "On Seasons", "Snow Time"]

  const [hotelData, setHotelData] = useState({})
  const navigate = useNavigate();

  const [tempRoomSelected, setTempRoomSelected] = useState(null)

  const [formDataRoomMaster, setFormDataRoomMaster] = useState([])

  const [formRoomDetails, setFormRoomDetails] = useState({
    roomMasterSelected: '',
    roomMasterSelectedId: null,
    bed_size: [],
    max_person: null,
    status: { value: true, label: 'Active' },
    created_by: '',
    modified_by: '',
    isdelete: false,
    ipaddress: '',
    image: null,
  })
  const [totalRoomDetails, setTotalRoomDetails] = useState([{
    roomMasterSelected: '',
    roomMasterSelectedId: null,
    bed_size: [],
    max_person: null,
    status: { value: true, label: 'Active' },
    created_by: '',
    modified_by: '',
    isdelete: false,
    ipaddress: '',
    image: null
  }])

  const [tags, setTags] = useState([{ id: null, bedSize: [] }]);
  const [inputValue, setInputValue] = useState(['']);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue([e.target.value]);
  };

  // Handle Enter or comma key press
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ',') {
      const newTag = e.target.value.trim();
      if (newTag) {
        setTotalRoomDetails((prevItems) =>
          prevItems.map((item, i) =>
            index === i ?
              { ...item, bed_size: [...item.bed_size, newTag] } : item))
        e.target.value = ""; // Clear input
      }
    }
  };

  // Delete tag function
  const handleDeleteTag = (index, i) => {
    // setTags(tags.filter((_, i) => i !== index));
    setTotalRoomDetails((prev) =>
      prev.map((item, j) =>
        index === j ? { ...item, bed_size: item.bed_size.filter(data => data !== item.bed_size[i]) } : item))
  };

  const [formAddRoom, setFormAddRoom] = useState([{
    'roomType': null,
    'bedSize': '',
    'paxs': 0,
    'roomStatus': true,
    image: null
  }])

  const handleAdd = () => {
    const length = totalRoomDetails.length - 1
    console.log(length)
    if (totalRoomDetails[length].bed_size.length <= 0 & totalRoomDetails[length].max_person === null & totalRoomDetails[length].max_person < 1) {
      alert("Enter Complete Data...")
    } else {
      totalRoomDetails.push(formRoomDetails)
      setAddRoomPage((prev) => prev + 1)
      // console.log(totalRoomDetails)
    }
  }

  const [openItems, setOpenItems] = useState({});

  const toggleAccordion = (index) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index], // Toggle the clicked item
    }));
  };

  const [currentPage, setCurrentPage] = useState(0); //Track your page

  const [token, setTokens] = useState(null)
  async function decryptToken(encryptedToken, key, iv) {
    const dec = new TextDecoder();

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedToken
    );
    return dec.decode(new Uint8Array(decrypted));
  }

  // Function to retrieve and decrypt the token
  async function getDecryptedToken() {
    const keyData = JSON.parse(localStorage.getItem('encryptionKey'));
    const ivBase64 = localStorage.getItem('iv');
    const encryptedTokenBase64 = localStorage.getItem('encryptedToken');


    if (!keyData || !ivBase64 || !encryptedTokenBase64) {
      throw new Error('No token found');
    }

    // Convert back from base64
    const key = await crypto.subtle.importKey('jwk', keyData, { name: "AES-GCM" }, true, ['encrypt', 'decrypt']);
    const iv = new Uint8Array(atob(ivBase64).split('').map(char => char.charCodeAt(0)));
    const encryptedToken = new Uint8Array(atob(encryptedTokenBase64).split('').map(char => char.charCodeAt(0)));

    return await decryptToken(encryptedToken, key, iv);
  }

  // Example usage to make an authenticated request
  useEffect(() => {
    getDecryptedToken()
      .then(token => {
        setTokens(token);

        return axios.get(`${api.baseUrl}/getbytoken`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
          }
        });
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error fetching protected resource:', error))
  }, [])

  useEffect(() => {
    axios.get(`${api.baseUrl}/country/get`
    )
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.countryName
        }));
        setCountryDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/destination/getall`)
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id,
          label: item.destinationName
        }));
        setDestinationDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDestinationChange = (selectedDestination) => {
    setSelectedDestinations(selectedDestination)
  }

  const handleStateChange = (stateSelected) => {
    setStateSelected(stateSelected)
    setDestinationOption([])
    setSelectedDestinations(null)

    const newData = destinationDetails.filter(data => stateSelected.value === data.state.id);
    const formattedOptions = newData.map(item => ({
      value: item.id, // or any unique identifier
      label: item.destinationName // or any display label you want
    }));
    setDestinationOption(formattedOptions)
  }

  const handleCountryChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setStateSelected(null);
    setSelectedDestinations(null)
    setDestinationOption([])

    axios.get(`${api.baseUrl}/state/getbycountryid/${selectedOption.value}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.stateName // or any display label you want
        }));
        setStateDetails(formattedOptions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    console.log(currentPage)
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
    // setRoomTypeName("Single");
    setBedSize("");
    setMaxPerson("");
    // setRoomStatus("Active");
    setOffSeasonPrice("");
    setExtraBedPrice("");
    setDirectHotelPrice("");
    setThirdPartyPrice("");
    setCurrentPage(0);
  };

  useEffect(() => {
    axios.get(`${api.baseUrl}/ipAddress`)
      .then((response) => setIpAddress(response.data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${api.baseUrl}/rooms/getAll`)
      .then(response => {
        const formattedOptions = response.data.map(item => ({
          value: item.id, // or any unique identifier
          label: item.roomname // or any display label you want
        }));
        setRoomMaster(formattedOptions);
        const formatRoom = response.data.map(item => ({
          value: item.id,
          label: item.roomname,
          status: false
        }))
        setFormDataRoomMaster(formatRoom)
      })
      .catch((error) => {
        console.error('Error fetching Room Type Name data :', error);
      });
  }, []);

  const handleChange = (i, selectedOption) => {
    const updatedSelections = [...allSelectedRoomType];
    updatedSelections[i] = selectedOption; // Set the specific index to the selected option
    setAllSelectedRoomType(updatedSelections); // Update the state
    const updatedSelect = [...totalRoomDetails];
    updatedSelect[i].roomMasterSelected = selectedOption.label
    updatedSelect[i].roomMasterSelectedId = selectedOption.value
    setTotalRoomDetails(updatedSelect)
  }

  const handleRoomDetailsChange = (e, index) => {
    const { name, value } = e.target
    if (name === 'image') {
      const uploadImage = totalRoomDetails.map((item, i) => index === i ?
        { ...item, image: e.target.files[0] } : item)
      setTotalRoomDetails(uploadImage)
    } else {
      const update = totalRoomDetails.map((item, i) => index === i ?
        { ...item, [name]: value }
        : item)
      setTotalRoomDetails(update)
    }
  }

  const handleRoomDetailsStatusChange = (selectedOption, index) => {
    console.log(selectedOption)
    const update = totalRoomDetails.map((item, i) => i === index ? {
      ...item, status: selectedOption
    } : item)
    setTotalRoomDetails(update)
  }

  const handleRoomTypeMaster = async (e) => {
    e.preventDefault();

    const formDataHotelRoomType = new FormData()

    // formDataHotelRoomType.append('bed_size', bedSize)
    // formDataHotelRoomType.append('max_person', maxPerson)
    // formDataHotelRoomType.append('created_by', user.username)
    // formDataHotelRoomType.append('modified_by', user.username)
    // formDataHotelRoomType.append('ipaddress', ipAddress)
    // formDataHotelRoomType.append('status', roomStatus.value)
    // formDataHotelRoomType.append('isdelete', false)
    // formDataHotelRoomType.append('hotel.id', 1) //hotelData.id
    // formDataHotelRoomType.append('rooms.id', selectedRoomMaster.value)
    // formDataHotelRoomType.append('image', roomTypeImage)

    // for (var pair of formDataHotelRoomType.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    // await axios.post(`${api.baseUrl}/roomtypes/create`, formDataHotelRoomType, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    //   .then(async (response) => {
    //     alert('Hotel Room Type saved Successfully.');
    //   })
    //   .catch(error => console.error(error));

    console.log(allSelectedRoomType)
    let total = 0;
    for (let i = 0; i < totalRoomDetails.length; i++) {
      for (let j = 0; j < totalRoomDetails[i].bed_size.length; j++) {
        total += 1
      }
    }
    console.log(totalRoomDetails)
    setCurrentPage((prev) => prev + 1);
  }


  const handleRoomMaterSelect = (i) => {
    // const newChange = formDataRoomMaster.find(item => item.id === i)
    // newChange.value = !newChange.value
    // setFormDataRoomMaster({
    //   ...formDataRoomMaster,
    //   newChange
    // })
    // formDataRoomMaster[i].status = !formDataRoomMaster[i].status
    const newUpdate = formDataRoomMaster.map(item => item.value === i ? { ...item, status: !item.status } : item)
    // newUpdate.push({ value: i, label: formDataRoomMaster[i].label, status: !formDataRoomMaster[i].status })
    setFormDataRoomMaster(newUpdate)
    console.log(newUpdate)
  }

  const handleHotelMasterSubmit = async (e) => {
    e.preventDefault();

    const formDataHotelMaster = new FormData()

    // formDataHotelMaster.append('country.id', selectedOption.value)
    // formDataHotelMaster.append('state.id', stateSelected.value)
    // formDataHotelMaster.append('destination.id', selectedDestination.value)
    // formDataHotelMaster.append('hname', hotelName)
    // formDataHotelMaster.append('hdescription', editorData)
    // formDataHotelMaster.append('star_ratings', starRating.value)
    // formDataHotelMaster.append('hcontactname', contactPersonName)
    // formDataHotelMaster.append('hcontactnumber', contactPersonNumber)
    // formDataHotelMaster.append('hcontactemail', contactEmail)
    // formDataHotelMaster.append('haddress', hotelAddress)
    // formDataHotelMaster.append('hpincode', hotelPincode)
    // formDataHotelMaster.append('ipaddress', ipAddress)
    // formDataHotelMaster.append('status', status.value)
    // formDataHotelMaster.append('isdelete', false)
    // formDataHotelMaster.append('created_by', user.username)
    // formDataHotelMaster.append('modified_by', user.username)
    // formDataHotelMaster.append('image', hImage)

    // for (var pair of formDataHotelMaster.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }


    // await axios.post(`${api.baseUrl}/hotel/create`, formDataHotelMaster, {
    //   headers: {
    //     // 'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    //   .then(async (response) => {
    //     setHotelData(response.data)
    //   })
    //   .catch(error => console.error(error));

    // alert('Hotel saved Successfully.');
    // navigate(`/home/master-list/hotel`)
    // onClose();
    setCurrentPage((prev) => prev + 1);
    const data = formDataRoomMaster.filter(item => item.status === true)
    setRoomsSelected(data)
    // setAllSelectedRoomType(data)
  }

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
      // roomTypeName,
      bedSize,
      maxPerson,
      // roomStatus,
      offSeasonPrice,
      extraBedPrice,
      directHotelPrice,
      thirdPartyPrice,
    });
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
            options={countryDetails}
            value={selectedOption}
            onChange={handleCountryChange}
            placeholder="Select Country"
          />
        </div>
        <div className="w-1/3">
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State Name
          </label>
          <Select
            options={stateDetails}
            value={stateSelected}
            onChange={handleStateChange}
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
            options={destinationOption}
            value={selectedDestination}
            onChange={handleDestinationChange}
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
              { value: "2", label: "2 Star" },
              { value: "3", label: "3 Star" },
              { value: "4", label: "4 Star" },
              { value: "5", label: "5 Star" },
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
              { value: true, label: "Active" },
              { value: false, label: "Inactive" },
            ]}
            value={status}
            onChange={(status) => setStatus(status)}
            placeholder="Select Status"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="image" className="block text-sm font-medium">
            Hotel Image
          </label>
          <input
            type="file"
            name="himage"
            className="w-full text-gray-700 p-[4.5px] bg-white rounded border border-gray-200"
            onChange={(e) => setHImage(e.target.files[0])}
          />
        </div>
      </div>
      <h3 className="flex bg-red-700 text-white p-2 rounded gap-4">Select Room Types</h3>
      <div className="grid grid-cols-3 gap-4 py-2">
        {roomMaster.map((item, index) => (
          <div className="flex gap-2" key={item.value}>
            <input type="checkbox"
              checked={formDataRoomMaster[index].status}
              onChange={() => handleRoomMaterSelect(item.value)}
            />
            <label>{item.label}</label>
          </div>
        ))}
        {/* <div className="flex gap-2">
          <input type="checkbox" />
          <label>Standard</label>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" />
          <label>Standard</label>
        </div> */}
      </div>
    </div>,

    // Page 2: Room Details
    <div key="2" className="p-4">
      <h3 className="bg-red-700 text-white p-2 rounded mb-4">Add Room Details</h3>
      {/* {Array.from({ length: addRoomPage }) */}
      {totalRoomDetails.map((roomDetails, index) => (
        <div className="bg-slate-100 border-2 p-4 mb-4">
          <div className="flex gap-4 mb-4 min-h-1/3" key={index}>
            <div className="flex flex-col w-1/2 justify-between items-baseline h-full gap-4">
              <div className="w-full">
                <label htmlFor="roomType" className="block text-sm font-medium mb-2">
                  Room Type Name
                </label>
                <Select
                  className="w-full"
                  options={roomsSelected}
                  value={allSelectedRoomType[index]}
                  onChange={(selectedOption) => handleChange(index, selectedOption)}
                  placeholder="Select Room Type"
                />
              </div>
              <div className="w-full mt-1">
                <label htmlFor="maxPerson" className="block text-sm font-medium mb-1">
                  Max Person
                </label>
                <input
                  type="number"
                  id="maxPerson"
                  name="max_person"
                  min={0}
                  value={roomDetails.max_person}
                  onChange={(e) => handleRoomDetailsChange(e, index)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Enter Max Person"
                />
              </div>
            </div>
            <div className="w-1/2 min-h-full">
              <label htmlFor="bedSize" className="block text-sm font-medium mb-1">
                Bed Size
              </label>
              <div className="border border-gray-300 rounded p-2 mt-1 bg-white flex items-start flex-wrap w-full min-h-[calc(100% - 20px)] mb-2">
                {/*
          <input
            type="text"
            id="bedSize"
            value={bedSize}
            onChange={(e) => setBedSize(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Bed Size"
          /> */}

                {roomDetails.bed_size.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-blue-700 text-white rounded px-2 py-1 mr-1 mb-1"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      className="ml-1 text-white hover:text-gray-600"
                      onClick={() => handleDeleteTag(index, i)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  // value={inputValue[index]}
                  // onChange={handleInputChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="Add Bed Size"
                  className="flex-grow p-2 text-sm outline-none border-none focus:ring-0 w-full h-full "
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="w-1/2">
              <label htmlFor="roomStatus" className="block text-sm font-medium">
                Room Status
              </label>
              <Select
                options={[
                  { value: true, label: "Active" },
                  { value: false, label: "Inactive" },
                ]}
                value={roomDetails.status}
                onChange={(selectedOption) => handleRoomDetailsStatusChange(selectedOption, index)}
                placeholder="Select Room Status"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="image" className="block text-sm font-medium">
                Room Image
              </label>
              <input
                type="file"
                name="image"
                className="w-full text-gray-700 p-[4.5px] bg-white rounded border border-gray-200"
                // onChange={(e) => setRoomTypeImage(e.target.files[0])}
                onChange={(e) => handleRoomDetailsChange(e, index)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center w-full">
        <button className="bg-green-700 text-white px-4 py-2" onClick={handleAdd}>Add</button>
      </div>

    </div>,

    // Page 3: Price Details
    <div key="3" className="p-2">
      {totalRoomDetails.map((items, i) =>
        items.bed_size.map((item, j) => {
          let k = 0
          if ((i + j) !== 0) { k = pricePage += 1 }
          return <div className="my-1">
            <div className="flex justify-between bg-red-700 text-white p-2 rounded mb-4 cursor-pointer" onClick={() => toggleAccordion(k)}>
              <h3 className="">{items.roomMasterSelected} - ({item})</h3>
              <button>
                {openItems[k] ? '-' : '+'} </button>
            </div>
            <div className={`m-0 p-0 accordion-content  ${openItems[k] ? 'block' : 'hidden'
              }`} >

              <table className="min-w-full bg-white mb-4 border-2 border-collapse border-black">
                <thead>
                  <tr className="bg-gray-100">
                    {seasons.map(item => (

                      <th className="py-2 px-4 border-2 border-black">{item}</th>

                    ))}
                  </tr>
                </thead>
                <tbody className="border-2 border-black">
                  <tr>
                    {/* Budget Column */}
                    {seasons.map(item => (
                      <td className="py-2 px-4 border-2 border-black">
                        <div className="mb-2">
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
                        <div>
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
                        <div>
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
                        <div>
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
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="flex gap-2 mb-4">
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
      </div> */}

          </div>
        }))}
    </div>,
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg z-50 transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[950px]"
        } mt-4 sm:mt-8 md:mt-12 lg:w-[900px] sm:w-[400px] md:w-[500px]`}
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

      <div className="p-4 overflow-y-auto h-[calc(100vh-160px)]">
        {pages[currentPage]}
      </div>

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

          <div className="flex space-x-4 ml-2">
            {/* <button
              type="button"
              onClick={handleNext}
              className="bg-red-700 text-white px-4 py-2 rounded shadow ml-2"
            >
              Next
            </button> */}

            <button
              type="button"
              onClick={currentPage === 0 ? handleHotelMasterSubmit : handleRoomTypeMaster}
              className="bg-red-700 text-white px-4 py-2 rounded shadow"
            >
              Save & Continue
            </button>

          </div>
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