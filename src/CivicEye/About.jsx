import React from 'react';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">

      <div>
        <Link to={'/home'}><span className='text-[50px]'><IoArrowBackCircle /></span></Link> 
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About CivicEye</h1>
        <p className="text-gray-700 text-lg mb-4">
          <strong>CivicEye</strong> is a digital platform dedicated to empowering citizens by providing a simple and secure way to register complaints and raise concerns about civic issues.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Whether it's reporting potholes, garbage mismanagement, public safety issues, or administrative negligence — CivicEye helps your voice be heard by the right authorities.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Users can easily upload complaints with relevant details and attachments (like photos or documents), track complaint status, and receive updates — all in one place.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">Key Features:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Easy complaint registration with file uploads</li>
            <li>Track your complaint status in real-time</li>
            <li>Secure and user-friendly interface</li>
            <li>Feedback and support built-in</li>
          </ul>
        </div>
        <div className="mt-10 text-gray-600 text-sm">
          <p>Have questions or suggestions? Contact us through our support page. Together, let's make our communities better!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
