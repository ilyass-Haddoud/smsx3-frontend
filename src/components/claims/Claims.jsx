import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClaimsTable from "./ClaimsTable";
import AddClaim from "./addClaim/AddClaim";
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

export default function Claims() {
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);
  const isAdmin = decodedToken && decodedToken.roles[0] === "Administrateur";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!isAdmin && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "green",
                },
              }}
              aria-label="basic tabs example"
            >
              <Tab label="Mes réclamations" {...a11yProps(0)} />
              <Tab label="Réclamer / Demander" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ClaimsTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <AddClaim />
          </CustomTabPanel>
        </>
      )}
      {isAdmin && <ClaimsTable />}
    </Box>
  );
}
