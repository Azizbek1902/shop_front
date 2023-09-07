import React from "react";
import { useFormik } from "formik";
import auth from "../../services/auth";
import { loginToast, loginErorrToast } from "../../services/toaster";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: values.password,
      };
      auth
        .getOne(payload)
        .then((res) => {
          window.localStorage.setItem("access_token", res?.token);
          navigate("/dashboard");
          loginToast();
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err);
          loginErorrToast();
        });
    },
  });
  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="shadowCard rounded-lg p-10 min-w-[350px] max-w-[500px]">
          <h1 className="text-center text-2xl pb-5 font-medium">Kirish</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="username"
              className="pl-4 py-2 placeholder:font-semibold outline-none block mb-5 w-full rounded-md border-2 border-gray-400"
              name="username"
              type="text"
              placeholder="User name"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <input
              id="password"
              name="password"
              className="pl-4 py-2 placeholder:font-semibold outline-none block mb-5 w-full rounded-md border-2 border-gray-400"
              type="text"
              placeholder="Parol"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#30B545] text-white font-semibold py-2 px-8 text-xl rounded-md"
              >
                Kirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
