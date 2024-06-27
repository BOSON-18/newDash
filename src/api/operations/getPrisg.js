import { setLoading } from "../../store/slices/auth";
import { apiConnector } from "../apiConnector";
import { dataEndpoints } from "../apis";

export const getPris = async (lowYear, highYear, divisionName) => {
    const { GET_PRISG } = dataEndpoints;
    console.log("Parameters ->", lowYear, highYear, divisionName);
    const lowDate=`${lowYear}-04-01`;
    const highDate=`${highYear}-03-31`

    try {

        setLoading(true)
        const result = await apiConnector(
            'GET',
            GET_PRISG,
            {lowDate: lowYear, highDate: highYear, divisionName: divisionName },
            {},
            { params: { lowDate: lowDate, highDate: highDate, divisionName: divisionName } }
        );

        console.log("API Response ->", result);
        setLoading(false)
        return result;


    } catch (error) {
        console.error('Error fetching PRIS data:', error);
        throw error;  
    }
};
