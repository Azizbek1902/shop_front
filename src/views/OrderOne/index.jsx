import { BiLeftArrowAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import order from "../../services/order";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { creacteErorrToast, editErorrToast } from "../../services/toaster";
export default () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    function Demo() {
      let order = JSON.parse(localStorage.getItem("order"));
      setData([order]);
    }
    Demo();
  }, []);
  const formik = useFormik({
    initialValues: {
      desc: "",
    },
    onSubmit: (values) => {
      const payload = {
        desc: values.desc,
        status: 4,
      };
      order
        .edit(data[0]._id, payload)
        .then()
        .catch(() => creacteErorrToast());
      setModal(false);
      formik.resetForm();
      navigate("/dashboard");
    },
  });
  const handleSendFunk = (status) => {
    console.log(status);
    const payload = {
      status: status,
    };
    order
      .edit(data[0]._id, payload)
      .then()
      .catch(() => editErorrToast());
    navigate("/dashboard");
  };
  return (
    <div className="orderOne min-h-screen max-h-full pb-10 flex items-center rounded-md pt-20">
      <div className="wrapOne relative min-h-full max-h-full flex justify-center pt-20">
        <div>
          <button
            className="cursor-pointer rounded-md absolute top-4 left-7 py-2 px-4 bg-[#30B545] text-white"
            onClick={() => navigate("/dashboard")}
          >
            <BiLeftArrowAlt size={28} />
          </button>
          <div className="max-w-[900px] min-w-[800px]">
            {data.map((item) => {
              return (
                <div className="w-full">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          No
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          User Name
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Phone
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Address
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap border-l border-r px-6 py-4 dark:border-neutral-500 font-medium">
                          {item?.orderId}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {item?.user?.username}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {item?.user?.phone}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          @{item?.user?.address}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          @{item?.cartTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-10">
                    {item.items.map((item) => {
                      return (
                        <div className="flex w-full py-2 items-center justify-start gap-10 rounded-md mb-5 px-5 shadowBorderCard">
                          <img
                            src={item?.media}
                            crossOrigin="anonymous"
                            className="rounded-md w-[150px] border-2 h-[100px]"
                            alt="dsdsd"
                          />
                          <div>
                            <h3 className="text-xl font-medium pb-2">
                              {item?.title}
                            </h3>
                            <h3 className="text-base">
                              {item?.desc.length > 10
                                ? item?.desc.slice(0, 10)
                                : item?.desc}
                            </h3>
                          </div>
                          <div className="flex w-full justify-end">
                            <h4 className="text-xl flex gap-5 font-semibold">
                              {item?.quantity} dona X {item?.price} so'm =
                              {item?.itemTotal} so'm
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-5 gap-10 w-full items-end flex justify-center">
                    {item?.status == 0 ? (
                      <>
                        <button
                          onClick={() => {
                            setModal(true);
                          }}
                          className="cursor-pointer rounded-md top-4 left-7 py-2 px-4 bg-[#f13d3d] text-white"
                        >
                          Rad etish
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    {item?.status == 0 ? (
                      <button
                        onClick={() => handleSendFunk(1)}
                        className="cursor-pointer rounded-md top-4 left-7 py-2 px-4 bg-[#30B545] text-white"
                      >
                        Qabul qilish
                      </button>
                    ) : (
                      <></>
                    )}
                    {item?.status == 1 ? (
                      <button
                        onClick={() => handleSendFunk(2)}
                        className="cursor-pointer rounded-md top-4 left-7 py-2 px-4 bg-[#30B545] text-white"
                      >
                        Jo'natish
                      </button>
                    ) : (
                      <></>
                    )}
                    {item?.status == 2 ? (
                      <button
                        onClick={() => handleSendFunk(3)}
                        className="cursor-pointer rounded-md top-4 left-7 py-2 px-4 bg-[#30B545] text-white"
                      >
                        Yetkazildi
                      </button>
                    ) : (
                      <></>
                    )}
                    {item?.status == 4 ? <></> : <></>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[80vh] overflow-y-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-10 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Rad etish</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-5 flex-auto">
                  <form
                    className="flex min-w-[280px] xl:max-w-2xl  flex-col gap-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <label className="text-lg pl-3 font-medium" htmlFor="desc">
                      Bekor qilish sababi
                    </label>
                    <input
                      className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                      id="desc"
                      name="desc"
                      type="text"
                      placeholder="Rad etish sababi"
                      onChange={formik.handleChange}
                      value={formik.values.desc}
                    />
                    <div className="flex justify-between gap-5">
                      <button
                        onClick={() => setModal(false)}
                        className="bg-[#ff3e34] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        className="bg-[#30B545] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                      >
                        Ok
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};
