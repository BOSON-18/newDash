import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import HashLoader from "react-spinners/PulseLoader";

export const TimeGraph = ({ inTimeData,Title }) => {
    const { loading } = useSelector((state) => state.auth);
    console.log("Time Graph data->",inTimeData)

    const [selectedData, setSelectedData] = useState(null);

    const labels = inTimeData.map(item => item.range);
    const newData = inTimeData.map(item => item.count);

    const generateRandomColors = (numData) => {
        const colors = [];
        for (let i = 0; i < numData; i++) {
            const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.7)`
            colors.push(color);
        }
        return colors;
    }
    
    const handleBarClick = (event, elements) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            setSelectedData(inTimeData[clickedIndex]?.info || null);
        } else {
            setSelectedData(null); // Close popover if clicked outside bars
        }
    }
    const options = {
        maintainAspectRatio: false,
        onClick: handleBarClick,
        scales: {
          x: {
            title: {
              display: true,
              text:Title,
              font: {
                weight: '600',
                size:'16' // Semibold
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'Total Swipes',
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
        <div className='bg-gray-100 rounded-xl my-5'>
            <div className='bg-blue-500 bg-opacity-80 rounded-t-xl p-5 text-center'>
                <h1 className='text-2xl font-bold text-white'>{Title}</h1>
            </div>

            <div className='p-3'>
                {loading ?
                    <div className="flex justify-center items-center h-96">
                        <HashLoader color="#6358DC" />
                    </div> :
                    <React.Fragment>
                        <Bar data={{
                            labels: labels,
                            datasets: [{
                                label: Title,
                                data: newData,
                                backgroundColor: generateRandomColors(newData.length)
                            }]
                        }} height={400} options={options} />
                        {selectedData &&
                            <div className="popover absolute top-1/2 left-1/2 w-[800px]  flex justify-center items-center ">
                                <div className="popover-content bg-white p-4 rounded-lg shadow-lg max-w-screen-md max-h-96 w-full overflow-y-auto">
                                    <button className="close-btn absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setSelectedData(null)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h2 className="text-lg font-semibold mb-2">Details:</h2>
                                    <ul className='w-[500px] my-1'>
                                        {selectedData.map((item, index) => (
                                            <li key={index} className="mb-1  my-1 flex ">
                                                <span className="font-semibold">CCNO:</span> {item.CCNO}, <span className="font-semibold">Name:</span> {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        }
                    </React.Fragment>
                }
            </div>
        </div>
    );
};
