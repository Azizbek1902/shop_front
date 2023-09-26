import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../views/Products";
import Cancel from "../views/Cancel";
import Yangi from "../views/Yangi";
import Tayyorlanmoqda from "../views/Tayyorlanmoqda";
import Jonatildi from "../views/Jonatildi";
import Yetkazildi from "../views/Yetkazildi";
import Category from "../views/Category";

export default () => {
  const [page, setPage] = useState("new");
  const [open, setOpen] = useState(true);
  const handleClik = () => {
    setOpen(!open);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  let pages = {
    about: <Products pageFunc={handlePage} />,
    category: <Category />,
    new: <Yangi />,
    sending: <Tayyorlanmoqda />,
    send: <Jonatildi />,
    arrive: <Yetkazildi />,
    cancel: <Cancel />,
  };
  return (
    <div>
      <div className="flex">
        <div
          className={` transitionNav border-r-2 border-[#F6FAFF]  min-h-screen ${
            open ? "w-[340px]" : "w-[90px]"
          }`}
        >
          <Navbar open={open} onclik={handleClik} pageFunk={handlePage} />
        </div>
        <div className="w-full containerShadow bg-[#F6FAFF]">{pages[page]}</div>
      </div>
    </div>
  );
};
