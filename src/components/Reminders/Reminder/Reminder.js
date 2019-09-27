import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as actionTypes from "../../../store/actions/actionTypes/reminders";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import EditReminder from "../EditReminder/EditReminder";
import MoreBtn from "../../UI/MoreBtn";
import {
  Hidden,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  Card,
  Icon,
  Grid
} from "@material-ui/core";
import CustomCheckbox from "../../UI/CustomCheckbox";

const useStyles = makeStyles({
  importance: {
    width: "100%"
  },
  high: {
    borderLeft: "4px solid #b5302b"
  },
  medium: {
    borderLeft: "4px solid #3180EC"
  },
  low: {
    borderLeft: "4px solid #28b753"
  },
  cardActions: {
    width: "100%",
    borderTop: "3px solid rgba(52, 73, 85, 0.7)"
  },
  cardContent: {
    minHeight: 152
  }
});

const SingleToDo = props => {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);
  const [isClickedMore, setIsClickedMore] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.root.user);

  const handleDelete = id => () => {
    setIsChecked(!isChecked);
    dispatch({
      type: actionTypes.DELETE_REMINDER,
      payload: {
        id: id,
        userId: user.uid
      }
    });
  };
  const handleEditModalOpen = clicked => () => {
    setIsClickedMore(clicked);
  };

  return (
    <Fragment>
      <Hidden smDown>
        <Card>
          <CardActionArea
            className={classNames(
              classes.importance,
              classes[props.reminder.importance]
            )}
          >
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {props.reminder.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.reminder.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <MoreBtn
              handleEditModalOpen={handleEditModalOpen}
              handleDelete={handleDelete}
              id={props.id}
            />
          </CardActions>
        </Card>
        <EditReminder
          handleEditModalOpen={handleEditModalOpen}
          open={isClickedMore}
          bigDevices={isClickedMore}
          id={props.id}
          reminder={props.reminder}
        />
      </Hidden>
      <Hidden mdUp>
        <Card>
          <CardActionArea
            className={classNames(
              classes.importance,
              classes[props.reminder.importance]
            )}
          >
            <CardContent className={classes.titleContent}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <CustomCheckbox checked={isChecked} onClick={handleDelete(props.id)}/>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" component="h2">
                    {props.reminder.title}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                <Icon onClick={handleEditModalOpen(true)}>more_vert</Icon>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
        <EditReminder
          handleEditModalOpen={handleEditModalOpen}
          open={isClickedMore}
          id={props.id}
          reminder={props.reminder}
        />
      </Hidden>
    </Fragment>
  );
};

export default SingleToDo;
