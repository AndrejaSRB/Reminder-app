import React, { useState, useEffect, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withDashboard from "../../hoc/withDashboard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../../store/actions/actions/lists";
import Loader from "../UI/Loader";

const useStyles = makeStyles(theme => ({
  detailsListHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  listTitle: {
    flexGrow: 3,
    color: "#344955",
    "&:first-letter": {
      textTransform: "uppercase"
    }
  }
}));

const UserMenu = props => {
  const classes = useStyles();
  const [pickedList, setPickedList] = useState("");
  const [listInformation, setListInformation] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { listName } = props.match.params;
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.lists);
  const user = useSelector(state => state.root.user);
  const ListModal = lazy(() => import("./ListModal"));

  useEffect(() => {
    setPickedList(listName);
  }, [listName]);

  const handleDelete = () => {
    let list = lists.find(
      list => list.value.name.toLowerCase() === pickedList.toLowerCase()
    );
    dispatch(
      deleteList({
        listId: list.id,
        userId: user.uid
      })
    );
    props.history.push("/");
  };

  const handleEdit = () => {
    let list = lists.find(
      list => list.value.name.toLowerCase() === pickedList.toLowerCase()
    );
    setListInformation(list);
    handleEditModal(true)();
  };
  
  const handleEditModal = isOpen => () => {
    setIsEditClicked(isOpen);
  };

  const renderEditModal = isEditClicked ? (
    <Suspense fallback={<Loader />}>
      <ListModal
        open={isEditClicked}
        handleAddListModal={handleEditModal}
        list={listInformation}
      />
    </Suspense>
  ) : null;

  return (
    <div className={classes.detailsListHolder}>
      <div className={classes.detailsListHeader}>
        <Typography
          gutterBottom={false}
          variant="h4"
          component="h2"
          className={classes.listTitle}
        >
          {pickedList}
        </Typography>
        <Button className={classes.button} onClick={handleEdit}>
          Edit
        </Button>
        <Button className={classes.button} onClick={handleDelete}>
          Delete
        </Button>
      </div>
      {renderEditModal}
    </div>
  );
};

export default withDashboard(UserMenu);
