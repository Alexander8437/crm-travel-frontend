import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import api from "../apiConfig/config";

const Itinerary = ({ isOpen, onClose }) => {
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formData, setFormData] = useState({
    days: [
      {
        title: "",
        startCity: "",
        endCity: "",
        description: "",
        activities: "",
        transportation: "",
        transportationDetails: "",
      },
    ],
  });
  const [user, setUser] = useState({});

  // Fetch destinations
  useEffect(() => {
    axios
      .get(`${api.baseUrl}/destinations`)
      .then((response) => {
        const options = response.data.map((destination) => ({
          value: destination.id,
          label: destination.name,
        }));
        setDestinationOptions(options);
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  // Decrypt Token and Fetch User Info
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

  async function getDecryptedToken() {
    const keyData = JSON.parse(localStorage.getItem("encryptionKey"));
    const ivBase64 = localStorage.getItem("iv");
    const encryptedTokenBase64 = localStorage.getItem("encryptedToken");

    if (!keyData || !ivBase64 || !encryptedTokenBase64) {
      throw new Error("No token found");
    }

    const key = await crypto.subtle.importKey(
      "jwk",
      keyData,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"]
    );
    const iv = new Uint8Array(
      atob(ivBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const encryptedToken = new Uint8Array(
      atob(encryptedTokenBase64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    return await decryptToken(encryptedToken, key, iv);
  }

  useEffect(() => {
    getDecryptedToken()
      .then((token) => {
        return axios.get(`${api.baseUrl}/getbytoken`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
        });
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching protected resource:", error));
  }, []);

  // Handle input changes for the current day
  const handleInputChange = (event, dayIndex) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        [name]: value,
      };
      return {
        ...prevState,
        days: updatedDays,
      };
    });
  };

  // Handle destination change
  const handleDestinationChange = (selectedOption) => {
    setSelectedDestination(selectedOption);
  };

  // Add a new day form
  const addNewDay = () => {
    setFormData((prevState) => ({
      ...prevState,
      days: [
        ...prevState.days,
        {
          title: "",
          startCity: "",
          endCity: "",
          description: "",
          activities: "",
          transportation: "",
          transportationDetails: "",
        },
      ],
    }));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      destinationId: selectedDestination ? selectedDestination.value : null,
      createdby: user.username,
      modifiedby: user.username,
      isdelete: false,
      itinerary: formData.days,
    };

    try {
      await axios.post(`${api.baseUrl}/itinerary/create`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      alert("Itinerary created successfully");

      // Reset the form and selected destination after successful submission
      setFormData({
        days: [
          {
            title: "",
            startCity: "",
            endCity: "",
            description: "",
            activities: "",
            transportation: "",
            transportationDetails: "",
          },
        ],
      });
      setSelectedDestination(null);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      alert("Error creating itinerary, please try again.");
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      days: [
        {
          title: "",
          startCity: "",
          endCity: "",
          description: "",
          activities: "",
          transportation: "",
          transportationDetails: "",
        },
      ],
    });
    setSelectedDestination(null);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"
        } mt-4 sm:mt-8 md:mt-12 w-full sm:w-[calc(100%-120px)] md:w-[800px]`}
    >
      <button
        onClick={() => onClose(true)}
        className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3  py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700"
      >
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Itinerary</h2>
      </div>
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 h-4/5" onSubmit={handleSubmit}>
        <div className="h-full overflow-y-scroll">
          <div className="mb-6">
            <h3 className="bg-red-700 text-white p-2 rounded">List of Itinerary</h3>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-full">
              <label htmlFor="destinationName" className="block text-sm font-medium">
                Destination Name
              </label>
              <Select
                id="destinationName"
                options={destinationOptions}
                value={selectedDestination}
                onChange={handleDestinationChange}
                placeholder="Select..."
              />
            </div>
          </div>

          {formData.days.map((day, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-4 bg-red-700 rounded">
                <h3 className=" text-white p-2 ">Day {index + 1}</h3>
                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prevState) => {
                      const updatedDays = [...prevState.days];
                      updatedDays.splice(index, 1);
                      return {
                        ...prevState,
                        days: updatedDays,
                      };
                    });
                  }}
                  className=" text-white p-2 rounded font-bold">
                  -
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor={`title-${index}`} className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  className="mt-1 p-2 w-full border rounded"
                  name="title"
                  value={formData.days[index].title}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>

              <div className="flex gap-2 mb-4">
                <div className="w-1/2">
                  <label htmlFor={`startCity-${index}`} className="block text-sm font-medium">
                    Start City
                  </label>
                  <input
                    type="text"
                    id={`startCity-${index}`}
                    className="mt-1 p-2 w-full border rounded"
                    name="startCity"
                    value={formData.days[index].startCity}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor={`endCity-${index}`} className="block text-sm font-medium">
                    End City
                  </label>
                  <input
                    type="text"
                    id={`endCity-${index}`}
                    className="mt-1 p-2 w-full border rounded"
                    name="endCity"
                    value={formData.days[index].endCity}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor={`description-${index}`} className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id={`description-${index}`}
                  className="mt-1 p-2 w-full border rounded"
                  name="description"
                  value={formData.days[index].description}
                  onChange={(e) => handleInputChange(e, index)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor={`activities-${index}`} className="block text-sm font-medium">
                  Activities
                </label>
                <textarea
                  id={`activities-${index}`}
                  className="mt-1 p-2 w-full border rounded"
                  name="activities"
                  value={formData.days[index].activities}
                  onChange={(e) => handleInputChange(e, index)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor={`transportation-${index}`} className="block text-sm font-medium">
                  Transportation
                </label>
                <input
                  type="text"
                  id={`transportation-${index}`}
                  className="mt-1 p-2 w-full border rounded"
                  name="transportation"
                  value={formData.days[index].transportation}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`transportationDetails-${index}`} className="block text-sm font-medium">
                  Transportation Details
                </label>
                <input
                  type="text"
                  id={`transportationDetails-${index}`}
                  className="mt-1 p-2 w-full border rounded"
                  name="transportationDetails"
                  value={formData.days[index].transportationDetails}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewDay}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add New Day
          </button>
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex justify-between items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12">
          <div className="flex justify-start space-x-4">
            <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={handleSubmit}>
              Submit
            </button>
            <button
              type="button"
              className="bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Itinerary;
