import axios from "axios";


const token = localStorage.getItem("token");

const getStatusPecentage = async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const url = "http://localhost:8080/invoices";
  try {
    const res = await axios.get(url, config);
    const invoices = await res.data;

    const total = invoices.length;
    const stateCounts = { '1': 0, '3': 0, '4': 0 };

    invoices.forEach(invoice => {
      if (invoice.etat in stateCounts) {
        stateCounts[invoice.etat]++;
      }
    });

    const statePercentages = {
      '1': total > 0 ? (stateCounts['1'] / total) * 100 : 0,
      '3': total > 0 ? (stateCounts['3'] / total) * 100 : 0,
      '4': total > 0 ? (stateCounts['4'] / total) * 100 : 0,
    };

    return { invoices, statePercentages };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return { invoices: [], statePercentages: { '1': 0,'3': 0, '4': 0} };
  }
};

export default getStatusPecentage;
