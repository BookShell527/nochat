import React, { FC, useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { context } from "../context/context";

interface Props {
    setAnchorEl: (element: null | HTMLElement) => void;
    anchorEl: null | HTMLElement;
    m: string;
}

const TileMenu: FC<Props> = ({ setAnchorEl, anchorEl, m }) => {
    const { removeFromContact } = useContext(context);

    const handleRemoveFromContact = async (email: string) => {
        await removeFromContact(email);
        setAnchorEl(null);
    };

    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={() => handleRemoveFromContact(m)}>
                Delete This Account
            </MenuItem>
        </Menu>
    );
};

export default TileMenu;
