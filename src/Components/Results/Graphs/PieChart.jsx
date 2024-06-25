import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { InfoCard } from '../Cards/InfoCards';
import { useSelector } from 'react-redux';
import { AiFillCheckSquare } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import { PacmanLoader } from 'react-spinners';

const PieChart = ({TotalEmployees,TotalPresent,state}) => {

    const {loading}= useSelector((state)=>state.auth)
    const cards = [
        { title:'Total Employees', value: TotalEmployees, color: '#63b3ed',icon:<FaPeopleGroup/> ,iconColor:"#63b3ed"},
        { title: state==="single"? 'Checked In':"Avg Present", value: TotalPresent, color: '#48bb78',icon:<AiFillCheckSquare/>,iconColor:'#48bb78' },
        // { title: state==="single"?'Checked Out':"Avg Check Out\'s", value: TotalPresent, color: '#718096',icon:<RxExit/>,iconColor:'#4a5568' },
        { title: state==="single"?'Leave/Absent':'Avg Leave', value: TotalEmployees - TotalPresent, color: '#f56565',icon:<IoIosWarning/>,iconColor:'#f56565' },
      ];

    const chartData = {
        labels: state==="single"? ['Total Present', 'Absent/Leave']:['Average Present',"Average Leave"],
        datasets: [
          {
            data: [Math.ceil(TotalPresent), Math.ceil(TotalEmployees - TotalPresent)],
            backgroundColor: ['#63b3ed', '#f56565'],
          },
    
        ],
        hoverOffset: 0, // Disable segment highlighting on hover
            borderWidth: 0, // Remove the border
      };

      const options = {
        maintainAspectRatio: false, // Allow chart to resize dynamically
        plugins: {
          legend: {
            display: true, // Hide the legend
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          onComplete: () => { },
          // delay: 100, // Add delay
          easing: 'easeInOutCubic',
        },
      };
    //   const {loading} =useSelector((state)=>state.auth)
    return (
        <div className='flex gap-x-3 w-full' >
          <div >
            <div className='h-[300px] w-[300px] bg-gray-50 items-center justify-center flex flex-col p-4 rounded-xl'>
            { loading? <div className=" flex left-1/2 h-full top-10 justify-center items-center  mx-auto"><PacmanLoader color="#6358DC" /></div>:
    
              <Doughnut data={chartData} options={options}    />
            }
            </div>
          </div>
          <div className='flex w-full gap-x-4  rounded-xl  items-center justify-evenly ' >
            {cards.map((card, index) => (
              <InfoCard key={index} title={card.title} value={card.value} color={card.color} icon={card.icon} iconColor={card.iconColor} />
            ))}
          </div>
        </div>
      );
}

export default PieChart