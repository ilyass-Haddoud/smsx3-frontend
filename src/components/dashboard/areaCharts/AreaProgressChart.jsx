import { useEffect, useState } from "react";
import getFacturesApi from "../../../api/getFacturesApi"

const data = [
  {
    id: 1,
    name: "Jeans",
    percentValues: 30,
  },
  {
    id: 2,
    name: "Shirts",
    percentValues: 40,
  },
  {
    id: 3,
    name: "Belts",
    percentValues: 60,
  },
  {
    id: 4,
    name: "Caps",
    percentValues: 80,
  },
  {
    id: 5,
    name: "Others",
    percentValues: 20,
  },
];

const initialServicesData = [
  {
    id: 1,
    name: "Service Métier",
    percentValues: 70,
    numInvoices: 0, // Nombre de factures (initialisé à 0)
    avgProcessingTime: 5 // Temps de traitement moyen arbitraire en jours
  },
  {
    id: 2,
    name: "Finances et Comptabilité",
    percentValues: 30,
    numInvoices: 0, // Nombre de factures (initialisé à 0)
    avgProcessingTime: 7 // Temps de traitement moyen arbitraire en jours
  }
];


const AreaProgressChart = () => {
  const [services, setServices] = useState(initialServicesData);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const factures = await getFacturesApi();
          const updatedServices = initialServicesData.map(service => ({ ...service }));

          factures.forEach((facture) => {
            const { etat } = facture;
            if ([1, 2, 3].includes(etat)) {
              updatedServices[1].numInvoices += 1;
            } else if ([4, 5, 6, 7].includes(etat)) {
              updatedServices[0].numInvoices += 1;
            }
          });

        // Calcul du pourcentage basé sur le nombre total de factures
        const totalInvoices = updatedServices.reduce((sum, service) => sum + service.numInvoices, 0);
        if (totalInvoices > 0) {
          updatedServices.forEach(service => {
            service.percentValues = (service.numInvoices / totalInvoices) * 100;
          });
        } else {
          updatedServices.forEach(service => {
            service.percentValues = 0;
          });
        }

          setServices(updatedServices);
        } catch (error) {
          console.error("Erreur lors de la récupération des factures", error);
        }
      };

      fetchData();
    }, []);
  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Répartition par services</h4>
      </div>
      <div className="progress-bar-list">
        {services?.map((service) => {
          return (
            <div className="progress-bar-item" key={service.id}>
              <p className="bar-item-info-name">{service.name}</p>
              <div className="bar-item-info">
                <p style={{fontSize:"14px"}}>Nombre de factures :</p>
                <p className="bar-item-info-value">
                  {service.numInvoices}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${service.percentValues}%`,
                  }}
                ></div>
              </div>
              <div style={{display:"flex", gap:"10px", marginTop:"1rem"}}>
                <p style={{fontSize:"14px"}}> Temps moyen de traitement (jrs)  : </p>
                <p>{service.avgProcessingTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaProgressChart;
