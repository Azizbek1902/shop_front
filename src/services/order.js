import { service } from ".";

export default {
  getAll: (data) => service.post("/orders/filter", data),
  create: (data) => service.post("/orders", data),
  edit: (id, data) => service.put(`/orders/${id}`, data),
  delete: (id) => service.delete(`/orders/${id}`),
  getOne: (id) => service.get(`/orders/${id}`),
};
