import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    color: "red"
  },
  loaderHolder: {
      position: 'absolute',
      margin: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 150,
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#344955",
      zIndex: 9999
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.loaderHolder}>
      <CircularProgress className={classes.progress} />
      </Paper>
    </div>
  );
}