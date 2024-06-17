import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../logout/LogoutModal";
import sageIcon from "../../assets/SageLogo.png"
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';


const pages = [
  {name:"Présentation", url: "/"},
  { name: "Acceuil", url: "/dashboard" },
  { name: "Connection", url: "/auth/login" },
  { name: "Inscription", url: "/auth/register" },
];




const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElContact, setAnchorElContact] = useState(null);

  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const decodedToken = token && jwtDecode(token);

  const connectdePages = (decodedToken && decodedToken.roles.includes("Administrateur")) ? [
    {name:"Présentation", url: "/"},
    { name: "Acceuil", url: "/dashboard" },
    { name: "Contactez-nous", url: "" },
  ] : [
    {name:"Présentation", url: "/"},
    { name: "Acceuil", url: "/dashboard" },
    { name: "Contactez-nous", url: "" },
    { name: "Mes Tickets", url: "" },
  ];
  
  const settings = [
    {name:"Account",url:"/account"},
    {name:"Control panel",url:"/control_panel"},
    {name:"Dashboard",url:"/dashboard"},
    {name:"Logout",url:"/logout"}
  ];
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenContactMenu = (event) => {
    setAnchorElContact(event.currentTarget);
  };

  const handleCloseContactMenu = () => {
    setAnchorElContact(null);
  };

  return (
    <div className="header" style={{ marginBottom: "2rem"}}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "black",
          borderRadius: "15px",
        }}
      >
        <Container maxWidth="xl" sx={{ maxHeight: "10vh", borderRadius: "15px" }}>
          <Toolbar disableGutters>
            <Box
              component="img"
              src={sageIcon}
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: 60 }}
            />    
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={page.url}
                      >
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1,flexGrow: 1, justifyContent: "center" }}>
              <img src={sageIcon} width={60}/>
            </Box>
            <Box
              sx={{ flexGrow: 1, gap: 15, display: { xs: "none", md: "flex" },justifyContent: "center" }}
            >
              {!token &&
                pages.map((page) => (
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    key={page.name}
                    to={page.url}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Link>
                ))
              }
              {token &&
                connectdePages.map((page) => (
                  page.name === "Contactez-nous" ?
                    <Link
                      key={page.name}
                      onClick={handleOpenContactMenu}
                      style={{ textDecoration: "none", color: "white", cursor: "pointer", my: 2, display: "block" }}
                    >
                      {page.name}
                    </Link>
                    :
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      key={page.name}
                      to={page.url}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Link>
                ))
              }
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              { token &&
                <div>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={decodedToken.email} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px",fontSize:"13px",textAlign:"center"}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <p>{decodedToken.email}</p>
                    <p style={{marginBottom:"10px"}}>{decodedToken.roles[0]}</p>
                    <hr/>
                    {settings.map((setting) => (
                      <MenuItem sx={{width:"15em"}} key={setting} onClick={handleCloseUserMenu}>
                        {setting.name != "Logout" && <Typography textAlign="center"><Link to={setting.url} style={{textDecoration:"none",color:"black"}}>{setting.name}</Link></Typography>}
                        {setting.name == "Logout" && <Typography textAlign="center"><Link onClick={() => setOpen(true)} style={{textDecoration:"none",color:"black"}}>{setting.name}</Link></Typography>}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              }
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LogoutModal open={open} setOpen={setOpen}/>
      <Menu
        id="contact-menu"
        anchorEl={anchorElContact}
        open={Boolean(anchorElContact)}
        onClose={handleCloseContactMenu}
        MenuListProps={{
          'aria-labelledby': 'contact-button',
        }}
        sx={{marginTop:2}}
      >
        <MenuItem onClick={handleCloseContactMenu}>Adresse email: smsx3.portal@gmail.com</MenuItem>
        <MenuItem onClick={handleCloseContactMenu}>Téléphone: 0123456789</MenuItem>
      </Menu>
    </div>
  );
};
export default Header;
