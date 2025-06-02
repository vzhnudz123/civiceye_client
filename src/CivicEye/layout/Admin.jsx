import React from 'react'
import Sidebar from '../Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Complaint from '../Complaint'
import { Usermanagement } from '../Usermanagement'
import Feedback from '../Feedback'


function Admin() {
    return (
        <div className='flex'>
            <Sidebar />
            <div>
                <Routes>
                {/* initiali kanikknde 1st element */}
                    <Route index element={<Dashboard />} /> 
                    <Route path='/complaintpage' element={<Complaint></Complaint>} />
                    <Route path='/usermanagement' element={<Usermanagement></Usermanagement>} />
                    <Route path='/feedback' element={<Feedback></Feedback>} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin
