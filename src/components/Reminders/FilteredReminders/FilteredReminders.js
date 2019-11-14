import React, { useState, useEffect } from "react";
import Reminder from "../Reminder/Reminder";
import { useSelector } from "react-redux";
import withDashboard from "../../../hoc/withDashboard";
import { Grid, Typography } from "@material-ui/core";

const FilteredReminders = props => {
  const high = useSelector(state => state.reminder.highImportance);
  const medium = useSelector(state => state.reminder.mediumImportance);
  const low = useSelector(state => state.reminder.lowImportance);
  const tomorrow = useSelector(state => state.reminder.tomorrow);
  const upcoming = useSelector(state => state.reminder.upcoming);
  const [choosedList, setChoosedList] = useState(null);
  const { criterium } = props.match.params;

  useEffect(() => {
    if (criterium) {
      if (criterium === "high") {
        setChoosedList(high);
      } else if (criterium === "medium") {
        setChoosedList(medium);
      } else if (criterium === "low") {
        setChoosedList(low);
      } else if (criterium === "upcoming") {
        setChoosedList(upcoming);
      } else if (criterium === "tomorrow") {
        setChoosedList(tomorrow);
      }
    }
  }, [criterium]);

  const rederReminders = reminder => {
    return (
      <Grid item={true} xs={12} md={4} lg={3} key={reminder.id}>
        <Reminder reminder={reminder.value} id={reminder.id} />
      </Grid>
    );
  };

  const renderCriteriumName =
    criterium === "upcoming" || criterium === "tomorrow"
      ? `Your list of ${criterium} reminders`
      : `Your list of ${criterium} important reminders`;
      
  return (
    <Grid container spacing={2}>
       <Grid item xs={12}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h2"
            color="textSecondary"
            align="left"
          >
            {renderCriteriumName}
          </Typography>
        </Grid>
      {choosedList ? (
        choosedList && choosedList.length ? (
          choosedList.map(rederReminders)
        ) : null
      ) : (
        <div>There is no {criterium} reminders.</div>
      )}
    </Grid>
  );
};

export default withDashboard(FilteredReminders);
