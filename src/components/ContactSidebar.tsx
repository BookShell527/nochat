import React, { useContext, useState, useEffect, FC } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DrawerList from "./DrawerList";
import AppsIcon from "@material-ui/icons/Apps";
import SwipeableDrawer from "@material-ui/core/Drawer";
import AddButton from "@material-ui/icons/Add";
import AddContactDialog from "./AddContactDialog";
import { context } from "../context/context";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ContactListItem from "./ContactListItem";

const useStyle = makeStyles(() => ({
    contactSidebar: {
        borderRight: "1px solid lightgray",
        height: "100vh",
        overflow: "auto",
        position: "fixed",
        width: "100%",
    },
    menu: {
        color: "orange",
        cursor: "pointer",
    },
    addIcon: {
        color: "orange",
        cursor: "pointer",
        position: "absolute",
        right: 20,
    },
    toolbar: {
        position: "relative",
    },
    empty: {
        textAlign: "center",
    },
}));

type Anchor = "left";

interface Props {
    setCurrentContact: (currentContact: string) => void;
}

const ContactSidebar: FC<Props> = ({ setCurrentContact }) => {
    const classes = useStyle();
    const { userData } = useContext(context);
    const [state, setState] = useState({ left: false });
    const [contact, setContact] = useState([]);
    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        if (userData !== null) {
            setContact(userData.contact);
        } else {
            setContact([]);
        }
    }, [userData]);

    return (
        <Grid item xs={3} className={classes.contactSidebar}>
            <Toolbar className={classes.toolbar}>
                <AppsIcon
                    className={classes.menu}
                    onClick={toggleDrawer("left", true)}
                />
                <SwipeableDrawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {<DrawerList anchor="left" />}
                </SwipeableDrawer>
                <AddButton
                    className={classes.addIcon}
                    onClick={() => setOpen(true)}
                />
            </Toolbar>
            <AddContactDialog open={open} setOpen={setOpen} />
            {contact.length === 0 ? (
                <Typography className={classes.empty}>
                    Add a contact to start chatting!
                </Typography>
            ) : (
                contact.map((m, i) => (
                    <ContactListItem
                        setCurrentContact={setCurrentContact}
                        m={m}
                        key={i}
                    />
                ))
            )}
        </Grid>
    );
};

export default ContactSidebar;
