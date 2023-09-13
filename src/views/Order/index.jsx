import React, { useState, useEffect } from "react";
import orderService from "../../services/order";
import {BsFillPencilFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
export default () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState([]);
  const getOrder = async (data) => {
    orderService
      .getAll(data)
      .then((res) => {
        setOrder(res);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getOrder({status: 0})
  }, [])

  const getOneOrder = (item) => {
    localStorage.setItem('order', JSON.stringify(item))
    navigate(`/order/one`)
  }
  
  return (
    <>

      <div className="menu_order">
        <div 
        className="orderMenu bg-[#fd8f30] text-white "
          onClick={()=>getOrder({ status: 0 })}
        >
            Yangi
        </div>
        <div 
        className="orderMenu bg-[#3A8DEF] text-white"
          onClick={()=>getOrder({ status: 1 })}
        >
            Tayyorlanmoqda
        </div>
        <div 
        className="orderMenu bg-[#21bbb3] text-white"
          onClick={()=>getOrder({ status: 2 })}
        >
            Jo'natildi
        </div>
        <div 
        className="orderMenu bg-[#2a890b] text-white"
          onClick={()=>getOrder({ status: 3})}
        >
            Yetkazildi
        </div>
        <div 
        className="orderMenu bg-[#8b1540] text-white"
          onClick={()=>getOrder({ status: 4 })}
        >
            Bekor qilindi
        </div>
        
      </div>
    
      <div className="orders">
        <table>
          <thead>
            <tr>
              <td className="border border-[#c3c3c3] p-3 text-center">No</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Mijoz</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Telefon</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Manzil</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Haritada</td>
              <td className="border border-[#c3c3c3] p-3 text-center">Total</td>
              <td className="border border-[#c3c3c3] p-3 text-center"></td>
            </tr>
          </thead>
          <tbody>
            {
              order.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-[#c3c3c3] text-center">{item.orderId}</td>
                    <td className="border border-[#c3c3c3] text-center">{item.user.username}</td>
                    <td className="border border-[#c3c3c3] text-center">{item.user.phone}</td>
                    <td className="border border-[#c3c3c3] text-center">{item.user.address}</td>
                    <td className="border border-[#c3c3c3] text-center"><a className="maps" href={`https://google.com/maps/search/${item.user.location.latitude},${item.user.location.longitude}`}>
                      🗺
                      </a></td>
                    <td className="border border-[#c3c3c3] text-center">{item.cartTotal} so'm</td>
                    <td className="border border-[#c3c3c3] cursor-pointer text-center">
                      <BsFillPencilFill 
                      onClick={()=>getOneOrder(item)}
                        className="order_change"
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};