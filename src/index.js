import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Login } from './CivicEye/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './CivicEye/Register';
import ComplaintForm from './CivicEye/ComplaintForm';
import ProfileForm from './CivicEye/ProfileForm';
import Complaint from './CivicEye/Complaint';
import { Home } from './CivicEye/Home';
import Homeguest from './CivicEye/Homeguest';
import Admin from './CivicEye/layout/Admin';
import { Allmycomplaints } from './CivicEye/Allmycomplaints';
import About from './CivicEye/About';
import Contact from './CivicEye/Contact';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/report' element={<ComplaintForm></ComplaintForm>}></Route>
        <Route path='/profile' element={<ProfileForm></ProfileForm>}></Route>

        <Route path='/complaintpage' element={<Complaint></Complaint>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/' element={<Homeguest></Homeguest>}></Route>
        <Route path='/allmycomplaints' element={<Allmycomplaints></Allmycomplaints>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>

        <Route path='/admin/*' element={<Admin />}></Route>

      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
