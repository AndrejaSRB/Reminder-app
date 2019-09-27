import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import fire from "../../../config";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import logo from "../../../assets/reminder-logo.png";
import { withRouter } from "react-router";
import Icon from "@material-ui/core/Icon";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Form } from "react-final-form";
import { validateEmail, validatePassword } from "../validation";
import CustomField from "../../UI/CustomField";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 350
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F9AA33",
    padding: 5,
    width: 70,
    height: 70,
    "& > img": {
      width: "100%",
      height: "100%"
    }
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    "& > div": {
      margin: "5px 0"
    }
  },
  additionalLink: {
    color: "#000000",
    textDecoration: "none",
    cursor: "pointer",
    margin: "5px 0",
    display: "block"
  },
  background: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#344955"
  },
  submit: {
    textDecoration: "none",
    backgroundColor: "#344955",
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "10px 0",
    padding: "0",
    "& > span > div": {
      marginRight: "auto"
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
    marginRight: "auto",
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
  },
  errorMessage: {
    color: "#f73131"
  }
}));

const LogIn = props => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async values => {
    fire
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(user => {
        localStorage.setItem("id", user.uid);
        props.history.push("/");
      })
      .catch(error => setErrorMessage(error.message));
  };

  const renderErrorMessage = errorMessage ? (
    <FormHelperText className={classes.errorMessage}>
      {errorMessage}
    </FormHelperText>
  ) : null;
  return (
    <div className={classes.background}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <img src={logo} alt="logo" />
          </Avatar>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <CustomField
                  validation={validateEmail}
                  type="email"
                  placeholder="E-mail"
                  label="E-mail"
                  variant="outlined"
                  fullWidth={true}
                  name="email"
                />
                <CustomField
                  validation={validatePassword}
                  type="password"
                  placeholder="Password"
                  label="Password"
                  variant="outlined"
                  fullWidth={true}
                  name="password"
                  multiline={false}
                />
                <div className="buttons">
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                  >
                    <Icon className={classes.buttonIcon}>exit_to_app</Icon>
                    <div>Log in</div>
                  </Button>
                  {renderErrorMessage}
                </div>
              </form>
            )}
          />
          <div>
            <Link to="/sign-up" className={classes.additionalLink}>
              Don't have an account? Sign Up
            </Link>
            <Link to="/forgot-password" className={classes.additionalLink}>
              Forgot password?
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default withRouter(LogIn);
