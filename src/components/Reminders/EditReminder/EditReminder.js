import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import MuiDatePicker from "../MuiDatePicker/MuiDatePicker";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes/reminders";
import { Form, Field } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "final-form-material-ui";
import {
  validateTitle,
  validateImportance,
  validateDate,
  validateDescription
} from "../../Authentication/validation";
import CustomField from "../../UI/CustomField";
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  modalContainer: {
    " & > div > div": {
      width: "100%",
      margin: 20
    }
  },
  form: {
    padding: 20
  },
  buttonsHolder: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > button": {
      margin: "0 10px"
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

const EditReminder = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const [importance, setImportance] = useState("high");
  const user = useSelector(state => state.root.user);

  useEffect(() => {
    const convertDate = () => {
      let date = startDate.getDate();
      let month = startDate.getMonth();
      let year = startDate.getFullYear();
      if (month < 10) {
        month = `0${month + 1}`;
      } else {
        month += 1;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      setCurrentDate(`${year}-${month}-${date}`);
    };
    const setDefaultValues = () => {
      setDescription(props.reminder.body);
      setTitle(props.reminder.title);
      setCurrentDate(props.reminder.date);
      setImportance(props.reminder.importance);
    };
    convertDate();
    setDefaultValues();
  }, [
    startDate,
    props.reminder.body,
    props.reminder.title,
    props.reminder.date,
    props.reminder.importance
  ]);


  const handleClose = () => {
    props.handleEditModalOpen(false)();
  };

  const onSubmit = async values => {
    let reminder = {
      title: values.title,
      date: values.date,
      body: values.description,
      importance: values.importance
    };
    dispatch({
      type: actionTypes.EDIT_REMINDER,
      payload: {
        body: reminder,
        id: props.id,
        userId: user.uid
      }
    });
    setCurrentDate(currentDate);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        className={classes.modalContainer}
      >
        <DialogTitle className={classes.dialogTitle}>Edit reminder</DialogTitle>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={3} alignItems="center">
               <Grid item xs={12}>
              <CustomField
                validation={validateTitle}
                type="text"
                placeholder="Title"
                label="Title"
                fullWidth={true}
                name="title"
                variant="outlined"
                initialvalue={title}

              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Field
                fullWidth
                name="importance"
                component={Select}
                label="Select importance"
                required
                formControlProps={{ fullWidth: true }}
                validate={validateImportance}
                variant="outlined"
                initialValue={importance}
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Field
                name="date"
                validate={validateDate}
                component={MuiDatePicker}
                variant="outlined"
                initialValue={currentDate}
              />
              </Grid>
              <Grid item xs={12}>
              <CustomField
                validation={validateDescription}
                type="text"
                placeholder="Short description"
                label="Short description"
                fullWidth={true}
                name="description"
                variant="outlined"
                initialvalue={description}
                multiline={true}
              />
              </Grid>
              
              <DialogActions>
                <Button type="submit" className={classes.button}>
                  Edit
                </Button>
                <Button className={classes.button} onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
              </Grid>
            </form>
          )}
        />
      </Dialog>
    </div>
  );
};

export default EditReminder;
