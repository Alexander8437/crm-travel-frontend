import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../apiConfig/config";

const Country = ({ isOpen, onClose }) => {
  const [countryName, setCountryName] = useState();
  const [code, setCode] = useState();
  const [pCode, setPCode] = useState('');
  const [status, setStatus] = useState(true)
  const [user, setUser] = useState({})


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




  const [formData, setFormData] = useState({
    countryName, code, pCode, ipAddress: "", status,
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
    formDatasend.append('countryName', formData.countryName)
    formDatasend.append('code', formData.code)
    formDatasend.append('pCode', formData.pCode)
    formDatasend.append('ipAddress', formData.ipAddress)
    formDatasend.append('status', formData.status)
    formDatasend.append('image', formData.image)
    formDatasend.append('createdby', user.username)
    formDatasend.append('modifiedby', user.username)
    formDatasend.append('isdelete', false)

    // for (let [key, value] of formDatasend.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    await axios.post(`${api.baseUrl}/country/create`, formDatasend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
      .then(async (response) => {
        alert("Country created...");
        setFormData({
          countryName: "", code: "", pCode: "", ipAddress: "",
          image: null,

        })
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    axios.get(`${api.baseUrl}/ipAddress`)
      .then((response) => {
        setFormData({
          ...formData, "ipAddress": response.data
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-200 shadow-lg transform transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-[850px]"
        } mt-4 sm:mt-8 md:mt-12 w-full sm:w-[calc(100%-120px)] md:w-[800px]`}
    >
      {/* "X" button positioned outside the form box */}
      <button
        onClick={() => onClose(true)}
        className="absolute top-[12px] left-[-22px]  text-white  bg-red-700 square w-10 h-10 py-auto border border-1 border-gray-500 hover:border-gray-900 hover:text-gray-900"
      >
        X
      </button>
      <div className="flex justify-between items-center p-4 pl-8 bg-white shadow-md">
        <h2 className="text-lg font-bold text-black">New Country</h2>
      </div>
      {/* Line below the title with shadow */}
      <div className="border-b border-gray-300 shadow-sm"></div>

      <form className="p-4">
        <div className="mb-6">
          <h3 className="bg-red-700 text-white p-2 rounded">
            Basic Information
          </h3>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="w-1/2">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Country Name
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., India, Russia..."
              name="countryName"
              value={formData.countryName}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-1/4">
            <label htmlFor="code" className="block text-sm font-medium">
              Country Code
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., IND, AUS, or USA"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="countryName" className="block text-sm font-medium">
              Country Ph Code
            </label>
            <input
              type="text"
              id="countryName"
              className="mt-1 p-2 w-full border rounded"
              placeholder="eg., +91, +1..."
              name="pCode"
              value={formData.pCode}
              onChange={handleInputChange
                // (e) => setCode(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2 mb-4">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select id="status" className="mt-1 p-2 w-full border rounded" name="status" value={formData.status} onChange={handleInputChange}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="w-1/2 mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Image
            </label>
            <input
              type="file"
              className="w-full text-gray-700 mt-1 p-[4.5px] bg-white rounded border border-gray-200"
              name="image"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
      {/* Line with shadow above the buttons */}
      <div className="flex justify-between items-center p-3 bg-white shadow-lg rounded w-full fixed bottom-12">
        <div className="flex justify-start space-x-4">
          <button type="button" className="bg-red-700 text-white px-4 py-2 rounded shadow"
            onClick={handleSubmit}>
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

export default Country;