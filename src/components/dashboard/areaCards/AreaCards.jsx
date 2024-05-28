import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import getStatusPecentage from "../../../api/getStatusPecentage";

const AreaCards = () => {
  const [loading, setLoading] = useState(false);
  const [statePercentages, setStatePercentages] = useState({ '1': 0,'3': 0, '4': 0});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { statePercentages } = await getStatusPecentage();
        setStatePercentages(statePercentages);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={statePercentages['1']}
        cardInfo={{
          title: "En attente",
          value: `${statePercentages['1'].toFixed(2)}%`,
          text: "Invoices en attente",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={statePercentages['4']}
        cardInfo={{
          title: "En cours de traitement",
          value: `${statePercentages['4'].toFixed(2)}%`,
          text: "facture transmise au service metier",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={statePercentages['3']}
        cardInfo={{
          title: "Validée",
          value: `${statePercentages['3'].toFixed(2)}%`,
          text: "Invoices validée",
        }}
      />
    </section>
  );
};

export default AreaCards;
