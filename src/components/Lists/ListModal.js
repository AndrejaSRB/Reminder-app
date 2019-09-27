import React, { useState, useEffect } from "react";
import {
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  Slide,
  TextField,
  Icon,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes/lists";
import IconPicker from "../UI/IconPicker/IconPicker";
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
  textField: {
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  },
  modalContainer: {
    " & > div > div": {
      width: "100%",
      margin: 20
    }
  },
  selectContainer: {
    width: "100%",
    margin: "10px 0"
  },
  pickedIcon: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    "& > span": {
      marginLeft: 8
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > button": {
      color: "#344955"
    }
  },
  form: {
    "& > div": {
      margin: "10px 0"
    },
    "& > div:nth-child(2)": {
      "& > div > button > div > div": {
        backgroundColor: "#344955"
      }
    }
  },
  dialogTitle: {
    backgroundColor: "#344955",
    color: "#FFFFFF"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewList = props => {
  const classes = useStyles();
  const [pickedIcon, setpickedIcon] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [title,setTitle] = useState("Create new list");
  const { handleAddListModal, open, list } = props;
  const user = useSelector(state => state.root.user);
  const order = useSelector(state => state.lists.lastListNumber);

  useEffect(() => {
    setpickedIcon("");
    return () => resetToDefaultValue();
  }, [open]);

  useEffect(() => {
    if (list) {
      setName(list.value.name);
      setpickedIcon(list.value.icon);
      setTitle("Edit list");
    }
    return () => resetToDefaultValue();
  }, [list]);

  const resetToDefaultValue = () => {
    setName("");
    setpickedIcon("");
    setTitle("Create new list");
  };
  const handlePickIcon = icon => {
    setpickedIcon(icon);
  };
  const handleIconPickerModal = isOpen => () => {
    setIsIconPickerOpen(isOpen);
  };

  const formatName = name => {
    if (name) {
      if (typeof name !== "string") return "";
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };
  const handleName = event => {
    setName(event.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (!list) {
      let orderNumber = order;
      let newList = {
        name: formatName(name),
        icon: pickedIcon,
        order: ++orderNumber,
        reminders: []
      };
      if (newList.icon && newList.name) {
        dispatch({
          type: actionTypes.ADD_LIST,
          payload: {
            body: newList,
            userId: user.uid
          }
        });
      }
    } else {
      let newList = {
        name: formatName(name),
        icon: pickedIcon,
        order: list.value.order,
        reminders: list.value.reminders
      };
      if (newList.icon && newList.name) {
        dispatch({
          type: actionTypes.EDIT_LIST,
          payload: {
            listId: list.id,
            body: newList,
            userId: user.uid
          }
        });
        props.history.push("/");
      }
    }
    handleAddListModal(false)();
  };
  const renderButtonName = list ? "Edit" : "Add";
  const renderPickedIcon = pickedIcon ? (
    <Typography
      gutterBottom
      variant="h5"
      component="p"
      className={classes.pickedIcon}
    >
      You picked: <Icon>{pickedIcon}</Icon>
    </Typography>
  ) : null;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAddListModal(false)}
        className={classes.modalContainer}
      >
        <DialogTitle className={classes.dialogTitle}>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.pickedIcon}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              type="text"
              placeholder="Name"
              label="Name"
              variant="outlined"
              fullWidth
              onChange={handleName}
              value={name}
              required
            />
            <Button onClick={handleIconPickerModal(true)}>Pick Icon</Button>
            {renderPickedIcon}
            <div className={classes.buttons}>
              <Button type="submit">{renderButtonName}</Button>
              <Button onClick={handleAddListModal(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
        <IconPicker
          open={isIconPickerOpen}
          handleIconPickerModal={handleIconPickerModal}
          handlePickIcon={handlePickIcon}
        />
      </Dialog>
    </div>
  );
};

export default withRouter(AddNewList);
