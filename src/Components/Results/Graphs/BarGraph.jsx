import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { PulseLoader } from "react-spinners";

const BarGraph = ({ divisionData, state }) => {
  console.log(divisionData?.length);
  const topDiv = divisionData || [];

  console.log(topDiv);

  const { loading } = useSelector((state) => state.auth);

  const generateRandomColors = (numData) => {
    const colors = [];
    for (let i = 0; i < numData; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.7)`;
      colors.push(color);
    }
    return colors;
  };

  const data = {
    labels: topDiv.map((division) => division?.divisionName),
    datasets: [{
      label: "Division Stats",
      data: topDiv.map((division) => Math.ceil(division?.TotalPresent)),
      backgroundColor: generateRandomColors(topDiv.length),
    }],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Division Names',
          font: {
            weight: '600',
            size:'16' // Semibold
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Present',
          font: {
            weight: '600', 
            size:'16'// Semibold
          },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    animation: {
      easing: 'easeInOutCubic',
      delay: 100,
    },
  };

  return (
    <div className='bg-[#F3F5F9] flex flex-col rounded-xl my-5 gap-y-5'>
      <div className='bg-[#63b3ed] opacity-80 rounded-t-xl w-full p-4 text-center'>
        <h1 className='text-2xl font-poppins text-white'>
          {state === "single" ? 'Division Stats' : 'Average Division Stats'}
        </h1>
      </div>
      <div className='w-full h-full p-3'>
        {loading ? (
          <div className="flex w-full h-full justify-center items-center">
            <PulseLoader color="#6358DC" />
          </div>
        ) : (
          <Bar data={data} height={600} options={options} />
        )}
      </div>
    </div>
  );
};

export default BarGraph;
