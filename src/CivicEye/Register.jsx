import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [inputs, setInputs] = useState({})
  const navigate=useNavigate();

  const handlechange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
    console.log(inputs);
  }

  const handlesubmit= async(event)=>{
    event.preventDefault()
    try{
      let response=await axios.post('https://civiceye-150o.onrender.com/civiceye/register',inputs)
      toast.success('Success login')
      navigate('/login')
      console.log(response.data);
      // setInputs(response.data)
      setInputs({});
      

    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message); 

      
    }

  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">

      <ToastContainer position="top-center" autoClose={3000} />

        {/* Left Info Panel */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Welcome to Civic Eye</h2>
          <p className="text-center text-sm">
            Your platform to report, track and resolve public issues with ease.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 md:w-1/2 w-full h-[500px]">
          <h3 className="text-xl font-semibold mb-6 text-center mt-[6px]">Sign In</h3>

          <form onSubmit={handlesubmit} className="flex flex-col gap-4">
            <input
              onChange={handlechange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              type="text"
              name='name'
              required
            />
            <input
              onChange={handlechange}
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Mobile number'
              required
            pattern="[789][0-9]{9}"
              title='Enter a valid 10-digit mobile number starting with 7, 8, or 9'
              name='number'
              type="tel" />
            <input
              onChange={handlechange}
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='date of birth'
              name='dob'
              type="date" />
            <input
              onChange={handlechange}
              className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Email'
              name='email'
              required
              type="email" />
            <input
              onChange={handlechange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              name='password'
              type="password"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <div className="text-right mt-2">
            <button className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
