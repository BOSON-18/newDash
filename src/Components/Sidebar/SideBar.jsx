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
    <div className='flex h-[calc(100vh-3.5rem)] px-4 w-64 flex-col ml-3 rounded-xl border-r-richblack-700 bg-gray-200 py-10 '>

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