const BASE_URL = "http://localhost:4000";

export const authEndPoints = {
  LOGIN_API: BASE_URL + "/login",
};

export const dataEndpoints = {
  GET_GEN_DATA: BASE_URL + "/dashboard",

  GET_DIV_DATA: BASE_URL + "/dashboard/divSearch",
  GET_LIST: BASE_URL + "/dashboard/getDivisions",
};
