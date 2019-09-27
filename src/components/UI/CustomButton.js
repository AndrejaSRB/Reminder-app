import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  buttonHolder: {
    textDecoration: "none",
    width: "100%",
    backgroundColor: "#344955",
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontSize: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    padding: '0',
    "& > span > div": {
      marginRight: 'auto'
    }
  },
  buttonIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "22px 20px",
    backgroundColor: "#F9AA33",
    color: "#232F34",
    position: "relative",
    overflow: "visible",
    marginRight: 'auto',
    "&:after": {
      content: "''",
      position: "absolute",
      right: -18,
      top: "50%",
      width: 0,
      height: 0,
      borderLeft: "12px solid #F9AA33",
      borderBottom: "12px solid transparent",
      borderTop: "12px solid transparent",
      transform: "translate(-50%, -50%)"
    }
  }
}));

const CustomButton = props => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      component="label"
      className={classes.buttonHolder}
    >
      <Icon className={classes.buttonIcon}>{props.icon}</Icon>
      <div>{props.name}</div>
      {props.children}
    </Button>
  );
}

export default CustomButton;