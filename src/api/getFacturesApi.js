import axios from "axios";


const token = localStorage.getItem("token");
const getFacturesApi = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let url = "http://localhost:8080/invoices";
  try {
    const res = await axios.get(url, config);
    const data = await res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export default getFacturesApi;
