import React, {
  useState,
  lazy,
  Suspense,
  useCallback,
  useRef,
  useEffect
} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut, renderFilterRoute } from "../../store/actions/actions/reminders";
import { updateList } from "../../store/actions/actions/lists";

import fire from "../../config";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Loader from "../UI/Loader";
import ListElement from "./ListElement";
import update from "immutability-helper";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 60
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    backgroundColor: "#344955",
    ...theme.mixins.toolbar,
    "& > button > span": {
      color: "#FFFFFF"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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
      border: "1px solid #FFFFFF",
      backgroundColor: "transparent",
      color: "#FFFFFF"
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
    color: "#FFFFFF"
  },
  divder: {
    backgroundColor: "#aaaaaa"
  },
  list: {
    backgroundColor: "#344955",
    color: "#FFFFFF",
    height: "100vh"
  },
  listItem: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)"
    }
  },
  dropDownList: {
    backgroundColor: "#303d44"
  },
  singleList: {
    backgroundColor: "#344955"
  }
}));

const SideList = props => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    open,
    handleDrawerClose,
    handleAddListModal,
    connectDropTarget
  } = props;
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const ref = useRef(null);
  const reminderUpcomingList = useSelector(state => state.reminder.upcoming);
  const reminderTomorrowList = useSelector(state => state.reminder.tomorrow);
  const listsArray = useSelector(state => state.lists.lists);
  const user = useSelector(state => state.root.user);
  const [lists, setLists] = useState([]);
  const [syncInterval, setSyncInterval] = useState(null);

  useEffect(() => {
    setLists(listsArray);
  }, [listsArray]);

  const AddReminder = lazy(() =>
    import("../Reminders/AddReminder/AddReminder")
  );

  const handleModalAdd = isOpen => {
    setIsAddReminderModalOpen(isOpen);
  };

  const remainderModal = isAddReminderModalOpen ? (
    <Suspense fallback={<Loader />}>
      <AddReminder
        handleModalAdd={handleModalAdd}
        open={isAddReminderModalOpen}
      />
    </Suspense>
  ) : null;

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

  const moveListItem = useCallback(
    (id, atIndex) => {
      const { list, index } = findListItem(id);
      setLists(
        update(lists, {
          $splice: [[index, 1], [atIndex, 0, list]]
        })
      );
    },
    [lists]
  );

  const findListItem = useCallback(
    id => {
      const list = lists.filter(list => `${list.id}` === id)[0];
      return {
        list,
        index: lists.indexOf(list)
      };
    },
    [lists]
  );

  const syncListElements = () => {
    clearTimeout(syncInterval);
    const interval = setTimeout(() => {
      let listObject = {};

      lists.forEach((list, index) => {
        list.value.order = index + 1;
      });
      lists.forEach(list => {
        listObject[list.id] = list.value;
      });
      dispatch(updateList({
        userId: user.uid,
        body: listObject
      }));
    }, 2000);
    setSyncInterval(interval);
  };

  connectDropTarget(ref);

  const renderLists =
    lists && lists.length > 0
      ? lists.map(list => (
          <ListElement
            list={list}
            classes={classes}
            key={list.id}
            id={`${list.id}`}
            moveListItem={moveListItem}
            findListItem={findListItem}
            syncListElements={syncListElements}
          />
        ))
      : null;

  const handleLogOut = () => {
    console.log("Logged out");
    fire.auth().signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    dispatch(userLoggedOut());
  };

  const handleClickFilter = () => {
    dispatch(renderFilterRoute());
  };

  const handleList = () => {
    setOpenList(!openList);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <div className={classes.list}>
        <List className={classes.singleList}>
          <ListItem
            className={classes.listItem}
            button
            onClick={() => handleModalAdd(true)}
          >
            <ListItemIcon>
              <Icon className={classes.icon}>add</Icon>
            </ListItemIcon>
            <ListItemText primary="New" />
          </ListItem>
          <Link to="/" className={classes.link}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.icon}>apps</Icon>
              </ListItemIcon>
              <ListItemText primary="All Reminders" />
            </ListItem>
          </Link>
          <Link to={`/${`tomorrow`}`} className={classes.link} onClick={handleClickFilter}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.icon}>event</Icon>
              </ListItemIcon>
              {renderTomorrowListNumber}
            </ListItem>
          </Link>
          <Link to={`/${`upcoming`}`} className={classes.link} onClick={handleClickFilter}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.icon}>event_note</Icon>
              </ListItemIcon>
              {renderUpcomingListNumber}
            </ListItem>
          </Link>
        </List>
        <Divider className={classes.divder} />
        <List className={classes.singleList}>
          <ListItem className={classes.listItem} button disabled>
            <ListItemIcon>
              <Icon>label_important</Icon>
            </ListItemIcon>
            <ListItemText primary="Importance" />
          </ListItem>
          <Link to={`/${`high`}`} className={classes.link} onClick={handleClickFilter}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.high}>error_outline</Icon>
              </ListItemIcon>
              <ListItemText primary="High" />
            </ListItem>
          </Link>
          <Link to={`/${`medium`}`} className={classes.link} onClick={handleClickFilter}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.medium}>error_outline</Icon>
              </ListItemIcon>
              <ListItemText primary="Medium" />
            </ListItem>
          </Link>
          <Link to={`/${`low`}`} className={classes.link} onClick={handleClickFilter}>
            <ListItem className={classes.listItem} button>
              <ListItemIcon>
                <Icon className={classes.low}>error_outline</Icon>
              </ListItemIcon>
              <ListItemText primary="Low" />
            </ListItem>
          </Link>
        </List>
        <Divider className={classes.divder} />
        <List className={classes.singleList}>
          <ListItem className={classes.listItem} button onClick={handleList}>
            <ListItemIcon>
              <Icon className={classes.icon}>list</Icon>
            </ListItemIcon>
            <ListItemText primary="My List" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              className={classes.dropDownList}
            >
              <ListItem
                className={classes.listItem}
                button
                onClick={handleAddListModal(true)}
              >
                <ListItemIcon>
                  <Icon className={classes.icon}>add</Icon>
                </ListItemIcon>
                <ListItemText primary="Create new list" />
              </ListItem>
              <List ref={ref}>{renderLists}</List>
            </List>
          </Collapse>
        </List>
        <Divider className={classes.divder} />
        <List className={classes.singleList}>
          <ListItem className={classes.listItem} button onClick={handleLogOut}>
            <ListItemIcon>
              <Icon className={classes.icon}>exit_to_app</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
      {remainderModal}
    </Drawer>
  );
};

export default DropTarget(ItemTypes.CARD, {}, connect => ({
  connectDropTarget: connect.dropTarget()
}))(SideList);
