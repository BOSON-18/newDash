import React, { useEffect, useState } from "react";
import PieChart from "./Graphs/PieChart";
import BarGraph from "./Graphs/BarGraph";
import { useSelector } from "react-redux";
import { InfoCard } from "./Cards/InfoCards";
import Cards from "./Cards/Cards";
import { TimeGraph } from "./Graphs/TimeGraph";

const Results = () => {
  const { TotalEmployees, TotalPresent, InTimeSwipes, DivisionStats } =
    useSelector((state) => state.attendance);
  const { searchType, loading } = useSelector((state) => state.auth);
  const [uiState, setUiState] = useState(searchType);

  useEffect(() => {
    setUiState(searchType);
  }, [loading]);
  return (
    <div className="flex flex-col gap-y-5 ">
    {(TotalEmployees >= 0 && TotalPresent >= 0) ? (
      <>
        {/* Pie Chart section */}
        <div className="bg-gray-200 rounded-lg shadow-md p-3">
          <PieChart TotalEmployees={Math.ceil(TotalEmployees)} TotalPresent={Math.ceil(TotalPresent)} state={uiState}  />
        </div>

        {/* Bar Graph Division */}
        <div className="bg-gray-200 rounded-lg  shadow-md p-3">
          <BarGraph divisionData={DivisionStats || 0} state={uiState} />
        </div>

        {/* InTime Stats */}
        <div className="bg-gray-200 rounded-lg shadow-md p-3">
          {/* <TimeGraph inTimeData={inTimeData} /> */}
          <TimeGraph inTimeData={InTimeSwipes} state={uiState}/>
        </div>
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
