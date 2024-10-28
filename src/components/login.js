import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig/config';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate()

  async function generateKey() {
    return await crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  }



  async function encryptToken(token, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      enc.encode(token)
    );

    return {
      iv: iv,
      encryptedToken: new Uint8Array(encrypted)
    };
  }

  async function saveEncryptedToken(token) {
    const key = await generateKey();
    const { iv, encryptedToken } = await encryptToken(token, key);

    // Convert to base64 for storage
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedTokenBase64 = btoa(String.fromCharCode(...encryptedToken));

    // Save the key, iv, and encrypted token in localStorage
    localStorage.setItem('encryptionKey', JSON.stringify(await crypto.subtle.exportKey('jwk', key)));
    localStorage.setItem('iv', ivBase64);
    localStorage.setItem('encryptedToken', encryptedTokenBase64);
  }

  // console.log(ApiData)

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors('');

    if (username !== '' && password !== '') {
      axios.post(`${api.baseUrl}/signin`, {
        username,
        password
      })
        .then(async (response) => {
          const token = response.data.accessToken;
          await saveEncryptedToken(token);
          navigate('/home')
        })
        .catch(error => {
          setErrors(error.response.data.error.message);
        })
    } else {
      setErrors('username & password cannot empty.')
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    // <div className="min-h-screen flex">
    //   {/* Left side of the page (hidden on small screens) */}
    //   <div className="login-backgroundImage flex-1 hidden lg:flex bg-cover bg-center" style={{
    //     backgroundImage: `url('./assets/images/login/travel.png')`, backgroundRepeat: 'no-repeat',
    //     backgroundSize: '100%',
    //     backgroundPosition: 'top right'
    //   }}>
    //     {/* Add other content on the left side here if needed */}
    //   </div>

    //   {/* Right side of the page (hidden on small screens) */}
    //   <div className="flex-1 hidden lg:flex relative flex items-center justify-center bg-cover bg-center" style={{
    //     backgroundImage: `url('./assets/images/login/travel.png')`, backgroundRepeat: 'no-repeat',
    //     backgroundSize: '100%',
    //     backgroundPosition: 'top right'
    //   }}>
    //     {/* Three red lines from the top */}
    //     <div className="absolute top-0 w-full flex justify-center">
    //       <div className="h-40 w-3 bg-red-600"></div>
    //       <div className="h-40 w-3 bg-red-600 mx-2"></div>
    //       <div className="h-40 w-3 bg-red-600"></div>
    //     </div>

    //     {/* Login form box (visible on large screens) */}
    //     <div className="relative z-10 flex">
    //       {/* Red background half cover (hidden on small screens) */}
    //       <div className="bg-red-600 w-1/2 h-full hidden lg:flex items-center justify-center"></div>

    //       {/* White login box with loginb1.png background and curved corners */}
    //       <div
    //         className="bg-white mr-20 p-8 rounded-lg shadow-lg border-8 border-black relative"
    //         style={{
    //           width: '1200px',
    //           height: '500px',
    //           backgroundImage: `url('/assets/images/login/login-image.png')`,
    //           backgroundSize: 'cover',
    //           backgroundPosition: 'center',
    //           borderRadius: '20px', // Adjusted the border-radius to make the corners curved
    //           overflow: 'hidden', // This ensures the background image fits nicely within the curved corners
    //         }}
    //       >
    //         <div className="flex justify-center w-60 mb-6">
    //           <img src="/assets/images/login/logo2.jpg" alt="Motherson" className="h-12" />
    //         </div>
    //         <form onSubmit={handleLogin}>

    //           {errors ? <p className='text-red-600 text-sm mb-4'>{errors}</p> : ''}
    //           <div className="mb-6">
    //             <label className="block text-gray-700">Username</label>
    //             <input
    //               type="text"
    //               placeholder="Enter Your Username"
    //               className="border border-gray-300 p-2 w-60 rounded"
    //               value={username}
    //               onChange={(e) => {
    //                 setUsername(e.target.value);
    //                 setErrors('')
    //               }}
    //             />
    //           </div>
    //           <div className="mb-6">
    //             <label className="block text-gray-700">Password</label>
    //             <input
    //               type="password"
    //               placeholder="Enter Your Password"
    //               className="border border-gray-300 p-2 w-60 rounded"
    //               value={password}
    //               onChange={(e) => {
    //                 setPassword(e.target.value);
    //                 setErrors('');
    //               }}
    //             />
    //           </div>
    //           <button type="submit" className="bg-red-600 text-white p-2 w-60 rounded">Log In</button>
    //         </form>
    //       </div>
    //     </div>

    //     {/* Red background on the right end (hidden on small screens) */}
    //     <div className="absolute right-0 top-0 h-full w-80 hidden lg:block bg-red-600"></div>
    //   </div>

    //   {/* Responsive login form on small and medium screens */}
    //   <div className="flex-1 lg:hidden flex items-center justify-center" style={{
    //     backgroundImage: `url('/assets/images/login/login-image.png')`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: '100vh', // Make the height fill the viewport
    //     overflow: 'hidden' // Prevent scrolling
    //   }}>
    //     <div
    //       className="bg-white p-6 rounded-lg shadow-lg border-8 border-black relative"
    //       style={{
    //         width: '90%', // Adjust width for small screens
    //         maxHeight: '500px', // Set a maximum height for the form
    //         borderRadius: '20px',
    //         overflow: 'hidden' // Prevent content overflow
    //       }}
    //     >
    //       <div className="flex justify-center w-60 mb-6">
    //         <img src="/logo2.jpg" alt="Motherson" className="h-12" />
    //       </div>
    //       <form onSubmit={handleLogin}>
    //         {errors ? <p className='text-red-600 text-sm mb-4'>{errors}</p> : ''}
    //         <div className="mb-6">
    //           <label className="block text-gray-700">Username</label>
    //           <input
    //             type="text"
    //             placeholder="Enter Your Username"
    //             className="border border-gray-300 p-2 w-full rounded"
    //             value={username}
    //             onChange={(e) => {
    //               setUsername(e.target.value);
    //               setErrors('')
    //             }}
    //           />
    //         </div>
    //         <div className="mb-6">
    //           <label className="block text-gray-700">Password</label>
    //           <input
    //             type="password"
    //             placeholder="Enter Your Password"
    //             className="border border-gray-300 p-2 w-full rounded"
    //             value={password}
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //               setErrors('')
    //             }}
    //           />
    //         </div>
    //         <button type="submit" className="bg-red-600 text-white p-2 w-full rounded">Log In</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen flex">
      {/* Left side of the page (hidden on small screens) */}
      {/* <div className="login-backgroundImage flex-1 hidden lg:flex bg-cover bg-center" style={{
      backgroundImage: `url('./assets/images/login/travel.png')`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      backgroundPosition: 'top right',
    }}> */}
      {/* Add other content on the left side here if needed */}
      {/* </div> */}

      {/* Right side of the page (hidden on small screens) */}
      <div className="flex-1 hidden lg:flex relative flex items-center justify-center bg-cover bg-center" style={{
        backgroundImage: `url('/assets/images/login/travel.png')`, backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'top right'
      }}>

        {/* Login form box (visible on large screens) */}
        <div className="relative z-10 flex">
          {/* Red background half cover (hidden on small screens) */}
          <div className="bg-red-600 w-1/2 h-full hidden lg:flex items-center justify-center"></div>

          {/* White login box with loginb1.png background and curved corners */}
          <div
            className="bg-white mr-20 p-8 rounded-lg shadow-lg border-8 border-black relative"
            style={{
              width: '1300px',
              height: '500px',
              backgroundImage: `url('/assets/images/login/login-image.png')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              borderRadius: '20px', // Adjusted the border-radius to make the corners curved
              overflow: 'hidden', // This ensures the background image fits nicely within the curved corners
            }}
          >
            <div className="flex justify-center w-60 mb-6">
              <img src="/assets/images/login/logo2.jpg" alt="Motherson" className="h-12" />
            </div>
            <form onSubmit={handleLogin}>

              {errors ? <p className='text-red-600 text-sm mb-4'>{errors}</p> : ''}
              <div className="mb-6">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="border border-gray-300 p-2 w-60 rounded"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors('')
                  }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="border border-gray-300 p-2 w-60 rounded"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors('');
                  }}
                />
              </div>
              <button type="submit" className="bg-red-600 text-white p-2 w-60 rounded">Log In</button>
            </form>
          </div>
          {/* Three red lines from the top */}
          <div className="absolute -top-80 w-full flex justify-center">
            <div className="h-80 w-3 bg-red-600"></div>
            <div className="h-80 w-3 bg-red-600 mx-2"></div>
            <div className="h-80 w-3 bg-red-600"></div>
          </div>
        </div>


        {/* Red background on the right end (hidden on small screens) */}
        <div className="absolute right-0 top-0 h-full w-80 hidden lg:block bg-red-600"></div>
      </div>

      {/* Responsive login form on small and medium screens */}
      <div className="flex-1 lg:hidden flex items-center justify-center" style={{
        backgroundImage: `url('/assets/images/login/travel.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Make the height fill the viewport
        overflow: 'hidden' // Prevent scrolling
      }}>
        <div
          className="bg-white p-6 rounded-lg shadow-lg border-8 border-black relative"
          style={{
            width: '90%', // Adjust width for small screens
            maxHeight: '500px', // Set a maximum height for the form
            borderRadius: '20px',
            overflow: 'hidden' // Prevent content overflow
          }}
        >
          <div className="flex justify-center w-60 mb-6">
            <img src="/assets/images/login/logo2.jpg" alt="Motherson" className="h-12" />
          </div>
          <form onSubmit={handleLogin}>
            {errors ? <p className='text-red-600 text-sm mb-4'>{errors}</p> : ''}
            <div className="mb-6">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Enter Your Username"
                className="border border-gray-300 p-2 w-full rounded"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors('')
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="border border-gray-300 p-2 w-full rounded"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors('')
                }}
              />
            </div>
            <button type="submit" className="bg-red-600 text-white p-2 w-full rounded">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
