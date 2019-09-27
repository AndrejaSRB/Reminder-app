import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { icons } from "./icons";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  modalContainer: {
    "& > div > div": {
      minWidth: "80%",
      minHeight: 300,
      [theme.breakpoints.up("sm")]: {
        minWidth: 500,
        minHeight: 600
      }
    }
  },
  textField: {
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  },
  iconsHolder: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center"
  },
  icons: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "33.3%",
    margin: "10px 0",
    transition: "all .6s",
    height: 50,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    "& > span": {
      fontSize: 40
    },
    [theme.breakpoints.up("sm")]: {
      width: "20%"
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > button": {
      color: "#344955"
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconPicker = props => {
  const classes = useStyles();
  const { open, handleIconPickerModal, handlePickIcon } = props;
  const [search, setSearch] = useState("");
  const [iconList, setIconList] = useState([]);

  const handleClickIcon = icon => () => {
    handlePickIcon(icon);
    handleIconPickerModal(false)();
  };

  const renderIcons =
    iconList && iconList.length > 0
      ? iconList.map(icon => (
          <div
            className={classes.icons}
            key={icon}
            onClick={handleClickIcon(icon)}
          >
            <Icon>{icon}</Icon>
          </div>
        ))
      : icons.map(icon => (
          <div
            className={classes.icons}
            key={icon}
            onClick={handleClickIcon(icon)}
          >
            <Icon>{icon}</Icon>
          </div>
        ));

  const handleSearch = e => {
    setSearch(e.target.value);
    if (e.target.value.length >= 2) {
      let iconsList = [];
      icons.map(icon =>
        icon.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
          ? iconsList.push(icon)
          : null
      );
      setIconList(iconsList);
    } else {
      setIconList(icons);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleIconPickerModal(false)}
        className={classes.modalContainer}
      >
        <DialogTitle>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.pickedIcon}
          >
            Pick some icon:
          </Typography>
          <TextField
            type="text"
            placeholder="Search"
            label="Search"
            variant="outlined"
            fullWidth
            className={classes.textField}
            value={search}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Tooltip title="Instead space use underscore!">
                    <Icon>report</Icon>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </DialogTitle>
        <DialogContent>
          <div>
            <div className={classes.iconsHolder}>{renderIcons}</div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIconPickerModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IconPicker;
