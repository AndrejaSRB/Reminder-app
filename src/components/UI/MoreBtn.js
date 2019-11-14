import clsx from "clsx";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { capitalize } from "@material-ui/core/utils";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DeleteIcon from "@material-ui/icons/Delete"
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  speedDial: {
    "&$directionUp, &$directionLeft": {
      top: 20,
      right: 20
    },
    "&$directionDown, &$directionRight": {
      top: 20,
      right: 20
    },
    "& > button": {
      backgroundColor: "transparent",
      color: "#000000",
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  },
  directionUp: {},
  directionLeft: {},
  directionDown: {},
  directionRight: {}
}));

const MoreBtn = props => {
  const classes = useStyles();
  const [direction] = React.useState("left");
  const [open, setOpen] = React.useState(false);
  const {handleEditModalOpen,handleDelete } = props;

  const handleEdit = () => {
    setOpen(false);
    handleEditModalOpen(true)();
  };

  const actions = [
    { icon: <EditIcon onClick={handleEdit} />, name: "Edit" },
    {
      icon: <DeleteIcon onClick={handleDelete(props.id)} />,
      name: "Delete"
    }
  ];
  
  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const speedDialClassName = clsx(
    classes.speedDial,
    classes[`direction${capitalize(direction)}`]
  );

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={speedDialClassName}
          hidden={false}
          icon={<SpeedDialIcon icon={<MoreVertIcon />} />}
          onBlur={handleClose}
          onClick={handleClick}
          onClose={handleClose}
          onFocus={handleOpen}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          open={open}
          direction={direction}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClick}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
};

export default MoreBtn;
