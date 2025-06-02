
import { FaChartBar, FaUsers, FaUser, FaFileAlt, FaUserCog } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const Sidebar = () => {
const navigate=useNavigate();
  const {pathname}=useLocation()
const isoverview=pathname=== '/admin';
const isusermanagement=pathname=== '/admin/usermanagement'


  const params = useParams();
  
  console.log("wildcard path:", params["*"]);

  // const token=localStorage.getItem('token')

  const logout=()=>{

    localStorage.clear()
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <div className="h-screen w-64 bg-white flex flex-col justify-between border-r shadow-sm">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center mt-6 mb-8">
          <h1 className="text-2xl font-bold">
            <span className="flex items-center">
              {/* <img src="/logo.svg" alt="logo" className="w-8 h-8 mr-1" /> */}
              Civic<span className="text-sky-500">EYE</span>
            </span>
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 px-6">

          <div className={` ${isoverview ? 'bg-blue-400' : 'hover:bg-gray-100'} flex items-center gap-3  text-black px-4 py-2 rounded-lg hover:bg-slate-200`}>
            <FaChartBar />
            <Link to="/admin" className={` font-medium text-black`}>Overview</Link>
          </div>

          <div className={`${params["*"] === 'complaintpage' ? 'bg-blue-400' : 'bg-white'} flex items-center gap-3 text-black px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer`}>
            <FaUsers />
            <Link to="/admin/complaintpage" className="font-medium">Complaints</Link>
          </div>

          <div className={`${isusermanagement ? 'bg-blue-400' : 'hover:bg-gray-100'} flex items-center gap-3 text-black px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer`}>
            <FaUser />
            <Link to='/admin/usermanagement'><span className="font-medium">User Management</span></Link>
          </div>

           <div className="flex items-center gap-3 text-black px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <FaFileAlt />
            <Link to='/admin/feedback'><span className="font-medium">Feedback</span> </Link>
          </div>
          
        </nav>
      </div>

      {/* Admin Footer */}
      <div className="mb-6 px-6">

        <div className='bg-red-400 text-center justify-center rounded mb-5 h-9'>
        <button onClick={logout} className='text-center justify-center text-white'>logout</button>
        </div>
        <div className="flex items-center justify-center bg-sky-500 text-white py-2 rounded-lg gap-2 cursor-pointer hover:bg-sky-600 transition">
          <FaUserCog />
          <span className="font-semibold">Admin </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
