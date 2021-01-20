import React, { FC, useState } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import TileMenu from "./TileMenu";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
    tileMenu: {
        position: "absolute",
        right: 0,
    },
    listItem: {
        cursor: "pointer",
        position: "relative",
    },
});

interface Props {
    m: string;
    setCurrentContact: (currentContact: string) => void;
}

const ContactListItem: FC<Props> = ({ m, setCurrentContact }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleSetCurrentContact = () => {
        setCurrentContact(m);
        localStorage.setItem("currentContact", m);
    };

    return (
        <>
            <ListItem
                className={classes.listItem}
                onClick={() => setCurrentContact(m)}
            >
                <ListItemText primary={m} />
                <ListItemIcon className={classes.tileMenu}>
                    <MenuIcon
                        onClick={(e: any) => setAnchorEl(e.currentTarget)}
                    />
                </ListItemIcon>
            </ListItem>
            <TileMenu
                anchorEl={anchorEl}
                m={m}
                setAnchorEl={handleSetCurrentContact}
            />
        </>
    );
};

export default ContactListItem;
