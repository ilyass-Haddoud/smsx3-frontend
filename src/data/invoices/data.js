const generateRandomInvoice = (id) => {
  const sites = ["Site A", "Site B", "Site C"];
  const types = ["Facture", "Avoir Facture Client"];
  const etats = ["Validée", "En cours de traitement", "Non validée"];
  const devises = ["EUR", "USD", "GBP"];
  const typePaiements = ["Carte de crédit", "Virement bancaire", "Chèque"];

  const randomIndex = (array) => Math.floor(Math.random() * array.length);

  return {
    id: id,
    site_vente: sites[randomIndex(sites)],
    type: types[randomIndex(types)],
    numero_facture: `F2024${100 + id}`,
    reference: `REF${100 + id}`,
    date: `2024-04-${10 + id}`,
    client_facture: `Client ${String.fromCharCode(65 + (id % 26))}`,
    client_intitule: `Entreprise ${String.fromCharCode(
      65 + (id % 26)
    )}${String.fromCharCode(65 + (id % 26))}${String.fromCharCode(
      65 + (id % 26)
    )}`,
    client_commande: `CMD00${id}`,
    tiers_payeur: `Tiers ${String.fromCharCode(65 + (id % 26))}`,
    client_groupe: `Groupe ${String.fromCharCode(65 + (id % 26))}`,
    etat: etats[randomIndex(etats)],
    devise: devises[randomIndex(devises)],
    debut_echeance: `2024-05-${10 + id}`,
    type_paiement: typePaiements[randomIndex(typePaiements)],
    date_debut_periode: `2024-04-${10 + id}`,
    date_fin_periode: `2024-04-${20 + id}`,
    lignes: [
      {
        article: `Produit ${String.fromCharCode(65 + (id % 26))}`,
        quantite: Math.floor(Math.random() * 10) + 1,
        reste_a_livrer: Math.floor(Math.random() * 5),
        prix_brut: Math.floor(Math.random() * 100) + 50,
        remise_1: Math.floor(Math.random() * 10),
        remise_2: Math.floor(Math.random() * 5),
        frs1: Math.floor(Math.random() * 20),
        total_ht: Math.floor(Math.random() * 1000) + 500,
        taxe: Math.floor(Math.random() * 50),
        total_ttc: Math.floor(Math.random() * 1200) + 1000,
      },
      {
        article: `Produit ${String.fromCharCode(65 + ((id + 1) % 26))}`,
        quantite: Math.floor(Math.random() * 10) + 1,
        reste_a_livrer: Math.floor(Math.random() * 5),
        prix_brut: Math.floor(Math.random() * 100) + 50,
        remise_1: Math.floor(Math.random() * 10),
        remise_2: Math.floor(Math.random() * 5),
        frs1: Math.floor(Math.random() * 20),
        total_ht: Math.floor(Math.random() * 1000) + 500,
        taxe: Math.floor(Math.random() * 50),
        total_ttc: Math.floor(Math.random() * 1200) + 1000,
      },
    ],
    document: `Facture_F2024${100 + id}.pdf`,
  };
};

const generateInvoices = (count) => {
  const invoices = [];
  for (let i = 1; i <= count; i++) {
    invoices.push(generateRandomInvoice(i));
  }
  return invoices;
};

const data = generateInvoices(200);
export default data;
