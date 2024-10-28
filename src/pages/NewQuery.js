import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../apiConfig/config";
import Select from "react-select";

const NewQuery = ({ isOpen, onClose }) => {
  const [customer, setCustomer] = useState("Select");
  const [email, setEmail] = useState();
  const [pCode, setPCode] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState(true);
  const [user, setUser] = useState({});
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
    const keyData = JSON.parse(localStorage.getItem("encryptionKey"));
    const ivBase64 = localStorage.getItem("iv");
    const encryptedTokenBase64 = localStorage.getItem("encryptedToken");

    if (!keyData || !ivBase64 || !encryptedTokenBase64) {
      throw new Error("No token found");
    }

    // Convert back from base64
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

  // Example usage to make an authenticated request
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
      .catch((error) =>
        console.error("Error fetching protected resource:", error)
      );
  }, []);

  const [formData, setFormData] = useState({
    customer,
    email,
    pCode,
    ipAddress: "",
    status,
    image: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDatasend = new FormData();
    formDatasend.append("countryName", formData.countryName);
    formDatasend.append("code", formData.code);
    formDatasend.append("pCode", formData.pCode);
    formDatasend.append("ipAddress", formData.ipAddress);
    formDatasend.append("status", formData.status);
    formDatasend.append("image", formData.image);
    formDatasend.append("createdby", user.username);
    formDatasend.append("modifiedby", user.username);
    formDatasend.append("isdelete", false);

    for (let [key, value] of formDatasend.entries()) {
      console.log(`${key}: ${value}`);
    }

    // await axios.post(`${api.baseUrl}/country/create`, formDatasend, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then(async (response) => {
    //     alert("Country created...");
    //     setFormData({
    //       countryName: "",
    //       code: "",
    //       pCode: "",
    //       ipAddress: "",
    //       image: null,
    //     });
    //   })
    //   .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${api.baseUrl}/ipAddress`)
      .then((response) => {
        setFormData({
          ...formData,
          ipAddress: response.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[1050px]"
        } mt-4 sm:mt-8 md:mt-12 w-full sm:w-[calc(100%-120px)] md:w-[800px] lg:w-[1000px]`}
    >
      {/* "X" button positioned outside the form box */}
      <button
        onClick={() => onClose(true)}
        className="absolute top-[12px] left-[-22px] font-semibold text-white text-sm bg-red-700 square px-3  py-1.5 border border-1 border-transparent hover:border-red-700 hover:bg-white hover:text-red-700"
      >
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Query</h2>
      </div>
      {/* Line below the title with shadow */}
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4 mb-4 h-[calc(100vh-160px)] overflow-y-auto">
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">
            Customer Details
          </h3>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Customer Name
            </label>
            <Select
              options={[
                { value: "Aditi", label: "Aditi" },
                { value: "Alex", label: "Alex" },
                { value: "Ujjawal", label: "Ujjawal" },
              ]}
              value={customer}
              onChange={setCustomer}
              placeholder="Select Customer"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="code" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 p-2 w-full border rounded"
              placeholder=" ******@.com"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Phone no.
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder=" +91..."
              name="pCode"
              value={formData.pCode}
              onChange={
                handleInputChange
                // (e) => setCode(e.target.value)
              }
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">Package Details</h3>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label htmlFor="countryName" className="block text-sm font-medium">
              From
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder=" From where to start a journey..."
              name="pCode"
              value={formData.pCode}
              onChange={
                handleInputChange
                // (e) => setCode(e.target.value)
              }
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="destination"
              className="block text-sm font-medium mb-1"
            >
              Destination
            </label>
            <Select
              options={[
                { value: "Mumbai", label: "Mumbai" },
                { value: "Los Angeles", label: "Los Angeles" },
                { value: "Saint Petersburg", label: "Saint Petersburg" },
              ]}
              value={destination}
              onChange={setDestination}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1/2">
            <label
              htmlFor="destination"
              className="block text-sm font-medium mb-1"
            >
              Package Name
            </label>
            <Select
              options={[
                { value: "3-days", label: "3-days" },
                { value: "5-days", label: "5-days" },
                { value: "7-days", label: "7-days" },
              ]}
              value={destination}
              onChange={setDestination}
              placeholder="Select"
            />
          </div>
          <div className="flex gap-2 mb-2">
            <div className="w-1/3">
              <label htmlFor="code" className="block text-sm font-medium">
                Number of Paxs
              </label>
              <input
                type="text"
                id="code"
                className="mt-1 p-2 w-full border rounded"
                placeholder="where to start"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="countryName"
                className="block text-sm font-medium"
              >
                No of Days
              </label>
              <input
                type="text"
                id="countryName"
                className="mt-1 p-2 w-full border rounded"
                placeholder=" No of Days"
                name="pCode"
                value={formData.pCode}
                onChange={
                  handleInputChange
                  // (e) => setCode(e.target.value)
                }
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="countryName"
                className="block text-sm font-medium"
              >
                No of Nights
              </label>
              <input
                type="text"
                id="countryName"
                className="mt-1 p-2 w-full border rounded"
                placeholder="No of Nights"
                name="pCode"
                value={formData.pCode}
                onChange={
                  handleInputChange
                  // (e) => setCode(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-6 gap-2">
          <div className="w-1/2">
            <label htmlFor="destinations" className="block text-sm font-medium">
              Travel Date From
            </label>
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
            <label htmlFor="destinations" className="block text-sm font-medium">
              Travel Date To
            </label>
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
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">
            Accommodation & Transportation Details
          </h3>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Hotel Rating
            </label>
            <Select
              options={[
                { value: "1", label: "Star" },
                { value: "2", label: "Star" },
                { value: "3", label: "Star" },
              ]}
              value={customer}
              onChange={setCustomer}
              placeholder="Select"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Hotel Name
            </label>
            <Select
              options={[
                { value: "1", label: "Star" },
                { value: "2", label: "Star" },
                { value: "3", label: "Star" },
              ]}
              value={customer}
              onChange={setCustomer}
              placeholder="Select"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Room Type
            </label>
            <Select
              options={[
                { value: "1", label: "Star" },
                { value: "2", label: "Star" },
                { value: "3", label: "Star" },
              ]}
              value={customer}
              onChange={setCustomer}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-1/3">
            <label htmlFor="code" className="block text-sm font-medium">
              Number of Rooms
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 p-2 w-full border rounded"
              placeholder=""
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="countryName"
              className="block text-sm font-medium"
            >
              Room Size
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder=""
              name="pCode"
              value={formData.pCode}
              onChange={
                handleInputChange
                // (e) => setCode(e.target.value)
              }
            />
          </div>
          <div className="w-1/3">
            <label
              htmlFor="countryName"
              className="block text-sm font-medium"
            >
              Bed Type
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder=""
              name="pCode"
              value={formData.pCode}
              onChange={
                handleInputChange
                // (e) => setCode(e.target.value)
              }
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">
            Booking Details
          </h3>
        </div>
        <div className="flex gap-2">
          <div className="w-full mb-4">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              className="mt-1 p-2 w-full border rounded"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>

        {/* Add the checkboxes below the status field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Include Policies</label>
          <div className="flex flex-col">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Include Terms and Conditions
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Include Booking policy
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Include Cancellation & Refund policy
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Include Date Change Policy
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Include Booking Person Details
            </label>
          </div>
        </div>
      </form>
      {/* Line with shadow above the buttons */}
      <div className="flex justify-between items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-10">
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            className="bg-red-700 text-white px-4 py-2 rounded shadow"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewQuery;
