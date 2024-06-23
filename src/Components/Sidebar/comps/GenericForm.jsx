import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists } from "../../../api/operations/getList";
import {
  setDivisionList,
  setDivisionStats,
  setInTimeSwipes,
  setSectionList,
  setTotalEmployees,
  setTotalPresent,
} from "../../../store/slices/attendanceSlice";
import { getData } from "../../../api/operations/getData";
import { setLoading } from "../../../store/slices/auth";

const GenericForm = () => {
  const { register, handleSubmit } = useForm();
  const { searchType } = useSelector((state) => state.auth);
  const [division, setDivision] = useState(null);
  // const [section, setDivision] = useState(null);
  const dispatch = useDispatch();
  const { divisionList, sectionList } = useSelector(
    (state) => state.attendance
  );
  const [defaultDate, setDefaultDate] = useState("2024-03-13");

  useEffect(() => {
    const categoryFetch = async () => {
      const result = await fetchLists();
      dispatch(setDivisionList(result));
      console.log(result);
    };

    categoryFetch();
  }, []);

  useEffect(() => {
    console.log(division);
    console.log(divisionList);
    let list = [];
    const findSections = (division) => {
      list = divisionList.filter((item) => item.division === division);
      console.log(list[0]?.section);

      dispatch(setSectionList(list[0]?.section));
      console.log(list[0]?.section[1]);
    };
    console.log("Finding Division in list");
    findSections(division);
  }, [division]);

  const onSubmit = async (data) => {
    console.log(data);

    //set Loading true
     dispatch(setLoading(true))
    let lowDate;
    let highDate;
    searchType === "single"
      ? ((lowDate = data.date), (highDate = data.date))
      : ((lowDate = data.lowDate), (highDate = data.highDate));

    const response = !data.divisionName
      ? await getData(lowDate, highDate)
      : await getData(lowDate, highDate, data.divisionName, data.sectionName);
    console.log("Printing response", response);
    dispatch(setTotalEmployees(response?.Total[0]?.TotalEmployees));
    dispatch(setTotalPresent(response?.TotalPresent[0]?.TotalPresent));
    dispatch(setInTimeSwipes(response?.InTimeSwipes));
    dispatch(setDivisionStats(response?.DivisionStats));

    dispatch(setLoading(false))
  };
  return (
    <div>
      <form
        className="flex flex-col items-center justify-center gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {searchType === "single" ? (
          <div>
            <label htmlFor="date" className="text-xl">
              Date:
              <input
                type="date"
                {...register("date", { required: true })}
                id="date"
                defaultValue={defaultDate}
                onChange={(e) => setDefaultDate(e.target.value.toString())}
                className="bg-gray-300 p-2 rounded-md shadow-md"
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-5">
            <label className="text-xl">
              From: <br />
              <input
                type="date"
                {...register("lowDate", { required: true })}
                id="date"
                defaultValue={defaultDate}
                className="bg-gray-300 p-2 rounded-md shadow-md"
              />
            </label>

            <label className="text-xl">
              To:
              <br />
              <input
                type="date"
                {...register("highDate", { required: true })}
                id="date"
                defaultValue={defaultDate}
                className="bg-gray-300 p-2 rounded-md shadow-md"
              />
            </label>
          </div>
        )}

        <label htmlFor="division" className="text-xl">
          {" "}
          Division Name:
          <br />
          <select
            {...register("divisionName")}
            id="division"
            className="bg-gray-300 p-2 w-full rounded-md shadow-md"
            onChange={(e) => {
              setDivision(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value={null} defaultValue>
              Choose A Division
            </option>
            {divisionList?.map((division, index) => {
              return (
                <option
                  key={index}
                  className="text-center"
                  value={division.division}
                >
                  {division.division}
                </option>
              );
            })}
          </select>
          {sectionList && (
            <label htmlFor="section" className="my-3">
              Section Name:
              <br />
              <select
                id="section"
                name="section"
                className="bg-gray-300 p-2 w-full rounded-md shadow-md"
                {...register("sectionName")}
                onChange={(e) => {
                  setSection(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value={null} defaultValue>
                  Choose A Section
                </option>

                {sectionList.length > 1 &&
                  sectionList.map((section, index) => {
                    return (
                      <option
                        className="text-center"
                        value={section}
                        key={index}
                      >
                        {section}
                      </option>
                    );
                  })}
              </select>
            </label>
          )}
        </label>

        <div className="w-full ">
          <button
            type="submit"
            className="p-2 rounded-lg w-full bg-[#0C7FDA] text-white "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenericForm;
