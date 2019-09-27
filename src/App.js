import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import ListReminders from "./components/ListReminders/ListReminders";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Registration from "./components/Authentication/Registration/Registration";
import Login from "./components/Authentication/Login/Login";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";
import fire from "./config";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "./store/actions/actionTypes/reminders";
import { GET_LISTS_START } from "./store/actions/actionTypes/lists";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import UserMenu from "./components/User/UserMenu/UserMenu";
import UpdateInformation from "./components/User/UpdateInformation/UpdateInformation";
import ChangePassword from "./components/User/ChangePassword/ChangePassword";
import ScrollToTop from "./components/UI/ScrollToTop";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Hidden from "@material-ui/core/Hidden";
import DetailsList from "./components/Lists/DetailsList";
import FilteredReminders from "./components/Reminders/FilteredReminders/FilteredReminders";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const useStyles = makeStyles(theme => ({
  App: {
    textAlign: "center",
    backgroundColor: "#F0EFE9",
    minHeight: "100vh",
  }
}));

const App = () => {
  const classes = useStyles();
  const [person, setPerson] = useState(null);
  const displaySplashScreen = useSelector(state => state.reminder.splashScreen);
  const isFilterRouteHidden = useSelector(
    state => state.reminder.isFilterRouteHidden
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          setPerson(user);
          localStorage.setItem("id", user.uid);
          dispatch({
            type: actionTypes.USER_LOGGED_IN
          });
          dispatch({
            type: actionTypes.SAVE_USER_INFORMATION,
            payload: user
          });
          dispatch({
            type: actionTypes.GET_REMINDERS_LIST_START,
            payload: user.uid
          });
          dispatch({
            type: GET_LISTS_START,
            payload: user.uid
          });
        } else {
          setPerson(null);
          localStorage.removeItem("id");
          localStorage.removeItem("user");
        }
      });
    };
    authListener();
  }, [dispatch]);

  const renderBottomNavigation = person ? <BottomNavigation /> : null;
  const renderHeader = person ? <Header /> : null;
  const renderFilterRoute = isFilterRouteHidden ? null : (
    <PrivateRoute
      path="/:criterium"
      exact
      component={FilteredReminders}
      person={person}
    />
  );
  const renderSplashScreen = displaySplashScreen ? (
    <SplashScreen />
  ) : (
    <BrowserRouter>
      <Hidden mdUp>{renderHeader}</Hidden>
      <Switch>
        <ScrollToTop>
          <DndProvider backend={HTML5Backend}>
            <Route path="/sign-up" exact component={Registration} />
            <Route path="/login" exact component={Login} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <PrivateRoute
              path="/user/edit"
              exact
              component={UpdateInformation}
            />
            <PrivateRoute
              path="/user/change-password"
              exact
              component={ChangePassword}
            />
            <PrivateRoute path="/user" exact component={UserMenu} />
            {renderFilterRoute}
            <PrivateRoute
              path="/list/:listName"
              exact
              component={DetailsList}
            />

            <PrivateRoute path="/" exact component={ListReminders} person={person} />
          </DndProvider>
        </ScrollToTop>
      </Switch>
      <Hidden mdUp>{renderBottomNavigation}</Hidden>
    </BrowserRouter>
  );
  return <div className={classes.App}>{renderSplashScreen}</div>;
};

export default App;
