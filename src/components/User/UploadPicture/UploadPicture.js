import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PreviewPicture from "../PreviewPicture/PreviewPicture";
import CustomButton from "../../UI/CustomButton";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: "10px 0 65px 0"
  },
  additionalLink: {
    color: "#000000",
    textDecoration: "none",
    cursor: "pointer",
    margin: "5px 0",
    display: "block"
  },
  uploadButton: {
    textDecoration: "none",
    width: "70%",
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
  },
  chosenFile: {
    margin: "10px 0 0 0",
    height: 300,
    border: "1px solid #BFBEBA",
    textAlign: "center",
    display: "block",
    width: "100%"
  },
  btnHolder: {
    textDecoration: "none",
    width: "70%",
    margin: "auto"
  }
}));

const UploadPicture = props => {
  const classes = useStyles();

  const displayImage = event => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      props.setPicture(file);
      props.setPictureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className={classes.paper}>
        <div className={classes.btnHolder}>
          <CustomButton name="Upload picture" icon="cloud_upload" type="button">
          <input type="file" style={{ display: "none" }} onChange={e => displayImage(e)}/>
          </CustomButton>
        </div>
        <PreviewPicture pictureUrl={props.pictureUrl} />
      </div>
    </div>
  );
};

export default UploadPicture;
