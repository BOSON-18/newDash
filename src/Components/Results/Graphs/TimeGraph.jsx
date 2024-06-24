import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import HashLoader from "react-spinners/PulseLoader";

export const TimeGraph = ({ inTimeData }) => {

    console.log("data of time graph", (inTimeData));
const {loading} =useSelector((state)=>state.auth)

console.log(inTimeData)
    let labels = [];
    let newData=[]
    for(let i=0;i<inTimeData.length;i++){
        labels.push(inTimeData[i]?.range);
        newData.push(inTimeData[i]?.count)
    }
  

    const generateRandomColors = (numData) => {
        const colors = [];
        for (let i = 0; i < numData; i++) {
          const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.7)`
    
          colors.push(color);
        }
        return colors
      }

    const Chartdata = {
        labels: labels,
        datasets: [{
            label: "In Time Stats",
            data: newData,
            backgroundColor: generateRandomColors( Object.values(newData).length)
          }
          ]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        plugins: {
          legend: {
            display: false, 
          },
        },  animation: {
           easing: 'easeInOutCubic',
          // delay: 100, 
        },
      };

    return (
        <div className='bg-[#F3F5F9]  flex flex-col   rounded-xl my-5 gap-y-5'>
        <div className='bg-[#63b3ed] opacity-80 rounded-t-xl  p-5 text-center'>
          <h1 className='text-2xl font-poppins text-white'>In Time Stats</h1>
        </div>
  
        <div className='w-full p-5'>
        { loading? <div className=" flex left-1/2 w-full h-[400px] top-10 justify-center items-center  mx-auto"><HashLoader color="#6358DC" /></div>:

          <Bar data={Chartdata} height={400} options={options} />
          
        }</div>
  
      </div>
    );
};