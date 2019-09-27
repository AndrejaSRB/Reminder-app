import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chosenFile: {
    margin: "10px 0 10px 0",
    height: 300,
    border: "1px solid #BFBEBA",
    textAlign: "center",
    display: "block",
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    position: 'relative',
    backgroundColor: "#D5D3CF"
  },
  profileImage: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
  }
}));

const PreviewPicture = props => {
  const classes = useStyles();
  const { pictureUrl } = props;
  return (
    <div>
      <div className={classes.paper}>
        <div className={classes.chosenFile}>
          {pictureUrl ? (
            <img
              src={pictureUrl}
              alt="profile avatar"
              className={classes.profileImage}
            />
          ) : (
            <div className={classes.placeholder}>Picture preview</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPicture;
