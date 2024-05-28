import "./AreaTable.scss";
import { useEffect, useState } from "react";
import getFacturesApi from "../../../api/getFacturesApi";

const TABLE_HEADS = [
  "Site facturation",
  "Numéro de pièce",
  "Date facturation",
  "Tiers",
  "Status",
  "Total HT",
];

const getStatusText = (etat) => {
  switch (etat) {
    case 1:
      return { text: 'En attente', dotClass: 'dot-pending' };
    case 2:
      return { text: 'À valider', dotClass: 'dot-canceled' };
    case 3:
      return { text: 'Validée', dotClass: 'dot-delivered' };
    case 4:
      return { text: 'Transmise au service metier', dotClass: 'dot-delivered' };
    case 5:
      return { text: 'Transmise au service finances et comptabilité', dotClass: 'dot-delivered' };
    case 6:
      return { text: "En attente d'information", dotClass: 'dot-delivered' };
    case 7:
      return { text: 'Rejetée par le service metier', dotClass: 'dot-canceled' };
    default:
      return { text: 'Inconnu', dotClass: 'dot-unknown' };
  }
};

const AreaTableRejected = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const factures = await getFacturesApi();
        const rejectedFactures = factures.filter(facture => facture.etat == 7)
        setData(rejectedFactures);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Factures rejetées</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          {loading && <tbody><tr><td colSpan={TABLE_HEADS.length}>Loading data...</td></tr></tbody>}
          {!loading && (
            <tbody>
              {data?.map((dataItem) => {
                const { text, dotClass } = getStatusText(dataItem.etat);
                return (
                  <tr key={dataItem.numeroPiece}>
                    <td>{dataItem.site}</td>
                    <td>{dataItem.numeroPiece}</td>
                    <td>{dataItem.dateComptable}</td>
                    <td>{dataItem.tiers}</td>
                    <td>
                      <div className="dt-status">
                        <span className={`dt-status-dot ${dotClass}`}></span>
                        <span className="dt-status-text">{text}</span>
                      </div>
                    </td>
                    <td>{dataItem.totalHTLignes}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
};

export default AreaTableRejected;
