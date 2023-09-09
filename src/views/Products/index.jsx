import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import products from "../../services/products";
import category from "../../services/category";
import { useFormik } from "formik";
import { BiAddToQueue } from "react-icons/bi";
import {
  creacteErorrToast,
  editErorrToast,
  qoshishToast,
  editToast,
  deleteToast,
  deleteErorrToast,
} from "../../services/toaster";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";

export default () => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ type: false, id: null });
  const [dataProduct, setDataProduct] = useState([]);
  const [isEdit, setIsEdit] = useState({ type: false, data: null });
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [attendence, setAttendence] = useState([
    {
      desc: "1",
      title: "2",
    },
  ]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    category
      .getAll()
      .then((res) => {
        setCategorys(res);
      })
      .catch((err) => console.log(err));
    products
      .getAll()
      .then((res) => {
        setDataProduct(res);
      })
      .catch((err) => console.log(err));
    setRefresh(true);
  }, [refresh]);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      storeCount: 0,
      desc: "",
      category: {},
      parametr: {},
    },
    onSubmit: (values) => {
      let foo = {};
      attendence.map((item) => {
        foo[`${item.desc}`] = item.title;
      });
      formData.append("title", values.title);
      formData.append("status", false);
      formData.append("price", values.price);
      formData.append("storeCount", values.storeCount);
      formData.append("desc", values.desc);
      formData.append("category", values.category._id);
      formData.append("file", files[0]);
      formData.append("parametr", JSON.stringify(foo));
      let payload = formData;
      if (isEdit.type) {
        products
          .edit(isEdit.data._id, payload)
          .then(() => editToast())
          .catch(() => editErorrToast());
      } else {
        products
          .create(payload)
          .then(() => {
            qoshishToast();
          })
          .catch(() => creacteErorrToast());
      }
      formik.resetForm();
      setModal(false);
      setRefresh(false);
      setIsEdit({ type: false, data: null });
    },
  });
  const handleClik = (data) => {
    let categoryDrop = categorys.map((item) => item._id == data.category);
    setModal(true);
    formik.setValues({
      title: data.title,
      price: data.price,
      desc: data.desc,
      storeCount: data.storeCount,
      category: categoryDrop,
    });
    setIsEdit({ type: true, data: data });
  };
  const handleClikDelete = (id) => {
    products
      .delete(id)
      .then(() => {
        deleteToast();
        setRefresh(!refresh);
        setDeleteModal({ type: false, id: null });
      })
      .catch(() => deleteErorrToast());
  };
  const formData = new FormData();

  const handleCancel = () => {
    formik.resetForm();
    setModal(false);
    setIsEdit({ type: false, data: null });
  };
  const handleAdd = () => {
    setAttendence((prev) => [
      ...prev,
      {
        desc: "",
        title: "",
      },
    ]);
  };

  const handleCustomDesc = (e, idx) => {
    const data = [...attendence];
    data[idx].desc = e.target.value;
  };

  const handleCustomTitle = (e, idx) => {
    const data = [...attendence];
    data[idx].title = e.target.value;
  };
  const handleDel = (ind) => {
    if (attendence.length > 1) {
      let data = [...attendence];
      data.splice(ind, 1);
      setAttendence(data);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[95%]">
          <div className="flex justify-between items-center mr-10 py-10">
            <h1 className="py-10 text-center text-[#1E326B] text-xl lg:text-4xl font-medium font-serif">
              Mahsulotlar
            </h1>
            <button
              onClick={() => {
                setModal(true);
              }}
              className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#30B545]`}
            >
              <BiAddToQueue size={25} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {dataProduct.map((item, ind) => {
              return (
                <div key={ind + 1}>
                  <div className="md:p-6 p-5 rounded-lg bg-white shadowCard">
                    <div
                      onClick={() => {
                        navigate("/productOne", { state: item });
                      }}
                      className="flex cursor-pointer justify-center"
                    >
                      <img
                        src={item.media}
                        crossOrigin="anonymous"
                        className="rounded-md w-full h-[150px]"
                        alt="dsdsd"
                      />
                    </div>
                    <table className="mb-5 mt-5 w-full">
                      <tr className="flex border border-[#c3c3c3]">
                        <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                          Nomi:
                        </td>
                        <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                          {item.title.length > 8
                            ? item.title.slice(0, 8) + "...."
                            : item.title}
                        </td>
                      </tr>
                      <tr className="flex border border-[#c3c3c3]">
                        <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                          Narxi:
                        </td>
                        <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                          {item.price}
                        </td>
                      </tr>
                      <tr className="flex border border-[#c3c3c3]">
                        <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                          Soni:
                        </td>
                        <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                          {item.storeCount}
                        </td>
                      </tr>
                      <tr className="flex border border-[#c3c3c3]">
                        <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                          Malumot:
                        </td>
                        <td className="pl-3 text-md font-medium py-1 border border-[#c3c3c3] w-full">
                          {item.desc.length > 8
                            ? item.desc.slice(0, 8) + "...."
                            : item.desc}
                        </td>
                      </tr>
                    </table>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleClik(item)}
                        className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#EE8108]`}
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteModal({ type: true, id: item._id });
                        }}
                        className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#ff3e34]`}
                      >
                        <AiFillDelete />
                      </button>
                      {deleteModal.type ? (
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[80vh] overflow-y-auto bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-10 border-b border-solid border-slate-200 rounded-t">
                                  <h3 className="text-3xl font-semibold">
                                    Product o'chirilsinmi
                                  </h3>
                                  <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setModal(false)}
                                  >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                      ×
                                    </span>
                                  </button>
                                </div>
                                <div className="relative p-10 flex-auto">
                                  <div className="flex justify-between">
                                    <button
                                      onClick={() => {
                                        setDeleteModal({
                                          type: false,
                                          id: null,
                                        });
                                      }}
                                      className={`text-xl outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#EE8108]`}
                                    >
                                      Yo'q
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleClikDelete(deleteModal.id)
                                      }
                                      className={`text-xl outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#ff3e34]`}
                                    >
                                      Ha
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                      ) : null}
                    </div>
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
                  <h3 className="text-3xl font-semibold">Product qo'shish</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-10 flex-auto">
                  <form
                    className="flex min-w-[280px] xl:max-w-2xl  flex-col gap-4"
                    onSubmit={formik.handleSubmit}
                  >
                    <label className="text-lg pl-3 font-medium" htmlFor="title">
                      Mahsulot Nomi
                    </label>
                    <input
                      className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                      id="title"
                      name="title"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    <label className="text-lg pl-3 font-medium" htmlFor="title">
                      Mahsulot Narxi
                    </label>
                    <input
                      className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                      id="price"
                      name="price"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.price}
                    />
                    <label className="text-lg pl-3 font-medium" htmlFor="title">
                      Mahsulot haqida
                    </label>
                    <input
                      className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                      id="desc"
                      name="desc"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.desc}
                    />
                    {isEdit.type ? (
                      <></>
                    ) : (
                      <>
                        <Dropdown
                          value={formik.values.category}
                          border={`2px solid #bfbfbf`}
                          padding="13px 20px"
                          width="100%"
                          options={categorys}
                          placeholder="Kategoriyani tanlang"
                          handleItem={(item) =>
                            formik.setFieldValue("category", item)
                          }
                        />
                      </>
                    )}
                    <label className="text-lg pl-3 font-medium" htmlFor="title">
                      Mahsulot soni
                    </label>
                    <input
                      className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                      id="storeCount"
                      name="storeCount"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.storeCount}
                    />
                    {isEdit.type ? (
                      <></>
                    ) : (
                      <>
                        <div className="flex my-2 justify-between">
                          <p className="text-lg font-medium">
                            Parametr qo'shish
                          </p>
                          <button
                            onClick={handleAdd}
                            type="button"
                            className="bg-[#30B545] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                          >
                            <BiAddToQueue size={25} />
                          </button>
                        </div>
                        <div className="flex flex-col gap-5">
                          {attendence.map((item, ind) => {
                            return (
                              <div
                                key={ind + 1}
                                className="flex gap-2 items-center"
                              >
                                <div className="flex gap-2 justify-between items-center">
                                  <input
                                    className="text-lg font-normal pl-3 w-40 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                                    id="desc"
                                    name={`attendence[${ind}].desc`}
                                    type="text"
                                    onChange={(e) => handleCustomDesc(e, ind)}
                                  />
                                  <input
                                    className="text-lg font-normal pl-3 w-40 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                                    id="title"
                                    name={`attendence[${ind}].title`}
                                    type="text"
                                    onChange={(e) => handleCustomTitle(e, ind)}
                                  />
                                </div>
                                <button
                                  onClick={() => handleDel(ind)}
                                  type="button"
                                  className="bg-[#ff3e34] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                                >
                                  <AiFillDelete />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                    {isEdit.type ? (
                      <></>
                    ) : (
                      <>
                        <label
                          className="text-lg pl-3 font-medium"
                          htmlFor="title"
                        >
                          Rasm tanlash
                        </label>
                        <input
                          className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                          type="file"
                          name="img"
                          onChange={(e) => setFiles(e.target.files)}
                          value={formik.values.file}
                        />
                      </>
                    )}
                    <div className="flex justify-between gap-5">
                      <button
                        onClick={() => handleCancel()}
                        className="bg-[#ff3e34] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        className="bg-[#30B545] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                      >
                        {isEdit.type ? "O'zgartirish" : "Qo'shish"}
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
