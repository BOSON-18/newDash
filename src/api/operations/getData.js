import { dataEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const { GET_GEN_DATA, GET_DIV_DATA } = dataEndpoints;

export const getData = async (lowDate, highDate, divisionName, sectionName) => {
  let result = [];

  try {
    sectionName = sectionName === "Choose A Section" ? null : sectionName;
    divisionName = divisionName === "Choose A Division" ? null : divisionName;
    console.log('Checking for incoming data->', lowDate, highDate, divisionName, sectionName);

    const endpoint = divisionName ? GET_DIV_DATA : GET_GEN_DATA;
    const params = {
      lowDate,
      highDate,
      ...(divisionName && { divisionName }),
      ...(sectionName && { sectionName })
    };
    
    const response = await apiConnector('GET', endpoint, {}, divisionName ? { divisionName } : {}, { params });

    console.log(`Printing response for ${divisionName ? "DIV_API" : "GEN_API"}->`, response);
    result = response?.data?.data?.[0] || [];
  } catch (error) {
    console.error("GET DATA API ERROR->", error);
    toast.error("Something Went Wrong While Fetching Data");
  }

  console.log(result);
  return result;
};
