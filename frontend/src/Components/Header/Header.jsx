import React from 'react'
import CAT from "../../assets/CAT.png"

const Header = () => {
  return (
    <div className='w-full bg-gray-200 p-2 '>
        <div className='flex  items-center justify-between w-11/12 mx-auto'>
            <div>
                <img src={CAT} alt='CAT_LOGO' width={100}/>
            </div>

            <div>
                <button className='p-2 rounded-lg w-cover bg-[#0C7FDA] text-white'>
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header