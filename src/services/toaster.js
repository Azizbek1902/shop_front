import { toast } from "react-toastify";

export const qoshishToast = () => {
  toast.success("Qo'shish muvafaqiyatli amalga oshirildi.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const getErorrToast = () => {
  toast.error("Ma'lumot yuklab olishda xatolik.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const editToast = () => {
  toast.success("O'zgartirish muvafaqiyatli amalga oshirildi.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const loginToast = () => {
  toast.success("Kirish muvafaqiyatli amalga oshirildi.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const deleteToast = () => {
  toast.success("O'chrish muvafaqiyatli amalga oshirildi.", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const creacteErorrToast = () => {
  toast.success("Yaratishda hatolik yuz berdi !", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const loginErorrToast = () => {
  toast.success("Kirishda hatolik yuz berdi !", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const deleteErorrToast = () => {
  toast.error("O'chirishda hatolik yuz berdi !", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};

export const editErorrToast = () => {
  toast.error("O'zgartirishda hatolik yuz berdi !", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 100,
    pauseOnHover: false,
    draggable: true,
    hideProgressBar: true,
  });
};
