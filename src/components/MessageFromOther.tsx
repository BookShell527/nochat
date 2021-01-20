import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Message from "../types/Message";

const useStyle = makeStyles({
    container: {
        display: "flex",
        height: "auto",
        background: "lightgray",
        minHeight: 40,
        color: "black",
        width: "auto",
        marginTop: 10,
        padding: "5px 15px",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        justifyItems: "start",
        marginRight: "auto",
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
        <Grid xs={5} className={classes.container}>
            <Container className={classes.overflowWord}>
                <Typography display="inline">{message.message}</Typography>
            </Container>
        </Grid>
    );
};

export default MessageToYou;
