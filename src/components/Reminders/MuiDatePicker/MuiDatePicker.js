import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";


const DatePickers = props => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;

  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;
    
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <DatePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            fullWidth
            label="Pick a date"
            onChange={onChange}
            value={value === "" ? null : value}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePickers;
