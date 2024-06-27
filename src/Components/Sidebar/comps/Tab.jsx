import { useDispatch } from "react-redux";

export default function Tab({ data, setType, type }) {

  const dispatch = useDispatch()
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-[#E9F5FE] p-1 gap-x-1 my-6 rounded-full mx-2 max-w-64  shadow-md"
    >
      {data.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            dispatch(setType(tab.value));
            console.log(tab.value)
          }}
          className={`${type === tab.value
              ? "bg-[#0C7FDA] text-white"
              : "bg-transparent text-[#333333]"
            } py-2 px-4 rounded-full transition-all duration-200`}
        >
          {tab?.name}
        </button>
      ))}
    </div>
  );
}