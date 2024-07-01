import React from 'react'
import { InfoCard } from './InfoCards';
import { AiFillCheckSquare } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";

const Cards = ({TotalEmployees,TotalPresent,state}) => {
    const cards = [
        { title:'Total Employees', value: TotalEmployees, color: '#63b3ed',icon:<FaPeopleGroup/> ,iconColor:"#63b3ed"},
        { title: state==="single"? 'Checked In':"Avg Present", value: TotalPresent, color: '#48bb78',icon:<AiFillCheckSquare/>,iconColor:'#48bb78' },
        { title: state==="single"?'Checked Out':"Avg Check Out\'s", value: 100, color: '#718096',icon:<RxExit/>,iconColor:'#4a5568' },
        { title: state==="single"?'Leave/Absent':'Avg Absent', value: TotalEmployees - TotalPresent, color: '#f56565',icon:<IoIosWarning/>,iconColor:'#f56565' },
      ];
  return (
    <div className='flex  w-full  gap-x-4 bg-[#F3F5F9] rounded-xl p-6 items-center justify-evenly ' >
    {cards.map((card, index) => (
      <InfoCard key={index} title={card.title} value={card.value} color={card.color} icon={card.icon} iconColor={card.iconColor} />
    ))}
  </div>
  )
}

export default Cards