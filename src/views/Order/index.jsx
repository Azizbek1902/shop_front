import { BsFillCalendar2DayFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import orderService from "../../services/order";
import { BsFillPencilFill } from "react-icons/bs";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default () => {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(new Date());
  const [order, setOrder] = useState([]);
  const getOrder = async (data) => {
    orderService
      .getAll(data)
      .then((res) => {
        setOrder(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOrder({ status: 0 });
    console.log(moment(new Date()).format("YYYY-MM-DD"), "dddddddd");
  }, []);

  const getOneOrder = (item) => {
    localStorage.setItem("order", JSON.stringify(item));
    navigate(`/order/one`);
  };
  const newObj = {
    yangi: 6,
    tayyor: 4,
    jonatildi: 3,
    yetkkazildi: 3,
    bekor: 1,
  };
  const onChangeFunk = (date) => {
    setDateValue(date);
    console.log(
      moment(dateValue).format("YYYY-MM-DD"),
      "ddddddddddddddddaaaaaaaaaaaaa"
    );
  };
  return (
    <>
      <div className="menu_order">
        <div
          className="orderMenu relative bg-[#fd8f30] text-white "
          onClick={() => getOrder({ status: 0 })}
        >
          Yangi
          <span className="absolute -top-1 shadowNum bg-white rounded-full font-semibold w-8 h-8 flex justify-center items-center text-[#fd8f30] text-lg -right-1 ">
            {newObj.yangi}
          </span>
        </div>
        <div
          className="orderMenu relative bg-[#3A8DEF] text-white"
          onClick={() => getOrder({ status: 1 })}
        >
          Tayyorlanmoqda
          <span className="absolute -top-1 shadowNum bg-white rounded-full font-semibold w-8 h-8 flex justify-center items-center text-[#3A8DEF] text-lg -right-1 ">
            {newObj.tayyor}
          </span>
        </div>
        <div
          className="orderMenu relative bg-[#21bbb3] text-white"
          onClick={() => getOrder({ status: 2 })}
        >
          Jo'natildi
          <span className="absolute -top-1 shadowNum bg-white rounded-full font-semibold w-8 h-8 flex justify-center items-center text-[#21bbb3] text-lg -right-1 ">
            {newObj.jonatildi}
          </span>
        </div>
        <div
          className="orderMenu relative bg-[#2a890b] text-white"
          onClick={() => getOrder({ status: 3 })}
        >
          Yetkazildi
          <span className="absolute -top-1 shadowNum bg-white rounded-full font-semibold w-8 h-8 flex justify-center items-center text-[#2a890b] text-lg -right-1 ">
            {newObj.yetkkazildi}
          </span>
        </div>
        <div
          className="orderMenu relative bg-[#8b1540] text-white"
          onClick={() => getOrder({ status: 4 })}
        >
          Bekor qilindi
          <span className="absolute -top-1 shadowNum bg-white rounded-full font-semibold w-8 h-8 flex justify-center items-center text-[#8b1540] text-lg -right-1 ">
            {newObj.bekor}
          </span>
        </div>
      </div>
      <div className="mt-5 ml-10">
        <DateTimePicker
          format={"y-MM-dd"}
          calendarIcon={<BsFillCalendar2DayFill size={23} color="#3A8DEF" />}
          calendarClassName="border-2 border-red-400"
          onChange={(date) => onChangeFunk(date)}
          value={dateValue}
        />
      </div>
      <div className="orders">
        <table>
          <thead>
            <tr>
              <td className="border border-[#c3c3c3] p-3 text-center">No</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Mijoz</td>
              <td className="border border-[#c3c3c3] p-3 text-center">
                Telefon
              </td>
              <td className="border border-[#c3c3c3] p-3 text-center">
                Manzil
              </td>
              <td className="border border-[#c3c3c3] p-3 text-center">
                Haritada
              </td>
              <td className="border border-[#c3c3c3] p-3 text-center">Total</td>
              <td className="border border-[#c3c3c3] p-3 text-center"></td>
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-[#c3c3c3] text-center">
                    {item.orderId}
                  </td>
                  <td className="border border-[#c3c3c3] text-center">
                    {item.user.username}
                  </td>
                  <td className="border border-[#c3c3c3] text-center">
                    {item.user.phone}
                  </td>
                  <td className="border border-[#c3c3c3] text-center">
                    {item.user.address}
                  </td>
                  <td className="border border-[#c3c3c3] text-center">
                    <a
                      className="maps"
                      href={`https://google.com/maps/search/${item.user.location.latitude},${item.user.location.longitude}`}
                    >
                      🗺
                    </a>
                  </td>
                  <td className="border border-[#c3c3c3] text-center">
                    {item.cartTotal} so'm
                  </td>
                  <td className="border border-[#c3c3c3] cursor-pointer text-center">
                    <BsFillPencilFill
                      onClick={() => getOneOrder(item)}
                      className="order_change"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
