import React, {
    FC,
    useState,
    ChangeEvent,
    useContext,
    MouseEvent,
} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { context } from "../context/context";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useStyles = makeStyles({
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#FFA500 !important`,
        },
    },
    cssFocused: {
        color: "#FFA500 !important",
    },
    notchedOutline: {
        borderWidth: "1px",
    },
    dialogTitle: {
        marginBottom: 0,
    },
    addField: {
        marginTop: -2,
    },
    cancelButton: {
        color: "red",
    },
});

const AddContactDialog: FC<Props> = ({ open, setOpen }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const { addToContact } = useContext(context);

    const handleAddToContact = async (e: MouseEvent) => {
        e.preventDefault();

        await addToContact(email);
        setEmail("");
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Add Contact</DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    className={classes.addField}
                    onChange={(
                        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => setEmail(e.target.value)}
                    InputLabelProps={{
                        classes: {
                            focused: classes.cssFocused,
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        inputMode: "numeric",
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    className={classes.cancelButton}
                >
                    Cancel
                </Button>
                <Button autoFocus color="primary" onClick={handleAddToContact}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContactDialog;
