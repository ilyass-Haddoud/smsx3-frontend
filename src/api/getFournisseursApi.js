import axios from "axios";


const token = "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSW5ldHVtIE1hcm9jIiwic3ViIjoiY2xpZW50QGluZXR1bS5jb20iLCJlbWFpbCI6ImNsaWVudEBpbmV0dW0uY29tIiwiaWQiOjEsInJvbGVzIjpbIkFkbWluaXN0cmF0ZXVyIl0sImV4cCI6MTcxNjkyNDI1OH0.oTRiCyYug2c_KXxkiacCuu9jEf-mrXjAwPIqI2jhWFo";
const getFournisseursApi = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let url = "http://localhost:8080/suppliers";
  try {
    const res = await axios.get(url, config);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export default getFournisseursApi;
