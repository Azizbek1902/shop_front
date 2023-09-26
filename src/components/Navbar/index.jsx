import { AiFillShop } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { BiLoader, BiMailSend } from "react-icons/bi";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { RiLuggageCartLine, RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";
import React from "react";
import { NavLink } from "react-router-dom";

export default ({ open, onclik, pageFunk }) => {
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
              onClick={() => pageFunk("new")}
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
                <RiLuggageCartLine size={25} color="#FD8F30" />
                {open ? "Yangi" : <></>}
              </NavLink>
              <p className="absolute -top-2 bg-[#FD8F30] text-white min-w-[30px]  text-center rounded-full right-3">
                0
              </p>
            </li>
            <li
              onClick={() => pageFunk("sending")}
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
                <BiLoader size={25} color="#3A8DEF" />
                {open ? "Tayyorlanmoqda" : <></>}
              </NavLink>
              <p className="absolute -top-2 bg-[#3A8DEF] text-white min-w-[30px]  text-center rounded-full right-3">
                0
              </p>
            </li>
            <li
              onClick={() => pageFunk("send")}
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
                <TbTruckDelivery size={25} color="#21BBB3" />
                {open ? "Jo'natildi" : <></>}
              </NavLink>
              <p className="absolute -top-2 bg-[#21BBB3] text-white min-w-[30px]  text-center rounded-full right-3">
                0
              </p>
            </li>
            <li
              onClick={() => pageFunk("arrive")}
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
                <BiMailSend size={25} color="#2A890B" />
                {open ? "Yetkazildi" : <></>}
              </NavLink>
              <p className="absolute -top-2 bg-[#2A890B] text-white min-w-[30px]  text-center rounded-full right-3">
                0
              </p>
            </li>
            <li
              onClick={() => pageFunk("cancel")}
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
                <MdOutlineCancelPresentation color="#8B1540" size={25} />
                {open ? "Bekor qilindi" : <></>}
              </NavLink>
              <p className="absolute -top-2 bg-[#8B1540] text-white min-w-[30px]  text-center rounded-full right-3">
                0
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
                    ? `active py-2 pl-4 ${
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
                    ? `active py-2 pl-4 ${
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
