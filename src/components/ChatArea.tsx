import React, {
    FC,
    useState,
    useContext,
    ChangeEvent,
    KeyboardEvent,
} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { context } from "../context/context";
import TextField from "@material-ui/core/TextField";
import MessageFromYou from "./MessageFromYou";
import MessageFromOther from "./MessageFromOther";
import Message from "../types/Message";

const useStyle = makeStyles({
    chatArea: {
        paddingBottom: 100,
        overflowY: "auto",
        marginLeft: "auto",
    },
    chatAreaEmpty: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        height: "100%",
    },
    typeArea: {
        height: "auto",
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "orange",
        display: "flex",
        alignItems: "center",
        maxHeight: 100,
    },
    emptyCurrentContact: {
        textAlign: "center",
    },
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#ffffff !important`,
        },
    },
    textArea: {
        width: "90%",
    },
    cssFocused: {
        color: "#ffffff !important",
    },
    sentIcon: {
        color: "white",
        position: "absolute",
        right: 15,
        transform: "scale(2)",
        cursor: "pointer",
    },
    messageBox: {
        display: "flex",
        flexDirection: "column",
        height: "auto",
        overflow: "hidden",
    },
});

interface Props {
    currentContact: string;
    message: Message[];
}

const ChatArea: FC<Props> = ({ currentContact, message }) => {
    const classes = useStyle();
    const { addMessage, userData } = useContext(context);
    const [text, setText] = useState<string>("");

    const sentMessage = async () => {
        if (text.trim() !== "") {
            await addMessage(text, currentContact);
            setText("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sentMessage();
        }
    };

    return (
        <Grid
            xs={9}
            item
            className={
                Boolean(currentContact)
                    ? classes.chatArea
                    : classes.chatAreaEmpty
            }
        >
            {Boolean(currentContact) ? (
                <>
                    <Container className={classes.messageBox}>
                        {message.map((m) =>
                            m.sender === userData.email ? (
                                <MessageFromYou message={m} />
                            ) : (
                                <MessageFromOther message={m} />
                            )
                        )}
                    </Container>
                    <Container className={classes.typeArea}>
                        <TextField
                            variant="filled"
                            placeholder="Message"
                            value={text}
                            className={classes.textArea}
                            InputLabelProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                },
                            }}
                            onKeyPress={handleKeyPress}
                            onChange={(
                                e: ChangeEvent<
                                    HTMLTextAreaElement | HTMLInputElement
                                >
                            ) => setText(e.target.value)}
                            multiline
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    focused: classes.cssFocused,
                                },
                                inputMode: "numeric",
                            }}
                        />
                        <ArrowRightIcon
                            className={classes.sentIcon}
                            onClick={sentMessage}
                        />
                    </Container>
                </>
            ) : (
                <Typography
                    variant="h3"
                    className={classes.emptyCurrentContact}
                >
                    Select Contact to start chatting!
                </Typography>
            )}
        </Grid>
    );
};

export default ChatArea;
