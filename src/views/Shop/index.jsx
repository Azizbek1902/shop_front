import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import products from "../../services/products";
import { getErorrToast } from "../../services/toaster";
import category from "../../services/category";

export default () => {
  const { addItem, items, totalUniqueItems } = useCart();
  const [dataProduct, setDataProduct] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [buttonCategorys, setButtonCategorys] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    category
      .getAll()
      .then((res) => {
        setCategorys(res);
      })
      .catch(() => getErorrToast());
    products
      .getAll()
      .then((res) => {
        setDataProduct(res);
        setButtonCategorys(res);
        setRefresh(true);
      })
      .catch(() => getErorrToast());
  }, [refresh]);
  const handleClik = (data) => {
    dataProduct.map((item) => {
      if (item._id === data._id) {
        if (!item.status) {
          let backData = {
            media: data.media,
            title: data.title,
            desc: data.desc,
            price: data.price,
            status: true,
          };
          const id = data._id;
          products
            .edit(id, backData)
            .then()
            .catch((err) => console.log(err));
          setRefresh(false);
          let itemData = {
            id: data._id,
            media: data.media,
            title: data.title,
            desc: data.desc,
            price: data.price,
            status: true,
          };
          addItem(itemData);
        }
      } else {
        console.log("errr");
      }
    });
  };

  const handleChange = (itemId) => {
    if (itemId === "") {
      setDataProduct(buttonCategorys);
    } else {
      let data = buttonCategorys.filter((i) => i.category === itemId);
      setDataProduct(data);
    }
  };

  return (
    <div className="bg-white w-full pt-4">
      <div className="mb-10 flex justify-center w-full">
        <div className="flex gap-4 min-w-full md:pl-0 pl-40 overflow-x-auto justify-center mx-4">
          <button
            onClick={() => {
              handleChange("");
            }}
            className="text-lg outline-none h-16 px-5 py-2 w-40 rounded-md focus:text-white text-black font-bold
           font-sans bg-[#F0F0F0] focus:bg-[#EE8108]"
          >
            All
          </button>
          {categorys.map((item, index) => {
            return (
              <button
                onClick={() => {
                  handleChange(item._id);
                }}
                key={index + 1}
                className="text-lg outline-none h-16 px-5 py-2 w-40 rounded-md focus:text-white text-black font-bold
           font-sans bg-[#F0F0F0] focus:bg-[#EE8108]"
              >
                {item?.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center bg-white min-h-[80vh]">
        <div className="w-[95%] md:w-[90%]">
          {dataProduct.length === 0 ? (
            <>
              <div className="flex justify-center items-center mt-28">
                <h1 className="text-3xl font-semibold lg:max-w-[400px] text-center font-serif">
                  Bu kategoryaga oid mahsulot mavjud emas!
                </h1>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
                {dataProduct.map((item, ind) => (
                  <div key={ind + 1}>
                    <div
                      style={{ background: "white !important" }}
                      className="md:p-10 p-5 rounded-lg shadowCard bg-white"
                    >
                      <div
                        className="flex cursor-pointer justify-center"
                        onClick={() => {
                          navigate("/batafsil", {
                            state: item,
                          });
                        }}
                      >
                        <img
                          src={item?.media}
                          crossOrigin="anonymous"
                          className="rounded-md object-cover w-full md:h-[150px] h-[100px]"
                          alt="dsdsd"
                        />
                      </div>
                      <div className="flex py-5 flex-col md:flex-row justify-center md:justify-between gap-3">
                        <h1 className="text-xl font-semibold text-center">
                          {item?.title.length > 9
                            ? item?.title.slice(0, 9) + "...."
                            : item?.title}
                        </h1>
                        <h1 className="text-xl font-semibold text-center">
                          {item?.price} UZS
                        </h1>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleClik(item)}
                          className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans ${item?.status ? "bg-[#30B545]" : "bg-[#EE8108]"}`}
                        >
                          {item?.status ? (
                            <BiCheckCircle color="white" size={25} />
                          ) : (
                            <TiShoppingCart color="white" size={25} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {items?.length ? (
            <div className="">
              <div className="flex fixed justify-center bottom-10 right-4">
                <button
                  onClick={() => {
                    navigate("/korzinka");
                  }}
                  className="outline-none relative pl-3 pr-7 shadowShopIcon py-5 rounded-full bg-[#30b544e7] text-white font-medium
           font-sans border-2 border-[#30B545]"
                >
                  <MdOutlineShoppingCartCheckout size={35} color="white" />
                  <span className="top-1 right-1 absolute  font-bold font-serif text-base px-2 items-center rounded-full text-white">
                    ({totalUniqueItems})
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
