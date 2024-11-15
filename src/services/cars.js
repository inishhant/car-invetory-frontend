const { default: api } = require("@/utils/api");

export const fetchCars = async (id = "") => {
  const cars = await api.get(`/cars/${id ? id : ""}`);
  return cars;
};
