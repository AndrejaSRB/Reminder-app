import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import fire, { storage } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import UploadPicture from "../UploadPicture/UploadPicture";
import * as actionTypes from "../../../store/actions/actionTypes/reminders";
import uniqid from "uniqid";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import withDashboard from "../../../hoc/withDashboard";

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
  additionalLink: {
    color: "#000000",
    textDecoration: "none",
    cursor: "pointer",
    margin: "5px 0",
    display: "block"
  },
  imageHolder: {
    textAlign: "left"
  },
  chosenFile: {
    margin: "20px 10px",
    height: 300,
    border: "1px solid black",
    textAlign: "center",
    display: "block"
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
    margin: "auto",
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

const UpdateInformation = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.root.user);
  const name = user ? user.displayName : "";
  const phone = user ? user.phoneNumber : "";
  const [values, setValues] = useState({
    userName: name,
    phone: phone
  });
  const [picture, setPicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);

  const handleSubmit = e => {
    const { userName, phone } = values;
    let user = fire.auth().currentUser;
    e.preventDefault();

    if (picture) {
      if (user != null) {
        storage
          .child(`profile/${uniqid()}`)
          .put(picture)
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              user
                .updateProfile({
                  photoURL: url,
                  displayName: userName,
                  phoneNumber: phone
                })
                .then(() => {
                  dispatch({
                    type: actionTypes.SAVE_USER_INFORMATION,
                    payload: user
                  });
                });
            });
            dispatch({
              type: actionTypes.SAVE_USER_PROFILE_PICTURE,
              payload: pictureUrl
            });
            props.history.push("/user");
          });
      }
    } else {
      user
        .updateProfile({
          displayName: userName,
          phoneNumber: phone
        })
        .then(() => {
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.formHolder}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon>person</Icon>
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            Personal information
          </Typography>
        </Paper>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleChange("userName")}
            type="text"
            value={values.userName}
          />
          <TextField
            variant="filled"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            type="text"
            id="phone"
            autoComplete="phoneNumber"
            onChange={handleChange("phone")}
          />
          <UploadPicture
            setPicture={setPicture}
            setPictureUrl={setPictureUrl}
            pictureUrl={pictureUrl}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.uploadBtn}
          >
            <Icon className={classes.buttonIcon}>save_alt</Icon>
            <div>Update profile</div>
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withDashboard(UpdateInformation);
