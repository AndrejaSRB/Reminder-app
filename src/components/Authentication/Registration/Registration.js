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
import { Form } from "react-final-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  validateEmail,
  validateUserName,
  validatePassword
} from "../validation";
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
  background: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#344955"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    "& > div": {
      margin: "5px 0"
    }
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
  additionalLink: {
    color: "#000000",
    textDecoration: "none",
    cursor: "pointer",
    margin: "5px 0"
  },
  textField: {
    width: "100%",
    margin: "5px 0"
  },
  errorMessage: {
    color: "#d62020"
  }
}));

const Registration = props => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  const renderErrorMessage = errorMessage ? (
    <FormHelperText className={classes.errorMessage} margin="center">
      {errorMessage}
    </FormHelperText>
  ) : null;

  const onSubmit = async values => {
    fire
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(user => {
        localStorage.setItem("id", user.uid);
        let currentUser = fire.auth().currentUser;
        currentUser.updateProfile({
          displayName: values.userName
        });
      })
      .then(() => {
        props.history.push("/");
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <div className={classes.background}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <img src={logo} alt="logo" />
          </Avatar>
          <Form
            onSubmit={onSubmit}
            validate={values => {
              const errors = {};
              if (!values.confirm) {
                errors.confirm = "Password is required";
              } else if (values.confirm !== values.password) {
                errors.confirm = "Password's must match";
              }
              return errors;
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <CustomField
                  validation={validateUserName}
                  type="text"
                  placeholder="Username"
                  label="Username"
                  variant="outlined"
                  fullWidth={true}
                  name="username"
                />
                <CustomField
                  validation={validateEmail}
                  type="text"
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
                />
                <CustomField
                  validation={validatePassword}
                  type="password"
                  placeholder="Confirm password"
                  label="Confirm password"
                  variant="outlined"
                  fullWidth={true}
                  name="confirm"
                />
                <div className="buttons">
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                  >
                    <Icon className={classes.buttonIcon}>exit_to_app</Icon>
                    <div>Sign up</div>
                  </Button>
                  {renderErrorMessage}
                </div>
              </form>
            )}
          />
          <div>
            <Link to="/login" className={classes.additionalLink}>
              You have an account? Let's login.
            </Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default withRouter(Registration);
