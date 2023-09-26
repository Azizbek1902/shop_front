import { BsFillCalendar2DayFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import orderService from "../../services/order";
import { BsFillPencilFill } from "react-icons/bs";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { getErorrToast } from "../../services/toaster";
import moment from "moment";
export default () => {
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(moment());
  const [order, setOrder] = useState([]);
  const [statistic, setStatistic] = useState({
    new: 0,
    inProgress: 0,
    sending: 0,
    success: 0,
    cansel: 0,
  });

  const getOrder = async (data) => {
    orderService
      .getAll(data)
      .then((res) => {
        setOrder(res);
      })
      .catch(() => getErorrToast());
    orderService
      .getStatistic(data)
      .then((res) => {
        setStatistic(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOrder({ status: 2, date: moment(dateValue).format("YYYY-MM-DD") });
  }, []);


  const getOneOrder = (item) => {
    localStorage.setItem("order", JSON.stringify(item));
    navigate(`/order/one`);
  };
  const onChangeFunk = (date) => {
    setDateValue(date);
    orderService
      .getAll({ status: 0, date: moment(date).format("YYYY-MM-DD") })
      .then((res) => {
        setOrder(res);
      })
      .catch(() => getErorrToast());
    orderService
      .getStatistic({ date: moment(date).format("YYYY-MM-DD") })
      .then((res) => {
        setStatistic(res);
      })
      .catch(() => getErorrToast());
  };

  return (
    <>
      <h1 className="mt-20 pb-10 text-center text-4xl font-semibold font-serif">
        Jo'natilgan mahsulotlar ro'yxati
      </h1>
      <div className="flex justify-start w-full">
        <div className="mt-5 ml-16">
          <DateTimePicker
            format={"y-MM-dd"}
            calendarIcon={<BsFillCalendar2DayFill size={23} color="#3A8DEF" />}
            calendarClassName="border-2 border-red-400"
            onChange={(date) => onChangeFunk(date)}
            value={dateValue}
          />
        </div>
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
              <td className="border border-[#c3c3c3] p-3 text-center">Vaqti</td>
              <td className="border border-[#c3c3c3] p-3 text-center">
                Action
              </td>
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
                  <td className="border border-[#c3c3c3] text-center">
                    {item.date.split(" ")[0]} <br />
                    {item.date.split(" ")[1]}
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
