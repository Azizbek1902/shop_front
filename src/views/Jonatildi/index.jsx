import React, { useState, useEffect } from "react";
import orderService from "../../services/order";
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { getErorrToast } from "../../services/toaster";
import ReactPaginate from "react-paginate";

export default () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [pageLength, setPageLength] = useState(0);

  const getOrder = async (data) => {
    orderService
      .getAll(data)
      .then((res) => {
        setOrder(res.docs);
        setPageLength(res?.totalPages);
      })
      .catch(() => getErorrToast());
  };
  useEffect(() => {
    getOrder({ status: 2, limit: 20, page: pageNum });
  }, []);

  const getOneOrder = (item) => {
    localStorage.setItem("order", JSON.stringify(item));
    navigate(`/order/one`);
  };
  const handlePageClick = (event) => {
    setPageNum(event.selected + 1);
  };

  return (
    <>
      <h1 className="mt-20 textStyle text-center text-4xl font-semibold font-serif">
        Jo'natilgan mahsulotlar ro'yxati
      </h1>
      <div className="flex justify-center">
        <div className="w-[90%]">
          <div className="flex justify-end">
            <ReactPaginate
              breakLabel={<span className="mr-4">...</span>}
              nextLabel={
                <button className="w-10 h-10 flex items-center border border-[#2C4691] justify-center text-black focus:text-white focus:bg-[#2C4691] rounded-md">
                  <AiOutlineRight />
                </button>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              marginPagesDisplayed={3}
              pageCount={pageLength}
              activeClassName="bg-[#2C4691] text-white"
              previousLabel={
                <button className="w-10 h-10 flex items-center border border-[#2C4691] justify-center text-black focus:text-white focus:bg-[#2C4691] rounded-md">
                  <AiOutlineLeft />
                </button>
              }
              pageClassName="block paginateButton text-2xl border- border-solid border-[#2C4691]  hover:bg-[#2C4691] hover:text-white cursor-pointer w-10 h-10 flex items-center justify-center rounded-md"
              containerClassName="flex max-w-[600px] gap-2 items-center justify-center mt-8 mb-4"
              renderOnZeroPageCount={null}
            />
          </div>
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
