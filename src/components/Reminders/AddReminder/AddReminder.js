import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
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
  form: {
    padding: 20
  },
  dialogTitle: {
    backgroundColor: "#344955",
    color: "#FFFFFF"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddToDo = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [startDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const user = useSelector(state => state.root.user);
  const { handleModalAdd, open } = props;
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
    convertDate();
  }, [startDate]);

  const onSubmit = async values => {
    let reminder;
    if (values.date) {
      reminder = {
        title: values.title,
        date: values.date,
        body: values.description,
        importance: values.importance
      };
    } else {
      reminder = {
        title: values.title,
        date: currentDate,
        body: values.description,
        importance: values.importance
      };
    }
    dispatch({
      type: actionTypes.POST_REMINDER,
      payload: {
        body: reminder,
        userId: user.uid
      }
    });

    handleModalAdd(false);
  };
  const handleCloseModal = () => {
    handleModalAdd(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        className={classes.modalContainer}
      >
        <DialogTitle className={classes.dialogTitle}>Create new reminder</DialogTitle>
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
                multiline={true}
              />
              </Grid>
              
              <DialogActions>
                <Button type="submit" className={classes.button}>
                  Add
                </Button>
                <Button className={classes.button} onClick={handleCloseModal}>
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

export default AddToDo;
