import React from 'react'
import Tab from './comps/Tab'
import { useSelector } from 'react-redux';
import { setSearchType } from '../../store/slices/auth';
import GenericForm from './comps/GenericForm';

const SideBar = () => {

  const tabData = [
    {
      id: 1,
      name: 'Single',
      value: 'single',
    },
    {
      id: 2,
      name: 'Range',
      value: 'range',
    },
  ];

  const { searchType } = useSelector((state) => state.auth);
  return (
    <div className='flex flex-col bg-[#F3F5F9] rounded-xl text-gray-700 shadow-2xl p-8 fixed left-5 top-5 gap-y-5 h-[90vh] '>

      {/* Tab */}
      <Tab tabData={tabData} setSearchType={setSearchType} searchType={searchType} />


      {/* Date Inputs */}

      

      {/* Division */}

      {/* Sections */}

      <GenericForm/>
    </div>
  )
}

export default SideBar