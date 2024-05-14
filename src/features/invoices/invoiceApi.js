import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useJwt from  "../../hooks/useJwt"

const bon_a_payer = {1:"attente",2:"litige",3:"avoir",4:"bon a payer"};
const type_cours = {1:"cours du jour",2:"cours du mois",3:"cours moyen",4:"cours DEB",5:"cours CEE"};
const etat = {1:"en attente",2:"a valider",3:"validée"};

function convertirDate(chaine) {
    if (chaine.length !== 8) {
        return "Format de chaîne incorrect. Utilisez le format jjmmaaaa.";
    }

    var annee = chaine.substring(0, 4);
    var mois = chaine.substring(4, 6);
    var jour = chaine.substring(6, 8);

    var dateFormatee = jour + "/" + mois + "/" + annee;

    return dateFormatee;
}

function convertirEnObjetJSON(requeteSoap) {
    const lignes = requeteSoap.split('|');
    const objetsFactures = [];
    lignes.forEach(ligne => {
        if (ligne.trim()) {  
            const champs = ligne.split(';');
            const objetJSON = {
                "site_facturation": champs[1],
                "type_facture": champs[2],
                "numero_piece": champs[3],
                "date_comptable": convertirDate(champs[4]),
                "fournisseur": champs[5],
                "raison_sociale": champs[6],
                "bon_a_payer":bon_a_payer[champs[7]],
                "motif": champs[8],
                "date_facturation": convertirDate(champs[9]),
                "numero_facture": champs[10],
                "tiers_paye": champs[11],
                "devise": champs[12],
                "type_cours": type_cours[champs[13]],
                "facture_origine": champs[14],
                "ville": champs[15],
                "premiere_echeance": convertirDate(champs[16]),
                "condition_paiement": champs[17],
                "regime_taxe": champs[18],
                "total_ht": champs[19],
                "total_taxe": champs[20],
                "total_ttc": champs[21],
                "etat":etat[champs[22]]
            };
            objetsFactures.push(objetJSON);
        }
    });
    return objetsFactures;
}

const {token,decodedToken} = useJwt();

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const addInvoiceRequest = createAsyncThunk(
  "invoice/addInvoice",
  async (requestData) => {
      let url = "http://localhost:8080/invoices/"+decodedToken.id+"/addInvoice";
      let body = requestData;
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);


export const getInvoicesRequest = createAsyncThunk(
  "invoice/getInvoices",
  async (requestData) => {
      let url = "http://localhost:8080/invoices/call";
      let body = requestData;
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      console.log(convertirEnObjetJSON(data));
      return convertirEnObjetJSON(data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

export default addInvoiceRequest;
