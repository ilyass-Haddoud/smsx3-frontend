import axios from "axios";


const token = localStorage.getItem("token");
const getFournisseursApi = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let url = "http://localhost:8080/suppliers";
  try {
    const res = await axios.get(url, config);
    const data = await res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export default getFournisseursApi;
