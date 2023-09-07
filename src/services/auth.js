import { service } from ".";

export default {
  getOne: (data) => service.post(`/admin` ,data),
};
