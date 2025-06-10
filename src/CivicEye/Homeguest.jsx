import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img from './images/antoine-giret-7_TSzqJms4w-unsplash.jpg';
import img2 from './images/naja-bertolt-jensen-BJUoZu0mpt0-unsplash.jpg';
import img3 from './images/premium_photo-1664372599798-a5279e9fdea2.avif';
import { LuCctv } from 'react-icons/lu';
import { ImBin } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdVerifiedUser } from "react-icons/md";
import axios from 'axios';

const Homeguest = () => {
  const [data, setdata] = useState([]);

  const [lengthis, setlengthis] = useState('');

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;


  const feedback = async () => {
    try {
      let response = await axios.get('https://civiceye-150o.onrender.com/civiceye/publicfeed')
      setdata(response.data);
      console.log("data is", response.data);



    }
    catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {
    feedback()
    complaintlength()
  }, [])

  const complaintlength = async () => {
    try {
      let total = await axios.get('https://civiceye-150o.onrender.com/civiceye/complaintlength');
      setlengthis(total.data);
      console.log("length is", total.data);


    }
    catch (error) {
      console.log(error);

    }
  }
  return (
    <div>
      <div className=" bg-gray-50 min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <span className="text-2xl md:text-3xl font-bold flex items-center gap-1 text-gray-800">
            <LuCctv className="text-blue-600 text-3xl" />
            <span>Civic</span>
            <span className="text-blue-600">EYE</span>
          </span>

          <div className="flex items-center gap-6 text-gray-700 text-sm md:text-base">
            <h3 className="cursor-pointer hover:text-blue-600 transition">Home</h3>
            {/* <h3 className="cursor-pointer hover:text-blue-600 transition">My Complaints</h3>
               <h3 className="cursor-pointer hover:text-blue-600 transition">About</h3>
               <h3 className="cursor-pointer hover:text-blue-600 transition">Contact</h3> */}
            {/* <h3 className="cursor-pointer hover:text-blue-600 transition">Logout</h3> */}

            <div className="flex items-center gap-2">
              <FaUserAlt />
              <Link to={'/login'}> <button>Login</button></Link>
            </div>
          </div>
        </nav>

        {/* Carousel */}
        <div className="mt-6 rounded-xl overflow-hidden shadow-md h-[300px] ">
          
<div className="absolute z-50 pt-16 w-full flex flex-col items-center text-center px-4">
  <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl max-w-xl">
    Make Your Voice Heard. Report problems. Help Your City.
  </h3>
  <Link to="/register">
    <button className="mt-4 text-base md:text-lg bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition">
      Register
    </button>
  </Link>
</div>

          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <div>
              <img src={img} alt="First Slide" className="h-[300px] object-cover w-full" />
            </div>
            <div>
              <img src={img2} alt="Second Slide" className="h-[300px] object-cover w-full" />
            </div>
            <div>
              <img src={img3} alt="Third Slide" className="h-[300px] object-cover w-full" />
            </div>
          </Carousel>

        </div>



        {/* Title */}
        <h3 className="text-center mt-8 text-2xl font-semibold text-gray-800">Register Complaints</h3>

        {/* Complaint Buttons */}
        <div className="flex flex-wrap gap-10 justify-center mt-10 bg-white p-6 rounded-xl shadow-lg">
          <button className="h-[200px] w-[200px] rounded-xl bg-white shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-blue-300 transition-transform duration-200 transform hover:scale-105">
            <ImBin className="text-[50px] text-red-500" />
            <span className="font-medium text-gray-700">Complaints Registerd</span>
          </button>

          <button className="h-[200px] w-[200px] rounded-xl bg-white shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-blue-300 transition-transform duration-200 transform hover:scale-105">
            <span className="text-[50px]">🚫</span>
            <span className="font-medium text-gray-700">Public Nuisance</span>
          </button>

          <button className="h-[200px] w-[200px] rounded-xl bg-white shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-blue-300 transition-transform duration-200 transform hover:scale-105">
            <span className="text-[50px]">🚦</span>
            <span className="font-medium text-gray-700">Reward Distributed</span>
          </button>

          <button className="h-[200px] w-[200px] rounded-xl bg-white shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-blue-300 transition-transform duration-200 transform hover:scale-105">
            <span className="text-[50px]">❓</span>
            <span className="font-medium text-gray-700">Impact made</span>
          </button>
        </div>

        {/* Complaint Reports */}
        <h3 className="text-center text-[25px] font-semibold mt-10 text-gray-800">Complaint Reports</h3>

        <div className="flex flex-wrap gap-10 justify-center rounded-xl shadow-md bg-white p-6 mt-5">
          <div className="h-[200px] w-[300px] rounded-xl text-center pt-20 bg-white shadow-md hover:shadow-blue-400 transition-transform duration-200 transform hover:scale-105 text-gray-700">
            <p>Complaint Registered</p>
            <span>{lengthis.complaintCount}</span>
          </div>
          <div className="h-[200px] w-[300px] rounded-xl text-center pt-20 bg-white shadow-md hover:shadow-blue-400 transition-transform duration-200 transform hover:scale-105 text-gray-700">
            <p>Verified Complaints</p>
            <div className="flex justify-center mt-2 text-2xl text-blue-600">
              <MdVerifiedUser />
            </div>
          </div>

          <div className="h-[200px] w-[300px] rounded-xl text-center pt-20 bg-white shadow-md hover:shadow-blue-400 transition-transform duration-200 transform hover:scale-105 text-gray-700">
            <p>Reward Distributed</p>
          </div>
        </div>
        {/* Feedback Section */}
        <div className="mt-16">
          <h3 className="text-center text-[25px] font-semibold text-gray-800 mb-6">User Feedback</h3>

          <div className="w-[300px] mx-auto mb-10">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={4000}
              emulateTouch
              className=""
            >
              {data.map((item, index) => (
                <div key={index} className="flex items-start border p-6 shadow rounded-md bg-white h-60">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="text-xl font-medium">{item.message}</p>
                    <p className="text-lg text-gray-600">—by: {item.userId.name}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Feedback Form */}
          {isLoggedIn && (
            <div className="flex justify-center items-start gap-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="w-[600px]">
                <textarea
                  className="w-full h-32 border rounded-md p-4 text-gray-600 placeholder-gray-400 resize-none shadow"
                  placeholder="Write your feedback"
                ></textarea>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold px-6 py-2 rounded-full mt-4">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>



        {/* Contact Support Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 my-16">
          {/* Support Mail */}
          <div className="flex flex-col md:flex-row border shadow-lg rounded-xl overflow-hidden w-full max-w-[700px]">
            <img
              src={img}
              alt="Support"
              className="h-[250px] w-full md:w-[300px] object-cover"
            />
            <div className="p-6 text-center md:text-left flex flex-col justify-center">
              <MdEmail className="text-4xl mb-3 text-gray-800 mx-auto md:mx-0" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Support Mail</h3>
              <p className="text-gray-600 mb-3">
                For any assistance or inquiries about reporting issues or using Civic Eye,
                feel free to reach out to us.
              </p>
              <p className="text-blue-500 font-bold text-lg">support@civiceye.com</p>
            </div>
          </div>

          {/* Make A Call */}
          <div className="flex flex-col md:flex-row border shadow-lg rounded-xl overflow-hidden w-full max-w-[700px]">
            <img
              src={img}
              alt="Support"
              className="h-[250px] w-full md:w-[300px] object-cover"
            />
            <div className="p-6 text-center md:text-left flex flex-col justify-center">
              <FiPhoneCall className="text-4xl mb-3 text-gray-800 mx-auto md:mx-0" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Make A Call</h3>
              <p className="text-gray-600 mb-3">
                Need immediate assistance or have questions about using Civic Eye? Give us a call,
                and our team will guide you through.
              </p>
              <p className="text-blue-500 font-bold text-lg">+123 456 7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full bg-black text-white px-4 py-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-8 text-sm">

          {/* Phone Numbers */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-cyan-400 pl-2">Phone Numbers</h3>
            <p className="font-medium">Military</p>
            <p>(123) 456-7890</p>
            <p>(123) 456-7540</p>

            <p className="mt-2 font-medium">State Police</p>
            <p>(123) 456-7891</p>

            <p className="mt-2 font-medium">Fire Department</p>
            <p>(123) 456-7892</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-cyan-400 pl-2">Contact Info</h3>
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-base" />
              <span>Softronics</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-base" />
              <span>(+12) 34-5678</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-base" />
              <span>softronics@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-l-4 border-cyan-400 pl-2">Quick Links</h3>
            <ul className="space-y-1">
              {["Home", "Complaints", "Register", "Login"].map((link, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-cyan-400 rounded-full"></div>
                  <span>{link}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6">
          © CivicEye 2025 | Empowering Citizens, Improving Communities.
        </div>
      </div>



    </div>
  );
};

export default Homeguest;
