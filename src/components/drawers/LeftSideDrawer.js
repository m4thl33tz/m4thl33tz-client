import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Drawer, List, IconButton, Typography } from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PolymerIcon from "@material-ui/icons/Polymer";

import useStyles from "./LeftDrawer.styles";

function LeftSideDrawer() {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <IconButton className={classes.iconButton} onClick={toggleDrawer(true)}>
        <DehazeIcon classname={classes.iconButton} color="primary" />
      </IconButton>
      <Drawer
        open={isOpen}
        anchor="left"
        onClick={toggleDrawer(false)}
        onClose={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className={classes.toolbar}>
          <Typography variant="h5" style={{ marginLeft: "10px" }}>
            M4thl33tz
          </Typography>
        </div>
        <Divider />
        <div className={classes.list}>
          <List className={classes.list}>
            <ListItem button onClick={() => history.push("/choosegame")}>
              <ListItemIcon>{<PolymerIcon />}</ListItemIcon>
              <ListItemText primary={"Game options"} />
            </ListItem>

            <ListItem button onClick={() => console.log("clicked")}>
              <ListItemIcon>{<PolymerIcon />}</ListItemIcon>
              <ListItemText primary={"About us"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

LeftSideDrawer.propTypes = {};

export default LeftSideDrawer;
