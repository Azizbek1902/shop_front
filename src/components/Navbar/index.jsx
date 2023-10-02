import { AiFillShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BiLoader, BiMailSend } from "react-icons/bi";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { RiLuggageCartLine, RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";
import orderService from "../../services/order";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default ({ open, onclik, pageFunk }) => {
  const [defaultStatus, setDefaultStatus] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [statistic, setStatistic] = useState({
    new: 0,
    inProgress: 0,
    sending: 0,
    success: 0,
    cansel: 0,
  });
  useEffect(() => {
    const data = { status: defaultStatus };
    orderService
      .getStatistic(data)
      .then((res) => {
        setStatistic(res);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <div className="z-30">
      <div className="relative">
        <div onClick={onclik} className="absolute top-3 right-4 bg-none">
          {open ? (
            <RiMenuFoldFill size={25} color="black" />
          ) : (
            <RiMenuUnfoldFill size={25} color="black" />
          )}
        </div>
        <div
          className={`overflow-hidden pt-20 flex ${
            open ? "justify-start pl-5" : "justify-center"
          }`}
        >
          <ul className="block">
            <li
              onClick={() => {
                pageFunk("new");
                setDefaultStatus(0);
                setRefresh(1);
              }}
              className="pb-5 pr-3 text-xl relative font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <RiLuggageCartLine size={25} color="#fff" />
                {open ? "Yangi" : <></>}
              </NavLink>
              <p className="absolute -top-3 shadoww bg-[#e27619] w-[40px] h-[35px] text-white flex items-center justify-center text-center rounded-full right-2">
                {statistic.new}
              </p>
            </li>
            <li
              onClick={() => {
                pageFunk("sending");
                setDefaultStatus(1);
                setRefresh(2);
              }}
              className="pb-5 pr-3 text-xl relative font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active1 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <BiLoader size={25} color="#fff" />
                {open ? "Tayyorlanmoqda" : <></>}
              </NavLink>
              <p className="absolute -top-3 shadow2 bg-[#2545ff] text-white  w-[40px] h-[35px] flex items-center justify-center  text-center rounded-full right-2">
                {statistic.inProgress}
              </p>
            </li>
            <li
              onClick={() => {
                pageFunk("send");
                setDefaultStatus(2);
                setRefresh(3);
              }}
              className="pb-5 pr-3 text-xl relative font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active2 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <TbTruckDelivery size={25} color="#fff" />
                {open ? "Jo'natildi" : <></>}
              </NavLink>
              <p className="absolute -top-3 shadow3 bg-[#268b86] text-white  w-[40px] h-[35px] flex items-center justify-center  text-center rounded-full right-2">
                {statistic.sending}
              </p>
            </li>
            <li
              onClick={() => {
                pageFunk("arrive");
                setDefaultStatus(3);
                setRefresh(4);
              }}
              className="pb-5 pr-3 text-xl relative font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active3 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <BiMailSend size={25} color="#fff" />
                {open ? "Yetkazildi" : <></>}
              </NavLink>
              <p className="absolute -top-3 shadow4 bg-[#30671d] text-white  w-[40px] h-[35px] flex items-center justify-center  text-center rounded-full right-2">
                {statistic.success}
              </p>
            </li>
            <li
              onClick={() => {
                pageFunk("cancel");
                setDefaultStatus(4);
                setRefresh(5);
              }}
              className="pb-5 pr-3 text-xl relative font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active4 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <MdOutlineCancelPresentation color="#fff" size={25} />
                {open ? "Bekor qilindi" : <></>}
              </NavLink>
              <p className="absolute -top-3 shadow5 bg-[#801e42] text-white  w-[40px] h-[35px] flex items-center justify-center  text-center rounded-full right-2">
                {statistic.cansel}
              </p>
            </li>
            <li
              onClick={() => pageFunk("category")}
              className={`pb-5 pr-3 text-xl font-semibold flex gap-5 font-serif`}
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active5 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default w-full hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2`
                }
                to={"/dashboard"}
              >
                <AiFillShop size={25} />
                {open ? "Kategoriya" : <></>}
              </NavLink>
            </li>
            <li
              onClick={() => pageFunk("about")}
              className="pb-5 pr-3 text-xl font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active5 py-2 pl-4 ${
                        open ? "pr-16 pl-2 w-full" : "pl-2 pr-4"
                      }`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2 `
                }
                to={"/dashboard"}
              >
                <BsFillPersonBadgeFill size={25} />
                {open ? "Mahsulotlar" : <></>}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
