import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SideMenu from "../Drawer/Drawer";
import {Icon,Avatar} from "@material-ui/core";
import { useSelector } from "react-redux";
import fire from "../../config";

const useStyles = makeStyles(theme => ({
  header: {
    height: 50,
    backgroundColor: "#344955",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    color: "#FFFFFF",
  },
  menuIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > span": {
      cursor: "pointer"
    }
  },
  menuIconItem: {
    marginLeft: 18
  },
  profilePicture: {
    width: "100%"
  }
}));

const Header = props => {
  const classes = useStyles();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const profilePictureURL = useSelector(state => state.root.profilePictureURL);
  const user = fire.auth().currentUser;
  const toggleDrawer = isOpen => event => {
    setIsOpenSideMenu(isOpen);
  };

  const renderProfilePictureFromRedux = profilePictureURL ? (
    <img
      src={profilePictureURL}
      alt="avatar"
      className={classes.profilePicture}
    />
  ) : (
    "A"
  );

  const renderProfilePicture = user.photoURL ? (
    <img src={user.photoURL} alt="avatar" className={classes.profilePicture} />
  ) : null;

  return (
    <React.Fragment>
      <div className={classes.header}>
        <div onClick={toggleDrawer(true)} className={classes.menuIcon}>
          <Icon>menu</Icon>
        </div>
        <div className={classes.menuIcon}>
          <Avatar aria-describedby={"avatar"} className={classes.menuIconItem}>
            {profilePictureURL
              ? renderProfilePictureFromRedux
              : renderProfilePicture}
          </Avatar>
        </div>
      </div>
      <SideMenu toggleDrawer={toggleDrawer} open={isOpenSideMenu} />
    </React.Fragment>
  );
};

export default Header;
