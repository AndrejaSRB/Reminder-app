import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import fire from "../../../config";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes/reminders";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import withDashboard from "../../../hoc/withDashboard";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  formHolder: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 70
  },
  avatar: {
    margin: 0,
    backgroundColor: "#232F34",
    position: "absolute",
    bottom: -25,
    width: 50,
    height: 50,
    border: "5px solid #F0EFE9",
    color: "#F9AA33"
  },
  paper: {
    width: "100%",
    marginTop: 15,
    backgroundColor: "#344955",
    color: "#FFFFFF",
    position: "relative",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: 15
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submitBtn: {
    marginTop: 10
  },
  inputHolder: {
    width: "100%",
    marginTop: 15
  },
  uploadBtn: {
    textDecoration: "none",
    width: "70%",
    backgroundColor: "#344955",
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px auto",
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
  }
}));

const ChangePassword = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    newPassword: "",
    repeatedNewPassword: ""
  });
  const [visible, setVisible] = useState({
    newPassword: "password",
    repeatedNewPassword: "password"
  });

  const handleSubmit = e => {
    const { newPassword, repeatedNewPassword } = values;
    let user = fire.auth().currentUser;
    e.preventDefault();

    if (newPassword === repeatedNewPassword) {
      user.updatePassword(newPassword).then(() => {
        dispatch({
          type: actionTypes.SAVE_USER_INFORMATION,
          payload: user
        });
        props.history.push("/user");
      });
    }
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleVisibility = name => event => {
    setVisible({ ...visible, [name]: "text" });
  };

  const { newPassword, repeatedNewPassword } = visible;
  const renderIconRepeat =
    repeatedNewPassword === "text" ? "visibility" : "visibility_off";
  const renderIconNewPassword =
    newPassword === "text" ? "visibility" : "visibility_off";

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.formHolder}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Icon>lock</Icon>
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>
              Change password
            </Typography>
          </Paper>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <FormControl className={classes.inputHolder}>
              <TextField
                type={newPassword}
                placeholder="Search"
                label="Search"
                variant="filled"
                fullWidth
                value={values.userName}
                onChange={handleChange("newPassword")}
                autoComplete="pass"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleVisibility("newPassword")}>
                        <Icon>{renderIconNewPassword}</Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <FormControl className={classes.inputHolder}>
              <TextField
                variant="filled"
                margin="dense"
                fullWidth
                name="repeatedNewPassword"
                label="Repeat new Password"
                type={repeatedNewPassword}
                id="repeatedNewPassword"
                autoComplete="repeatedNewPassword"
                onChange={handleChange("repeatedNewPassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={handleVisibility("repeatedNewPassword")}
                      >
                        <Icon>{renderIconRepeat}</Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className={classes.uploadBtn}
            >
              <Icon className={classes.buttonIcon}>save_alt</Icon>
              <div>Change password</div>
            </Button>
          </form>
        </div>
      </Container>
  );
};

export default withDashboard(ChangePassword);
