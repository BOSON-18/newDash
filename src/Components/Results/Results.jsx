import React, { useEffect, useState } from "react";
import PieChart from "./Graphs/PieChart";
import BarGraph from "./Graphs/BarGraph";
import { useSelector } from "react-redux";
import { InfoCard } from "./Cards/InfoCards";
import Cards from "./Cards/Cards";
import { TimeGraph } from "./Graphs/TimeGraph";
import Table from "./Table/Table";
import Header from "../Header/Header";

const Results = () => {
  const { TotalEmployees, TotalPresent, InTimeSwipes, DivisionStats ,OutTimeSwipes} =
    useSelector((state) => state.attendance);
  const { searchType, loading, formType } = useSelector((state) => state.auth);
  const [uiState, setUiState] = useState(searchType);
  const [output, setOutput] = useState(formType);

  useEffect(() => {
    setUiState(searchType);
    setOutput(formType);
    // console.log(output)
    // console.log("Form Type",formType)
  }, [loading]);

  return (
    <div className="flex flex-col gap-y-5">

      {/* <Header/> */}
      {output === "custom" ? (
        TotalEmployees >= 0 && TotalPresent >= 0 ? (
          <>
            {/* Pie Chart section */}
            <div className="bg-gray-200 rounded-lg shadow-md p-3">
              <PieChart
                TotalEmployees={Math.ceil(TotalEmployees)}
                TotalPresent={Math.ceil(TotalPresent)}
                state={uiState}
              />
            </div>

            {/* Bar Graph Division */}
            <div className="bg-gray-200 rounded-lg shadow-md p-3">
              <BarGraph divisionData={DivisionStats || 0} state={uiState} />
            </div>

            {/* InTime Stats */}
            <div className="bg-gray-200 rounded-lg shadow-md p-3">
              <TimeGraph inTimeData={InTimeSwipes} state={uiState} Title={"In Time Statistics"}/>
            </div>

            <div className="bg-gray-200 rounded-lg shadow-md p-3">
              <TimeGraph inTimeData={OutTimeSwipes} state={uiState} Title={"Out Time Statistics"} />
            </div>

          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4">
            Not Enough Data to visualize
          </div>
        )
      ) : (
        <Table /> 
      )}
    </div>
  );
};

export default Results;
