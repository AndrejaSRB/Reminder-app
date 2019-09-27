import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  splashHolder: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  progress: {
    backgroundColor: "#344955",
    width: 150,
    height: 150,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const SplashScreen = props => {
  const classes = useStyles();
  return (
    <div className={classes.splashHolder}>
      <div className={classes.progress}>
        <CircularProgress color="secondary" size={60} />
      </div>
    </div>
  );
};

export default SplashScreen;
