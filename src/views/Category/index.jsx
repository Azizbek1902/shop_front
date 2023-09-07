import { BiAddToQueue } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BiMessageSquareEdit } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import category from "../../services/category";

export default () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    category
      .getAll()
      .then((res) => {
        setData(res);
        setRefresh(true);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleClik = () => {
    const payload = {
      title: categoryValue,
    };
    if (edit !== null) {
      category
        .edit(edit, payload)
        .then()
        .catch((err) => console.log(err));
    } else {
      category
        .create(payload)
        .then()
        .catch((err) => console.log(err));
    }
    setCategoryValue("");
    setModal(false);
    setEdit(null);
    setRefresh(refresh ? false : true);
  };
  const handleEdit = (item) => {
    setModal(true);
    setEdit(item._id);
    setCategoryValue(item.title);
  };
  const handleDelete = (id) => {
    setRefresh(refresh ? false : true);
    category
      .delete(id)
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full max-h-[80vh] overflow-y-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-10 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Kategoriya qo'shish
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
                  <input
                    type="text"
                    placeholder="Nomi..."
                    value={categoryValue}
                    onChange={(e) => setCategoryValue(e.target.value)}
                    className="py-2 pl-4 mb-5 outline-none border-2 border-gray-400 w-full rounded-md"
                  />

                  <div className="flex justify-between gap-3">
                    <button
                      onClick={() => setModal(false)}
                      className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
                    font-sans bg-[#ff3e34]`}
                    >
                      Bekor qilish
                    </button>
                    <button
                      onClick={() => handleClik()}
                      className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
             font-sans bg-[#30B545]`}
                    >
                      {edit ? "Edit" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="flex justify-end mr-10 py-10">
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
      <div className="flex justify-center">
        <div className="w-[95%]">
          <div className="grid grid-cols-1 gap-5">
            {data.map((item) => (
              <div
                key={item.id}
                className="shadowCard flex justify-between items-center px-10 rounded-md p-3"
              >
                <div className="text-xl text-center font-semibold">
                  {item.title}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#53b8f7]`}
                  >
                    <BiMessageSquareEdit size={25} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#ff3e34]`}
                  >
                    <AiFillDelete size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
