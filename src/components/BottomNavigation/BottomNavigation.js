import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppsIcon from "@material-ui/icons/Apps";
import UserIcon from "@material-ui/icons/Person";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes/reminders";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
    height: 56,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#344955",
    borderTop: "1px solid #a3a3a3"
  },
  link: {
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    transition: "all .4s",
    marginBottom: 2
  },
  navButton: {
    "& > span > span": {
      opacity: "1 !important",
      fontSize: 12
    }
  },
  active: {
    color: "#F9AA33",
    transform: "scale(1.3)"
  },
  navigationIcon: {
    fontSize: 28
  }
});

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClickFilter = () => {
    dispatch({
      type: actionTypes.DELETE_FILTER_ROUTE
    });
  };

  return (
    <div className={classes.root}>
      <BottomNavigationAction
        className={classes.navButton}
        icon={
          <NavLink
            to="/"
            className={classes.link}
            activeClassName={classes.active}
            exact
          >
            <AppsIcon className={classes.navigationIcon} />
          </NavLink>
        }
      />
      <BottomNavigationAction
        className={classes.navButton}
        onClick={handleClickFilter}
        icon={
          <NavLink
            to="/user"
            className={classes.link}
            activeClassName={classes.active}
            exact
          >
            <UserIcon className={classes.navigationIcon} />
          </NavLink>
        }
      />
    </div>
  );
};

export default SimpleBottomNavigation;
