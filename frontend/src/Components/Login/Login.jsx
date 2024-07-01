import React from "react";
import { useForm } from "react-hook-form";
import Typewriter from "typewriter-effect";
import { FaUserAlt } from "react-icons/fa";
import { SiMonkeytie } from "react-icons/si";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lotties/loginLottie.json"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/operations/authApi";


 
const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: errors,
  } = useForm();

  const dispatch=useDispatch();
  const {loading} = useSelector((state)=>state.auth)
  const navigate=useNavigate()
  console.log(loading)

 


  const onSubmit =async(data) => {
    console.log(data);

    //api call

    login(data.loginId,data.password,navigate,dispatch)

    //reset value of fields
    

    resetField("loginId","");
    resetField("password","")
  };
  return (
    <>
      {/* {loading && <div className="absolute flex left-1/2 justify-center items-center mx-auto"><HashLoader color="#6358DC" /></div>} */}
    <div className={`flex flex-row justify-between items-center h-screen w-10/12 p-14 gap-x-8 mx-auto my-auto ${loading?("blur-sm"):("blur-none")}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8 w-2/4 p-10 py-16  rounded-xl"
      >
        <div className="gap-y-3">
          <h2 className="text-4xl font-semibold">Welcome to</h2>
          <h1 className="font-poppins font-extrabold text-4xl text-[#6358DC]">
            <Typewriter
              options={{
                strings: ["Attendance Dashboard"],
                autoStart: true,
                loop: true,
                pauseFor: 10000,
              }}
            />
          </h1>
        </div>

        <label htmlFor="loginId" className="font-semibold">
          {" "}
          LoginId:
          <br />
          <div className="absolute mt-3 mx-3">
            <FaUserAlt />
          </div>
          <motion.input
           
            {...register("loginId", { required: true })}
            id="loginId"
            placeholder="Enter LoginId Here"
            type="text"
            className="bg-[#ECECEC] px-14 py-2  w-full rounded-lg shadow-md outline-none"
          />
          {errors.loginId && (
            <span className="text-red-500">Please Enter Valid LoginId</span>
          )}
        </label>

        <label className="font-semibold">
          Password:
          <br />
          <div className="absolute mt-3 mx-3 text-xl">
            <SiMonkeytie />
          </div>
          <motion.input
            autoComplete="off"
            {...register("password", { required: true })}
            id="password"
            type="password"
            placeholder="Enter Password"
            className="bg-[#ECECEC] px-14 py-2  w-full rounded-lg shadow-md outline-none"
          />
          {errors.password && (
            <span className="text-red-500">Please Enter a valid Password</span>
          )}
        </label>

        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{  duration:0.2 }}
          type="submit"
          className="bg-[#6358DC] w-full shadow-md rounded-lg px-2 py-2 text-white outline-none"
        >
          {" "}
          Submit
        </motion.button>
      </form>

      <div>
        <Lottie animationData={loginLottie} className="w-[500px]" />
      </div>
    </div>
    </>
  );
};

export default Login;