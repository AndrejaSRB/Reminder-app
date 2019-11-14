import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Avatar, Typography } from "@material-ui/core";
import CustomButton from "../../UI/CustomButton";
import withDashboard from "../../../hoc/withDashboard";
import { useDispatch } from "react-redux";
import { deleteFilterRoute } from "../../../store/actions/actions/reminders";

const useStyles = makeStyles(theme => ({
  userMenuHolder: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
      margin: "0 auto"
    }
  },
  userHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "30px 20px 0 20px",
    paddingTop: 10,
    height: 100,
    position: "relative",
    backgroundColor: "#344955",
    borderRadius: 10,
    [theme.breakpoints.up("md")]: {
      margin: "30px 120px 0 120px",
      height: 120
    }
  },
  topSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
    color: "#FFFFFF"
  },
  avatarHolder: {
    position: "absolute",
    bottom: -60,
    zIndex: 111,
    borderRadius: "50%",
    border: "8px solid #F0EFE9"
  },
  avatar: {
    border: "3px solid #232F34",
    width: 80,
    height: 80,
    backgroundColor: "#232F34",
    [theme.breakpoints.up("md")]: {
      width: 100,
      height: 100
    }
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 30,
    width: "100%",
    "& > a": {
      textDecoration: "none",
      width: "70%",
      margin: "10px 0"
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
      margin: "15px auto"
    }
  },
  profilePicture: {
    width: "100%",
    height: "100%"
  },
}));

const UserMenu = props => {
  const classes = useStyles();
  const profilePictureURL = useSelector(state => state.root.profilePictureURL);
  const user = useSelector(state => state.root.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(deleteFilterRoute());
  }, [dispatch]);
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

  const isAuth = user ? (
    <div className={classes.userMenuHolder}>
      <Paper className={classes.userHolder}>
        <div className={classes.avatarHolder}>
          <Avatar className={classes.avatar} aria-describedby={"avatar"}>
            {profilePictureURL
              ? renderProfilePictureFromRedux
              : renderProfilePicture}
          </Avatar>
        </div>
      </Paper>
      <Paper className={classes.userHolder}>
        <div className={classes.topSection}>
          <Typography gutterBottom variant="h6" component="h2">
            {user.displayName}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {user.email}
          </Typography>
        </div>
      </Paper>
      <div className={classes.bottomSection}>
        <Link to="/user/edit">
          <CustomButton type="button" name="Update Information" icon="person" />
        </Link>
        <Link to="/user/change-password">
          <CustomButton type="button" name="Change password" icon="lock" />
        </Link>
      </div>
    </div>
  ) : (
    <div className={classes.userMenuHolder}>
      <Paper className={classes.userHolder}>
        <div className={classes.avatarHolder}>
          <Avatar className={classes.avatar} aria-describedby={"avatar"}>
            {profilePictureURL
              ? renderProfilePictureFromRedux
              : renderProfilePicture}
          </Avatar>
        </div>
      </Paper>

      <Paper className={classes.userHolder} />
      <div className={classes.bottomSection}>
        <Link to="/user/edit">
          <CustomButton type="button" name="Update Information" icon="person" />
        </Link>
        <Link to="/user/change-password">
          <CustomButton type="button" name="Change password" icon="lock" />
        </Link>
      </div>
    </div>
  );

  return <div>{isAuth}</div>;
};

export default withDashboard(UserMenu);
