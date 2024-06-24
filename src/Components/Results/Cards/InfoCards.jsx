import React from "react";

export function InfoCard({ title, value, color, icon, iconColor }) {
  const backgroundColor = `${iconColor}40`;

  return (
    <div className="bg-gray-50  rounded-2xl w-full h-[220px]" >
    <div className=" flex flex-col gap-y-3 ">
      <div className="text-4xl p-2 rounded-t-zx2xl "  style={{ color: iconColor , backgroundColor:backgroundColor }}>
        {icon}
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
      <div className="text-2xl text-balance font-extralight  ">
        {title}
      </div>
     
      <div className="font-poppins text-2xl rounded-full h-24 w-24 flex items-center justify-center p-3" style={{ backgroundColor: iconColor }}>
  <span className={`inline-block rounded-full bg-opacity-15 text-white p-3`}>
    {value}
  </span>
</div>
      </div>
    </div>
  </div>
  );
}