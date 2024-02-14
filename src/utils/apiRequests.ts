import api from "../api/api";

export const getClients = async () => {
  try {
    const res = await api.get("clients");

    return res.data;
  } catch (error: any) {
    return console.log("Error: ", error.message);
  }
};

export const getSales = async () => {
  try {
    const res = await api.get("sales");
    return res.data;
  } catch (error: any) {
    return console.log("Error: ", error.message);
  }
};
