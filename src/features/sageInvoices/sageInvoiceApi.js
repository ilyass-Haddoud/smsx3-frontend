import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

function convertirEnObjetJSON(data) {
  const lines = data.split('|');

  const invoices = [];
  let currentInvoice = null;

  lines.forEach(line => {
      const columns = line.split(';');
      if (columns[0] === 'E') {
          currentInvoice = {
              "site": columns[1],
              "type_facture": columns[2],
              "numero_de_piece": columns[3],
              "date_comptable": convertirDate(columns[4]),
              "tiers": columns[5],
              "collectif": columns[6],
              "devise": columns[7],
              "bon_a_payer": columns[8],
              "document_origine": columns[9],
              "date_origine": convertirDate(columns[10]),
              "reference_interne": columns[11],
              "commentaires_0": columns[12],
              "commentaires_1": columns[13],
              "commentaires_2": columns[14],
              "total_ht_lignes": columns[15],
              "total_des_taxes": columns[16],
              "montant_ttc": columns[17],
              "etat": columns[18],
              "texte_entete_71": columns[19],
              "texte_entete_72": columns[20],
              "texte_pied_81": columns[21],
              "texte_pied_82": columns[22],
              "articles": []
          };
          invoices.push(currentInvoice);
      }
      else if (columns[0] === 'L') {
          const article = {
              "origine_ligne": columns[1],
              "numero_d_origine": columns[2],
              "ligne_d_origine": columns[3],
              "sequence_d_origine": columns[4],
              "article": columns[5],
              "designation": columns[6],
              "unite_facturation": columns[7],
              "quantite_facturee": columns[8],
              "prix_net": columns[9],
              "montant_ligne_ht": columns[10],
              "valeur1_remise_frais": columns[11],
              "valeur2_remise_frais": columns[12],
              "valeur3_remise_frais": columns[13],
              "affaire": columns[14],
              "texte_ligne_91": columns[15],
              "texte_ligne_92": columns[16]
          };
          currentInvoice.articles.push(article);
      }
  });

  return invoices;
}

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return `${year}${month}${day}`;
};

function toCSV(jsonData) {
  let csvString = "";

  jsonData.forEach(invoice => {
      csvString += `E;${invoice.site};${invoice.typeFacture};${invoice.numeroPiece};${formatDate(invoice.dateComptable)};${invoice.tiers};${invoice.collectif};${invoice.devise};${invoice.bonAPayer};${invoice.documentOrigine};${formatDate(invoice.dateOrigine)};${invoice.referenceInterne};${invoice.commentaires0};${invoice.commentaires1};${invoice.commentaires2};${invoice.totalHTLignes};${invoice.totalTaxes};${invoice.montantTTC};${invoice.etat};${invoice.texteEntete71};${invoice.texteEntete72};${invoice.textePied81};${invoice.textePied82}|`;

      invoice.items.forEach(item => {
          csvString += `L;${item.origineLigne};${item.numeroOrigine};${item.ligneOrigine};${item.sequenceOrigine};${item.article};${item.designation};${item.uniteFacturation};${item.quantiteFacturee};${item.prixNet};${item.montantLigneHT};${item.valeurRemiseFrais1};${item.valeurRemiseFrais2};${item.valeurRemiseFrais3};${item.affaire};${item.texteLigne91};${item.texteLigne92}|`;
      });
  });

  csvString += "END";

  return csvString;
}

export const getInvoicesFromSageRequest = createAsyncThunk(
  "sageInvoice/getInvoicesFromSageRequest",
  async ({token, decodedToken}) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let url = "http://localhost:8080/invoices/call";
    try {
      const res = await axios.post(url, config);
      const data = await res.data;
      return convertirEnObjetJSON(data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addInvoiceToSageRequest = createAsyncThunk(
  "sageInvoice/addInvoiceToSageRequest",
  async ({requestData, token, decodedToken}) => {
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    };
    let url = "http://localhost:8080/invoices/sage/addInvoice";
    let body = toCSV([requestData])
    console.log(body);
    try {
      const res = await axios.post(url, body, config);
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);


