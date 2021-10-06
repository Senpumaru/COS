import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import Home from "../../Screens/Home";
import { Route, Switch } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faElementor } from "@fortawesome/free-brands-svg-icons";
import { faFolderPlus, faSearch, faUserMd } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../../Screens/Cases/Dashboard";
import { ScopedCssBaseline } from "@mui/material";


const drawerWidth = 220;

function Interface(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography p={0.35} pr={4} align="right" variant="h4">
        Панель
      </Typography>
      <Divider />
      <List>
        <ListItem component={Link} to="/" button>
          <ListItemIcon sx={{
            fontSize: 30,
            paddingLeft: "0.2rem",
            color: "success.main",
          }}>
            <FontAwesomeIcon icon={faElementor} />
          </ListItemIcon>
          <ListItemText primary="Главное меню" />
        </ListItem>
        <ListItem component={Link} to="/Database" button>
          <ListItemIcon sx={{
            fontSize: 30,
            paddingLeft: "0.2rem",
            color: "success.main",
          }}>
            <FontAwesomeIcon icon={faElementor} />
          </ListItemIcon>
          <ListItemText primary="База данных" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <React.Fragment>
    
    <Box sx={{ display: "flex" }}>
      
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div">
            COS | ИГХ : PD-L1
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Container maxWidth={false} component="main" sx={{ flexGrow: 1, p: 2 }}>
        
        <Toolbar />
        <Switch>       
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            
          </Route>
          <Route path="/search">{/* <Search /> */}</Route>

          
          <Route path="/Database">
            <Dashboard/>
          </Route>
        </Switch>
      </Container>
    </Box>
    </React.Fragment>
  );
}

export default Interface;
