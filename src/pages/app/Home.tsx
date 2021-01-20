import React, { useState, useContext, useEffect } from "react";
import { firestore } from "../../firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ContactSidebar from "../../components/ContactSidebar";
import ChatArea from "../../components/ChatArea";
import Message from "../../types/Message";
import { context } from "../../context/context";

const useStyles = makeStyles({
    container: {
        overflowY: "hidden",
    },
});

const Home = () => {
    const classes = useStyles();
    const [currentContact, setCurrentContact] = useState("");
    const [messageToOther, setMessageToOther] = useState<Message[]>([]);
    const [messageToYou, setMessageToYou] = useState<Message[]>([]);
    const [message, setMessage] = useState<Message[]>([]);
    const { userData } = useContext(context);
    const messageCollection = firestore.collection("message");

    useEffect(() => {
        if (userData !== null) {
            messageCollection
                .where("to", "==", userData.email)
                .where("sender", "==", currentContact)
                .limit(15)
                .onSnapshot((snapshot) => {
                    let toYou: any[] = [];
                    snapshot.forEach((doc) => {
                        toYou.push({ ...doc.data(), id: doc.id });
                    });
                    setMessageToYou(toYou);
                });
            messageCollection
                .where("to", "==", currentContact)
                .where("sender", "==", userData.email)
                .limit(15)
                .onSnapshot((snapshot) => {
                    let toOther: any[] = [];
                    snapshot.forEach((doc) => {
                        toOther.push({ ...doc.data(), id: doc.id });
                    });
                    setMessageToOther(toOther);
                });
        } else {
            setMessageToOther([]);
            setMessageToYou([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentContact, userData]);

    useEffect(() => {
        if (Boolean(currentContact)) {
            const disorderedMessage = messageToOther.concat(messageToYou);
            const orderedMessage = disorderedMessage.sort(
                (a, b) => a.createdAt.seconds - b.createdAt.seconds
            );

            setMessage(orderedMessage);
        }
    }, [messageToYou, messageToOther, currentContact]);

    return (
        <Grid className={classes.container} container>
            <ContactSidebar setCurrentContact={setCurrentContact} />
            <ChatArea currentContact={currentContact} message={message} />
        </Grid>
    );
};

export default Home;
