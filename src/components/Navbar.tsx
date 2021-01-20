import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import SwipeableDrawer from "@material-ui/core/Drawer";
import DrawerList from "./DrawerList";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import AddButton from "@material-ui/icons/Add";
import { useLocation } from "react-router-dom";
import AddContactDialog from "./AddContactDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "orange",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titleLink: {
        textDecoration: "none !important",
        color: "white",
    },
    addButton: {
        color: "white",
    },
    addIcon: {
        marginRight: "4px",
    },
}));

type Anchor = "left";

export default function ButtonAppBar() {
    const classes = useStyles();
    const [state, setState] = useState({ left: false });
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return location.pathname === "/" ? (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer("left", true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        {<DrawerList anchor="left" />}
                    </SwipeableDrawer>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/" className={classes.titleLink}>
                            NoChat
                        </Link>
                    </Typography>
                    <Button
                        className={classes.addButton}
                        onClick={() => setOpen(true)}
                    >
                        <AddButton className={classes.addIcon} />
                        Add Contact
                    </Button>
                </Toolbar>
            </AppBar>
            <AddContactDialog open={open} setOpen={setOpen} />
        </>
    ) : (
        <></>
    );
}
