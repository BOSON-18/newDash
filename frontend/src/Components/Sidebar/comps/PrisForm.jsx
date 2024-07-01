import React, { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { getPris } from '../../../api/operations/getPrisg';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../store/slices/auth';
import { setDivisionStats } from '../../../store/slices/attendanceSlice';

const { RangePicker } = DatePicker;


const PrisForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    let { divisionList } = useSelector((state) => state.attendance);
    const [division, setDivision] = useState(null);
    const dispatch= useDispatch()

    useEffect(() => {
        const categoryFetch = async () => {
          const result =divisionList;
          divisionList.sort((a, b) => a.division.localeCompare(b.division));
        //   dispatch(setDivisionList(result));
          console.log(result);
        };
    
        categoryFetch();
      }, []);

    const onSubmit = async (data) => {

        dispatch(setLoading(true))
        console.log(data);
        const lowYear = data?.yearRange[0]?.year();
        const highYear = data?.yearRange[1]?.year();

        // Convert years to string and get substrings
        const lowYearSubstr = lowYear.toString().substr(2);
        const highYearSubstr = highYear.toString().substr(2);

        console.log(lowYearSubstr);
        console.log(highYearSubstr);

        const result = await getPris(lowYear, highYear, data.divisionName);
        console.log(result);

        dispatch(setDivisionStats(result?.data?.data))

        dispatch(setLoading(false))
    };

    // Update the form state when the RangePicker value changes
    const handleDateChange = (dates) => {
        setValue("yearRange", dates);
    };

    return (
        <Space direction="vertical" size={12}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center gap-y-5'>

                <label htmlFor='yearRange' className='text-xl'>Year Range:
                <RangePicker
                    picker="year"
                    onChange={handleDateChange}
                    name='yearRange'
                    // minDate={2023}
                    // maxDate={2024}
                />
                <input type="hidden" {...register("yearRange", { required: true })} />
                </label>

                <label htmlFor="division" className="text-xl">
                    Division Name:
                    <br />
                    <select
                        {...register("divisionName", { required: true })}
                        id="division"
                        className="bg-gray-300 p-2 w-full rounded-md shadow-md"
                        onChange={(e) => setDivision(e.target.value)}
                    >
                        <option value={null} defaultValue>
                            Choose A Division
                        </option>
                        {divisionList?.map((division, index) => (
                            <option
                                key={index}
                                className="text-left"
                                value={division.division}
                            >
                                {division.division}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="w-full">
                    <button
                        type="submit"
                        className="p-2 rounded-lg w-full bg-[#0C7FDA] text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Space>
    );
};

export default PrisForm;
