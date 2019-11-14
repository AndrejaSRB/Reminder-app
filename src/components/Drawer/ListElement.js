
import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

const Card = props => {
  const {id, list, moveListItem, findListItem, syncListElements, classes} = props;
  
  const originalIndex = findListItem(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => true,
    drop: () => syncListElements(),
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findListItem(id)
        moveListItem(draggedId, overIndex)
      }
    },
  })

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={node => drag(drop(node))} style={{ opacity }}>
      <Link
        to={`/list/${list.value.name.toLowerCase()}`}
        className={classes.link}
        key={list.id}
      >
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <Icon className={classes.icon}>{list.value.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={list.value.name} />
        </ListItem>
      </Link>
    </div>
  )
}
export default Card




