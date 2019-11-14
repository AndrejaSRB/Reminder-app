import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import fire from "../../../config";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import logo from "../../../assets/reminder-logo.png";
import Icon from "@material-ui/core/Icon";
import { Form } from "react-final-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  validateEmail,
} from "../validation";
import CustomField from '../../UI/CustomField';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
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
  errorMessage: {
    color: "#d62020"
  }
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async values => {
    fire
      .auth()
      .sendPasswordResetEmail(values.email)
      .then(function(user) {
        props.history.push("/login");
      })
      .catch(function(error) {
        setErrorMessage(error.message);
      });
  }
  
  const renderErrorMessage = errorMessage ? (
    <FormHelperText className={classes.errorMessage} margin="center">
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
                <div className="buttons">
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                    fullWidth
                  >
                    <Icon className={classes.buttonIcon}>exit_to_app</Icon>
                    <div>Reset Password</div>
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
}
