
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import HashLoader from "react-spinners/PulseLoader";


const BarGraph = (divisionData, state) => {
  console.log(divisionData?.divisionData.length)
  let topDiv = [];

  for (let i = 0; i < divisionData?.divisionData?.length; i++) {
    topDiv[i] = divisionData?.divisionData[i];
  }
  console.log(topDiv)

  // console.log("Bar graph data", topDiv)

  const { loading } = useSelector((state) => state.auth)
  const generateRandomColors = (numData) => {

    const colors = [];
    for (let i = 0; i < numData; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.7)`

      colors.push(color);
    }
    return colors
  }

  const data = {
    labels: topDiv.map((division, index) => (division?.divisionName.substr(0))),
    datasets: [{
      label: "Division Stats",
      data: topDiv.map((division, index) => (Math.ceil(division?.TotalPresent))),
      backgroundColor: generateRandomColors(topDiv.length)
    }
    ]
  }


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
    }, animation: {
      easing: 'easeInOutCubic',
      delay: 100,
    },
  };
  return (
    <div className='bg-[#F3F5F9]  flex flex-col   rounded-xl my-5 gap-y-5'>
      <div className='bg-[#63b3ed] opacity-80 rounded-t-xl w-full p-4 text-center'>
        <h1 className='text-2xl font-poppins text-white'>{state === "single" ? 'Division Stats' : 'Average Division Stats'}</h1>
      </div>

      <div className='w-full h-full p-3'>
        {loading ? <div className=" flex left-1/2 w-full h-full top-10 justify-center items-center  mx-auto"><HashLoader color="#6358DC" /></div> :
          <Bar data={data} height={600} options={options} />
        }
      </div>
    </div>
  )
}

export default BarGraph
