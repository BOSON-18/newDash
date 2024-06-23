import React from "react";
import PieChart from "./Graphs/PieChart";
import BarGraph from "./Graphs/BarGraph";
import { useSelector } from "react-redux";
import { InfoCard } from "./Cards/InfoCards";
import Cards from "./Cards/Cards";

const Results = () => {
  const { TotalEmployees, TotalPresent, InTimeSwipes, DivisionStats } =
    useSelector((state) => state.attendance);
  const { searchType, loading } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-y-5 ">
    {(TotalEmployees > 0 && TotalPresent >= 0) ? (
      <>
        {/* Pie Chart section */}
        {/* <div className="bg-white rounded-lg shadow-md p-3"> */}
          <PieChart TotalEmployees={TotalEmployees} TotalPresent={TotalPresent}  />
        {/* </div> */}

        {/* Bar Graph Division */}
        {/* <div className="bg-white rounded-lg w-[80vw] shadow-md p-4"> */}
          {/* <BarGraph divisionData={divisionData} state={uiState} /> */}
        {/* </div> */}

        {/* InTime Stats */}
        {/* <div className="bg-white rounded-lg shadow-md p-4"> */}
          {/* <TimeGraph inTimeData={inTimeData} /> */}
        {/* </div> */}
      </>
    ) : (
      <div className="bg-white rounded-lg shadow-md p-4">
        Not Enough Data to visualize
      </div>
    )}
  </div>
);
};
  


export default Results;
