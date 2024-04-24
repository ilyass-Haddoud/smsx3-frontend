import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutModal from "../logout/LogoutModal";
import sageIcon from "../../assets/SageLogo.png"
import useJwt from "../../hooks/useJwt";
import { fontSize } from "@mui/system";

const pages = [
  { name: "Home", url: "/" },
  { name: "Login", url: "/auth/login" },
  { name: "Register", url: "/auth/register" },
];
const settings = [
  {name:"Profile",url:"/profile"},
  {name:"Account",url:"/account"},
  {name:"Dashboard",url:"/dashboard"},
  {name:"Logout",url:"/logout"}
];

const {token,decodedToken} = useJwt();

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);

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

  return (
    <div className="header" style={{ marginBottom: "2rem" }}>
      <AppBar position="sticky">
        <Container maxWidth="xl" sx={{ maxHeight: "10vh", bgcolor: "black" }}>
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
              {pages.map((page) => (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  key={page.name}
                  to={page.url}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              { decodedToken.email &&
                <div>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <MenuIcon sx={{color: "white"}} fontSize="large"/>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
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
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        {setting.name != "Logout" && <Typography textAlign="center"><Link to={setting.url} style={{textDecoration:"none",color:"black"}}>{setting.name}</Link></Typography>}
                        {setting.name == "Logout" && <Typography textAlign="center"><Link onClick={() => setOpen(true)} style={{textDecoration:"none",color:"black"}}>{setting.name}</Link></Typography>}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              }
              { !decodedToken.email && <Button sx={{color: "white",border: "2px solid white", borderRadius: "15px", fontSize: "12px" }}>Connection</Button>}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LogoutModal open={open} setOpen={setOpen}/>
    </div>
  );
};
export default Header;
