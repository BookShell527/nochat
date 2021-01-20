import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Message from "../types/Message";

const useStyle = makeStyles({
    container: {
        display: "flex",
        height: "auto",
        background: "orange",
        minHeight: 40,
        color: "white",
        marginTop: 10,
        width: "auto",
        maxWidth: "50%",
        padding: "5px 15px",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "flex-end",
        justifyItems: "end",
        marginLeft: "auto",
    },
    overflowWord: {
        overflowWrap: "break-word",
    },
});

interface Props {
    message: Message;
}

const MessageToYou: FC<Props> = ({ message }) => {
    const classes = useStyle();
    return (
        <Grid xs={5} className={classes.container} item>
            <Container className={classes.overflowWord}>
                <Typography display="inline">{message.message}</Typography>
            </Container>
        </Grid>
    );
};

export default MessageToYou;
