import React, { useState, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { renderFilterRoute, userLoggedOut } from "../../store/actions/actions/reminders";
import fire from "../../config";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Loader from "../UI/Loader";

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: "#344955",
    height: "100vh",
    color: "#FFFFFF"
  },
  fullList: {
    width: "auto"
  },
  tagList: {
    listStyle: "none",
    padding: "0 0 0 75px",
    margin: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#eeeeee",
    transition: "all .4s",
    "& > li": {
      height: 24,
      display: "inline-block",
      margin: "5px 0",
      color: "#3180EC"
    }
  },
  badge: {
    "& > span": {
      top: "50%",
      right: -30,
      border: "1px solid #F9AA33",
      backgroundColor: "transparent",
      color: "#F9AA33"
    }
  },
  link: {
    color: "#FFFFFF",
    textDecoration: "none"
  },
  high: {
    color: "#ea2727"
  },
  medium: {
    color: "#4685ea"
  },
  low: {
    color: "#38ad2b"
  },
  icon: {
    color: "#F9AA33"
  },
  divder: {
    backgroundColor: "#aaaaaa"
  },
  dropDownList: {
    backgroundColor: "#303d44"
  },
  listItem: {
    backgroundColor: "#344955"
  }
});

const SideMenu = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reminderUpcomingList = useSelector(state => state.reminder.upcoming);
  const reminderTomorrowList = useSelector(state => state.reminder.tomorrow);
  const listsArray = useSelector(state => state.lists.lists);
  const [openList, setOpenList] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const { toggleDrawer, open } = props;
  const ListModal = lazy(() => import("../Lists/ListModal"));

  const renderTomorrowListNumber = reminderTomorrowList ? (
    <Badge
      className={classes.badge}
      badgeContent={reminderTomorrowList.length}
      color="primary"
      invisible={false}
    >
      <ListItemText primary="Tomorrow" />
    </Badge>
  ) : (
    <ListItemText primary="Tomorrow" />
  );

  const renderUpcomingListNumber = reminderUpcomingList ? (
    <Badge
      className={classes.badge}
      badgeContent={reminderUpcomingList.length}
      color="primary"
      invisible={false}
    >
      <ListItemText primary="Upcoming" />
    </Badge>
  ) : (
    <ListItemText primary="Tomorrow" />
  );

  const renderLists =
    listsArray && listsArray.length > 0
      ? listsArray.map(list => (
          <ListItem button className={classes.listItem} key={list.id}>
            <ListItemIcon>
              <Icon className={classes.icon}>{list.value.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={list.value.name} />
          </ListItem>
        ))
      : null;

  const handleModalAddList = isOpen => () => {
    setIsAddListModalOpen(isOpen);
    toggleDrawer(false)();
  };

  const handleClickFilter = () => {
    dispatch(renderFilterRoute());
  };

  const handleList = () => {
    setOpenList(!openList);
  };

  const renderAddListModal = isAddListModalOpen ? (
    <Suspense fallback={<Loader />}>
      <ListModal
        open={isAddListModalOpen}
        handleAddListModal={handleModalAddList}
      />
    </Suspense>
  ) : null;

  const sideList = () => (
    <div className={classes.list} role="presentation">
      <List className={classes.listItem}>
        <Link to="/" className={classes.link}>
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <Icon className={classes.icon}>apps</Icon>
            </ListItemIcon>
            <ListItemText primary="All Reminders" />
          </ListItem>
        </Link>
        <Link
          to={`/${`tomorrow`}`}
          className={classes.link}
          onClick={handleClickFilter}
        >
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <Icon className={classes.icon}>event</Icon>
            </ListItemIcon>
            {renderTomorrowListNumber}
          </ListItem>
        </Link>
        <Link
          to={`/${`upcoming`}`}
          className={classes.link}
          onClick={handleClickFilter}
        >
          <ListItem button>
            <ListItemIcon>
              <Icon className={classes.icon}>event_note</Icon>
            </ListItemIcon>
            {renderUpcomingListNumber}
          </ListItem>
        </Link>
      </List>
      <Divider className={classes.divder} />
      <List className={classes.listItem}>
        <ListItem button disabled>
          <ListItemIcon>
            <Icon>list</Icon>
          </ListItemIcon>
          <ListItemText primary="Importance" />
        </ListItem>
        <Link
          to={`/${`high`}`}
          className={classes.link}
          onClick={handleClickFilter}
        >
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <Icon className={classes.high}>error_outline</Icon>
            </ListItemIcon>
            <ListItemText primary="High" />
          </ListItem>
        </Link>
        <Link
          to={`/${`medium`}`}
          className={classes.link}
          onClick={handleClickFilter}
        >
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <Icon className={classes.medium}>error_outline</Icon>
            </ListItemIcon>
            <ListItemText primary="Medium" />
          </ListItem>
        </Link>
        <Link
          to={`/${`low`}`}
          className={classes.link}
          onClick={handleClickFilter}
        >
          <ListItem button onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <Icon className={classes.low}>error_outline</Icon>
            </ListItemIcon>
            <ListItemText primary="Low" />
          </ListItem>
        </Link>
      </List>
      <Divider className={classes.divder} />
      <List className={classes.listItem}>
        <ListItem className={classes.listItem} button onClick={handleList}>
          <ListItemIcon>
            <Icon className={classes.icon}>list</Icon>
          </ListItemIcon>
          <ListItemText primary="My List" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.dropDownList}>
            <ListItem
              className={classes.listItem}
              button
              onClick={handleModalAddList(true)}
            >
              <ListItemIcon>
                <Icon className={classes.icon}>add</Icon>
              </ListItemIcon>
              <ListItemText primary="Create new list" />
            </ListItem>
            {renderLists}
          </List>
        </Collapse>
      </List>
      <Divider className={classes.divder} />
      <List className={classes.listItem}>
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <Icon className={classes.icon}>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider className={classes.divder} />
    </div>
  );

  const handleLogOut = () => {
    console.log("Logged out");
    fire.auth().signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    toggleDrawer(false);
    dispatch(userLoggedOut());
  };
  
  return (
    <div>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
      {renderAddListModal}
    </div>
  );
};

export default SideMenu;
