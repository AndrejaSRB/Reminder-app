import React, { useState, lazy, Suspense } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SideMenu from "../components/Drawer/SideMenu";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Loader from "../components/UI/Loader";
import * as actionTypes from "../store/actions/actionTypes/reminders";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    padding: 20,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      padding: 0
    }
  },
  dashboardHolder: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#344955",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  homeToolbar: {
    padding: "0 16px"
  },
  avatar: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate(-50%, -50%)",
    "& > img": {
      width: "100%"
    }
  },
  sectionTitle: {
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: 600,
    justifyContent: "space-between"
  },
  date: {
    fontSize: 15,
    color: "#aaaaaa"
  },
  deleteToDoSmallDevices: {
    position: "fixed",
    bottom: 20,
    left: 20
  },
  icon: {
    fontSize: 18,
    marginLeft: 5,
    color: "#232F34"
  },
  classNameTag: {
    width: "100%",
    height: 20,
    "& > svg": {
      display: "none"
    }
  },
  titleHolder: {
    display: "flex",
    alignItems: "center"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    }
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3)
    }
  }
}));

const withDashboard = Component => props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const profilePictureURL = useSelector(state => state.root.profilePictureURL);
  const user = useSelector(state => state.root.user);
  const dispatch = useDispatch();
  const ListModal = lazy(() => import("../components/Lists/ListModal"));

  const renderProfilePictureFromRedux = profilePictureURL ? (
    <img
      src={profilePictureURL}
      alt="avatar"
      className={classes.profilePicture}
    />
  ) : (
    "A"
  );

  const renderProfilePicture =
    user && user.photoURL ? (
      <img
        src={user.photoURL}
        alt="avatar"
        className={classes.profilePicture}
      />
    ) : (
      "A"
    );

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleFilterRoute = () => {
    dispatch({
      type: actionTypes.DELETE_FILTER_ROUTE
    });
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddListModal = isOpen => () => {
    setIsAddListModalOpen(isOpen);
  };
  const renderAddListModal = isAddListModalOpen ? (
    <Suspense fallback={<Loader />}>
      <ListModal
        open={isAddListModalOpen}
        handleAddListModal={handleAddListModal}
      />
    </Suspense>
  ) : null;
  return (
    <div className={classes.root}>
      <div className={classes.dashboardHolder}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar className={classes.homeToolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Link to="/user" onClick={handleFilterRoute}>
            <Avatar className={classes.avatar}>
              {profilePictureURL
                ? renderProfilePictureFromRedux
                : renderProfilePicture}
            </Avatar>
          </Link>
        </AppBar>
        <SideMenu
          handleDrawerClose={handleDrawerClose}
          open={open}
          handleAddListModal={handleAddListModal}
        />
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Component {...props} />
      </main>
      {renderAddListModal}
    </div>
  );
};

export default withDashboard;
