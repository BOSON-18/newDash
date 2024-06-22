import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const GenericForm = () => {
  const { register, handleSubmit } = useForm();
  const { searchType } = useSelector((state) => state.auth);
  return (
    <div>
      <form className="flex flex-col items-center justify-center">
        {searchType === "single" ? (
          <div>
            <input
              type="date"
              {...register("date", { required: true })}
              id="date"
              defaultValue={"2024-01-25"}
              className="bg-gray-300 p-2 rounded-md shadow-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-5">
            <label className="text-xl">
              From: <br />
              <input
                type="date"
                {...register("lowDate", { required: true })}
                id="date"
                defaultValue="2024-03-13"
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
                defaultValue="2024-03-13"
                className="bg-gray-300 p-2 rounded-md shadow-md"
              />
            </label>
          </div>
        )}

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
