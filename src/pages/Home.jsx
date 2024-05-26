import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InvoicesTable from "../components/invoices/InvoicesTable";
import AddInvoice from "../components/invoices/addInvoice/AddInvoice";
import Claims from "../components/claims/Claims";
import SuppliersTable from "../components/suppliers/SuppliersTable";
import {jwtDecode} from "jwt-decode";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  const isAdmin = decodedToken && decodedToken.roles[0] === "Administrateur";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <h2 style={{ marginBottom: "1rem" }}>Tableau de bord</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: "green",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={isAdmin ? "Factures" : "Mes factures"} {...a11yProps(0)} />
          {isAdmin && <Tab label="Fournisseurs" {...a11yProps(1)} />}
          <Tab label={isAdmin ? "Réclamations" : "Mes réclamations"} {...a11yProps(isAdmin ? 2 : 1)} />
          {!isAdmin && <Tab label="Déposer une facture" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InvoicesTable />
      </CustomTabPanel>
      {isAdmin && (
        <CustomTabPanel value={value} index={1}>
          <SuppliersTable />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={value} index={isAdmin ? 2 : 1}>
        <Claims />
      </CustomTabPanel>
      {!isAdmin && (
        <CustomTabPanel value={value} index={2}>
          <AddInvoice />
        </CustomTabPanel>
      )}
    </Box>
  );
}
