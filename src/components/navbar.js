import { useEffect, useState } from "react";
import { IoMenu, IoClose, IoSearch } from "react-icons/io5";
import { FaEnvelope, FaBell, FaCommentAlt, FaQuestionCircle, FaUserAlt, FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Sidebar from "./sidebar"; // Make sure to adjust the import according to your file structure
import { useNavigate } from "react-router-dom";
import api from "../apiConfig/config";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  // const [user] = useState({
  //   username: "Aditi",
  //   email: "Aditishahi2000@gmail.com",
  //   roles: "Admin",
  // });

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

  const getFirstCharacter = (word) => {
    return word ? word.charAt(0) : '';
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }


  return (
    <div className="flex flex-col md:flex-row">
      {/* Make Navbar sticky */}
      <div className="fixed top-0 left-0 w-full h-12 z-50 bg-gradient-to-r from-[#db272e] to-[#5b2727] p-2 flex justify-between items-center ">
        <div className="flex-1 flex justify-between items-center">
          {/* Left: Logo + Plus Icon + Search Icon */}
          <div className="flex items-center ml-6 space-x-4 md:space-x-8">
            <img
              src="/assets/images/motherson_logo.png"
              alt="Logo"
              className="w-auto h-6 md:w-auto md:h-6 filter brightness-0 invert"
            />
            <span className="text-white text-3xl md:text-3xl">+</span>
            <div className="hidden md:flex items-center">
              <IoSearch className="text-white w-6 h-6" />
            </div>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <IoClose className="w-8 h-8" /> : <IoMenu className="w-8 h-8" />}
            </button>
          </div>

          {/* Right: Profile and Icons */}
          <div className={`flex items-center space-x-4 md:space-x-8 text-white 
            ${isOpen ? "block" : "hidden"} md:flex`}>
            <FaEnvelope className="w-7 h-7 p-1 cursor-pointer 
            hover:bg-white hover:bg-opacity-10 hover:border-gray-200" />
            <FaBell className="w-7 h-7 p-1 cursor-pointer 
            hover:bg-white hover:bg-opacity-10 hover:border-gray-200" />
            <FaCommentAlt className="w-7 h-7 p-1 cursor-pointer 
            hover:bg-white hover:bg-opacity-10 hover:border-gray-200" />
            <FaQuestionCircle className="w-7 h-7 p-1 
            cursor-pointer hover:bg-white hover:bg-opacity-10 hover:border-gray-200" />

            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-500 text-white text-center p-2 cursor-pointer rounded-sm w-8 h-8 
                flex items-center justify-center"
              >
                {getFirstCharacter(user.username)}
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 w-72 bg-gradient-to-b from-[#db272e] to-[#5b2727]  bg-opacity-90 text-white 
                rounded-lg shadow-lg mt-2 mr-4">
                  <div className="flex items-center space-x-2 border-b border-red-500 p-2">
                    <div className="bg-green-500 h-8 w-8 text-white text-center rounded-full">
                      {getFirstCharacter(user.username)}
                    </div>
                    <div>
                      <p>{user.email}</p>
                      <p className="text-sm">{user.roles}</p>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="flex flex-col p-2 space-y-2">
                    <div className="flex items-center space-x-2 hover:bg-red-500 p-2 rounded">
                      <FaUserAlt />
                      <p>My Profile</p>
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-red-500 p-2 rounded">
                      <FaCog />
                      <p>Personalization</p>
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-red-500 p-2 rounded">
                      <FaCog />
                      <p>Portal Settings</p>
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-red-500 p-2 rounded">
                      <FaUserCircle />
                      <p>My Accounts</p>
                    </div>
                    <div className="flex items-center space-x-2 hover:bg-red-500 p-2 rounded"
                      onClick={handleLogout}>
                      <FaSignOutAlt />
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar toggle on mobile */}
      {isOpen && (
        <div className="md:hidden">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default Navbar;