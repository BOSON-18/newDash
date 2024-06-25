import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import { useForm } from 'react-hook-form';
import { getPris } from '../../../api/operations/getPrisg';
import { useSelector } from 'react-redux';

const { RangePicker } = DatePicker;

const PrisForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const { divisionList } = useSelector((state) => state.attendance);
    const [division, setDivision] = useState(null);

    const onSubmit = async (data) => {
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
    };

    // Update the form state when the RangePicker value changes
    const handleDateChange = (dates) => {
        setValue("yearRange", dates);
    };

    return (
        <Space direction="vertical" size={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <RangePicker
                    picker="year"
                    onChange={handleDateChange}
                />
                <input type="hidden" {...register("yearRange", { required: true })} />

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
                                className="text-center"
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
