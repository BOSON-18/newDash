import React from 'react';
import Tab from './comps/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchType, setFormType } from '../../store/slices/auth';
import GenericForm from './comps/GenericForm';
import PrisForm from './comps/PrisForm';
import CAT from "../../assets/CAT.png";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const tabData = [
    {
      id: 1,
      name: 'Date',
      value: 'single',
    },
    {
      id: 2,
      name: 'Duration',
      value: 'range',
    },
  ];

  const FormType = [
    {
      id: 1,
      name: 'Custom',
      value: 'custom'
    },
    {
      id: 2,
      name: 'Yearly',
      value: 'yearly'
    }
  ];

  const { searchType, formType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from Redux state
    dispatch(setFormType(null));
    dispatch(setSearchType(null));

    // Clear token from localStorage
    localStorage.removeItem('token');

    // Navigate to login page
    navigate('/');
  };

  return (
    <div className='flex h-screen px-4 md:w-64 flex-col ml-3 gap-y-5 rounded-xl border-r-richblack-700 bg-gray-200 py-10'>

     
      {/* Tab for FormType */}
      <Tab data={FormType} setType={setFormType} type={formType} />

      {/* Render GenericForm or PrisForm based on formType */}
      {formType === 'custom' ? (
        <div>
          {/* Tab for searchType */}
          <Tab data={tabData} setType={setSearchType} type={searchType} />
          <GenericForm />
        </div>
      ) : (
        <PrisForm />
      )}

      {/* Logout Button */}
      <button className='p-2 rounded-lg w-full bg-[#0C7FDA] text-white mt-8' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SideBar;
