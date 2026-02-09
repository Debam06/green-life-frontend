import api from "./axios";

export const fetchCareTasks = async () => {
  const res = await api.get("/care-tasks");
  return res.data;
};