import api from "./axios";

export const fetchSpecies = async () => {
  const res = await api.get("/species");
  return res.data;
};