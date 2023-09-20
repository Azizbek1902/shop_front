import { BiLogOut } from "react-icons/bi";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let keyData = [];
  let valueData = [];
  console.log(state)
  if (state?.parametr) {
    for (const [key, value] of Object.entries(state?.parametr)) {
      keyData.push(key);
      valueData.push(value);
    }
  }
  return (
    <div className="">
      <div className=" absolute top-5 flex justify-center left-0 w-full">
        <button
          className=" outline-none px-5 py-2 rounded-md text-white font-medium
         font-sans bg-[#30B545]"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <BiLogOut size={30} />
        </button>
      </div>
      <div className="flex justify-center mt-28">
        <div className="w-[90%] md:w-[90%]">
          <div className="grid shadowCard rounded-lg grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-md p-3">
              <img
                src={state?.media}
                crossOrigin="anonymous"
                className="rounded-md w-full h-full"
                alt="dsdsd"
              />
            </div>
            <div className="p-5 rounded-md">
              <table className="w-full">
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Nomi:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state?.title}
                  </td>
                </tr>
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Narxi:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state?.price}
                  </td>
                </tr>
                {keyData.map((item, ind) => (
                  <tr className="border-2 border-[#aeaeae]" key={ind + 1}>
                    <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                      <span>{item}:</span>
                    </td>
                    <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                      {valueData[ind]}
                    </td>
                  </tr>
                ))}
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Malumot:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state.desc}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
