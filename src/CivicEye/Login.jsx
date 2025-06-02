import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const navigate=useNavigate();

  const[check,setcheck]=useState({});

  const handlechange=(event)=>{
    setcheck({...check,[event.target.name]:event.target.value})

  }

  const handlesubmit=async(event)=>{
    event.preventDefault();
    try{
      let response=await axios.post('http://localhost:8000/civiceye/login',check)
      toast.success("login success")
      console.log(response.data);

      const {token,user}=response.data
      localStorage.setItem('token',token)
      localStorage.setItem('role',user.role)
      console.log(user.role);
      

      setTimeout(()=>{
        if(user.role==='admin'){
          navigate('/admin')
        }
        else{
        navigate('/')
        }

      },1000)

      


    }
    catch(error){
      console.log(error);
      if (error.response) {
        if (error.response.status === 404) {
          toast.error('Invalid user. Please check your email.');
        } else {
          toast.error(error.response.data.message || 'Login failed');
        }
      } else {
        toast.error('Network error, please try again.');
      }
    }
  }

  // const logout=()=>{

  //   localStorage.clear()
  //   navigate('/login')
  // }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
      <ToastContainer position='top-center'></ToastContainer>
        
        {/* Left Info Panel */}
        <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Welcome to Civic Eye</h2>
          <p className="text-center text-sm">
            Your platform to report, track and resolve public issues with ease.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 md:w-1/2 w-full h-[500px]">
          <h3 className="text-xl font-semibold mb-6 text-center mt-[100px]">Sign In</h3>

          <form onSubmit={handlesubmit} className="flex flex-col gap-4">
            <input
            onChange={handlechange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              name='email'
              type="email"
            />
            <input
            onChange={handlechange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              name='password'
              type="password"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          <div className='text-center'>
            <Link to={'/register'}><h4>create an new Account !</h4></Link> 
          </div>

          <div className="text-right mt-2">
            <button className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
