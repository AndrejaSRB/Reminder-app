import React, { useState, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import Loader from "../UI/Loader";
import withDashboard from "../../hoc/withDashboard";
import Reminder from "../Reminders/Reminder/Reminder";
import { Typography, Grid, Hidden, Fab } from "@material-ui/core";

const useStyles = makeStyles({
  addToDoSmallDevices: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    zIndex: 1111,
    border: "5px solid #F0EFE9",
    borderRadius: "50%",
    left: "50%",
    transform: "translate(-50%)",
    "& > button": {
      backgroundColor: "#F9AA33",
      color: "#232F34"
    }
  }
});

const ListToDo = () => {
  const classes = useStyles();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [displayReminderList, setDisplayReminderList] = useState({
    today: true,
    tomorrow: true,
    upcoming: false
  });
  const reminderTodayList = useSelector(state => state.reminder.today);
  const user = useSelector(state => state.root.user);
  const reminderUpcomingList = useSelector(state => state.reminder.upcoming);
  const reminderTomorrowList = useSelector(state => state.reminder.tomorrow);
  const { today, tomorrow, upcoming } = displayReminderList;
  const AddReminder = lazy(() =>
    import("../Reminders/AddReminder/AddReminder")
  );

  const handleModalAdd = isOpen => {
    setIsAddModalOpen(isOpen);
  };

  const renderRemindes = reminder => {
    return (
      <Grid item xs={12} md={4} lg={3} key={reminder.id}>
        <Reminder reminder={reminder.value} id={reminder.id} />
      </Grid>
    );
  };

  const toggleTodayList = name => () => {
    setDisplayReminderList({
      ...displayReminderList,
      [name]: !displayReminderList[name]
    });
  };
  
  const remainderModal = isAddModalOpen ? (
    <Suspense fallback={<Loader />}>
      <AddReminder handleModalAdd={handleModalAdd} open={isAddModalOpen} />
    </Suspense>
  ) : null;

  const renderList = user ? (
    <Grid container spacing={2} wrap="wrap">
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          align="left"
          onClick={toggleTodayList("today")}
        >
          Today
        </Typography>
      </Grid>
      {reminderTodayList && today
        ? reminderTodayList.map(renderRemindes)
        : null}
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          align="left"
          onClick={toggleTodayList("tomorrow")}
        >
          Tomorrow
        </Typography>
      </Grid>
      {reminderTomorrowList && tomorrow
        ? reminderTomorrowList.map(renderRemindes)
        : null}
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="h2"
          color="textSecondary"
          align="left"
          onClick={toggleTodayList("tomorrow")}
        >
          Upcoming
        </Typography>
      </Grid>
      {reminderUpcomingList && upcoming
        ? reminderUpcomingList.map(renderRemindes)
        : null}
      <Hidden mdUp>
        <Grid item xs={12}>
          <div
            className={classes.addToDoSmallDevices}
            onClick={() => handleModalAdd(true)}
          >
            <Fab aria-label="add" className={classes.addIcon}>
              <AddIcon />
            </Fab>
          </div>
        </Grid>
      </Hidden>
      {remainderModal}
    </Grid>
  ) : null;

  return <React.Fragment>{renderList}</React.Fragment>;
};

export default withDashboard(ListToDo);
