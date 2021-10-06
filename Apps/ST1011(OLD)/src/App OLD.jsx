import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CaseUpdateForm from './components/Cases/Forms/UpdateForm';
import axios from "axios";

import ErrorScreen from './Screens/Account/ErrorScreen';
import LoginScreen from './Screens/Account/LoginScreen';
import Reg from './Screens/Account/Reg';

import CaseBoard from './Screens/Cases/CaseBoard';
import CaseArchive from './Screens/Cases/CaseArchive';
import CaseReview from './Screens/Cases/CaseReview';
import theme from './Theme/Theme';
import Dashboard from './Screens/Dashboard';


// Axios CSRF security
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.withCredentials = true;

/*** Material UI Styles Override ***/
const useStyles = makeStyles(theme => ({
  app: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

function AppProtectedRoute({ application: App, component: Component, ...rest }) {

  const userLogin = useSelector(state => state.Profile["userLogin"])
  const { loading, error, userInfo } = userLogin

  return (
    <Route {...rest} render={
      (props) => {
        if (userInfo != null) {

          switch (App) {
            case "ST1011":
              if (userInfo["application_rights"]["ST1011"] === true) {
                return <Component {...props} />

              } else {
                return <Redirect to="/Error" />
              }
            
            default:
              return <Component {...props} />
          }
        } else {
          return <Redirect to="/Login" />
        }
      }
    } />
  )
}

function App() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      
      <BrowserRouter>
        <Switch>
          
          <Route path='/Register' component={Reg} />
          <Route path="/Login" component={LoginScreen} />
          <Route path="/Error" component={ErrorScreen} />
          {/* URL Error screen for invalid URL  */}
          
          <React.Fragment>
            <div className={classes.app}>
              
              <main className={classes.content}>
                <Toolbar />
                <AppProtectedRoute exact path="/" component={Dashboard} />
                <AppProtectedRoute exact path="/ST1011" application="ST1011" component={CaseBoard} />
                <AppProtectedRoute exact path="/ST1011/Case/:id" application="ST1011" component={CaseUpdateForm} />
                <AppProtectedRoute exact path="/ST1011/Case/Review/:id" application="ST1011" component={CaseReview} />
                <AppProtectedRoute exact path="/ST1011/Case/:personalNumber/Archive" application="ST1011" component={CaseArchive} />
                
              </main>
            </div>
          </React.Fragment>
          <Route render={() => <Redirect to={{pathname: "/Error"}} />} /> 
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;