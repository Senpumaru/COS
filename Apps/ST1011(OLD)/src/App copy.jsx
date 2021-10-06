import { Button, Collapse } from "@material-ui/core";
import AirplayIcon from "@material-ui/icons/Airplay";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "./actions/Account/UserActions";
import CaseUpdateForm from "./components/Cases/Forms/UpdateForm";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ErrorScreen from "./screens/Account/ErrorScreen";
import LoginScreen from "./screens/Account/LoginScreen";
import Reg from "./screens/Account/Reg";
import CaseArchive from "./screens/Cases/CaseArchive";
import CaseBoard from "./screens/Cases/CaseBoard";
import CaseReview from "./screens/Cases/CaseReview";
import Dashboard from "./screens/Dashboard";
import theme from "./Theme/Theme";

const drawerWidth = 220;

const queryClient = new QueryClient();

function AppProtectedRoute({ application: App, component: Component, ...rest }) {
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { loading, error, userInfo } = userLogin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo != null) {
          switch (App) {
            case "ST1011":
              if (userInfo["application_rights"]["ST1011"] === true) {
                return <Component {...props} />;
              } else {
                return <Redirect to="/Error" />;
              }

            default:
              return <Component {...props} />;
          }
        } else {
          return <Redirect to="/Login" />;
        }
      }}
    />
  );
}

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar
  /*** Redux States ***/
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /*** Local States ***/
  /* Check available services */
  if (userInfo) {
    var appPermissions = Object.keys(userInfo["application_rights"]).some(function (app) {
      return userInfo["application_rights"][app] === true;
    });
  }

  /* Sidebar content */
  const [services, setServices] = useState(false);

  const handleServices = () => {
    setServices(!services);
  };

  /** Logout **/
  const dispatch = useDispatch();

  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/Login");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        
        <Router>
          <Box sx={{ display: "flex" }}>
            <AppBar
              position="fixed"
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
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h3" noWrap component="div">
                  COS | ИГХ: PD-L1
                </Typography>
                <section>
                  {userInfo ? (
                    <div sx={{ display: { xs: "none", md: "block" } }}>
                      <Button color="inherit">
                        {userInfo["first_name"]} {userInfo["last_name"]}{" "}
                      </Button>
                      <Button onClick={logoutHandler} color="inherit" endIcon={<PowerSettingsNewIcon />}>
                        Выйти
                      </Button>
                      <Button color="inherit">
                        <strong>RU</strong>
                      </Button>
                    </div>
                  ) : null}
                </section>
              </Toolbar>
            </AppBar>

            <Box
              component="nav"
              sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", md: "block" },
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
              >
                <Typography m={1} variant="h4" align="right">
                  Панель
                </Typography>
                <List>
                  <ListItem component={Link} to="/ST1011" button>
                    <ListItemIcon>
                      <HomeWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Главная панель" />
                  </ListItem>

                  {/* Check services permissions */}
                  {appPermissions ? (
                    <ListItem button onClick={handleServices}>
                      <ListItemIcon>
                        <AppsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Сервисы" />
                      {services ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  ) : (
                    <ListItem>
                      На вашем аккаунте нет привязаных приложений. Свяжитесь с пользователями высшей категории, или
                      администрацией сайта для получения прав.
                    </ListItem>
                  )}
                  <Collapse in={services} timeout="auto" unmountOnExit>
                    {userInfo ? (
                      <React.Fragment>
                        <List component="div" disablePadding>
                          {userInfo["application_rights"]["ST1010"] === true && (
                            <ListItem onClick={() => window.open(`http://st1010.cos.omr/`)} button>
                              <ListItemIcon>
                                <AirplayIcon />
                              </ListItemIcon>
                              <ListItemText primary="ИГХ: ALK" />
                            </ListItem>
                          )}
                          {userInfo["application_rights"]["ST1011"] === true && (
                            <ListItem button>
                              <ListItemIcon>
                                <AirplayIcon />
                              </ListItemIcon>
                              <ListItemText primary="ИГХ: PD-L1" />
                            </ListItem>
                          )}
                        </List>
                      </React.Fragment>
                    ) : null}
                  </Collapse>
                </List>
              </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Switch>
                <Route path="/Register" component={Reg} />
                <Route render={() => <Redirect to={{ pathname: "/Error" }} />} />
                <AppProtectedRoute exact path="/" component={Dashboard} />
                <AppProtectedRoute exact path="/ST1011" application="ST1011" component={CaseBoard} />
                {/* <Route path="/Login" component={LoginScreen} />
                <Route path="/Error" component={ErrorScreen} />
                

                <React.Fragment>
                  <div >
                    
                    <main>
                      <Toolbar />
                      <AppProtectedRoute
                        exact
                        path="/ST1011/Case/:id"
                        application="ST1011"
                        component={CaseUpdateForm}
                      />
                      <AppProtectedRoute
                        exact
                        path="/ST1011/Case/Review/:id"
                        application="ST1011"
                        component={CaseReview}
                      />
                      <AppProtectedRoute
                        exact
                        path="/ST1011/Case/:personalNumber/Archive"
                        application="ST1011"
                        component={CaseArchive}
                      />
                    </main>
                  </div>
                </React.Fragment> */}
              </Switch>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default ResponsiveDrawer;
