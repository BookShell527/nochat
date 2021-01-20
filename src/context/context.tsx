/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, Context, FC } from "react";
import { auth, firestore, storage } from "../firebase";
import Message from "../types/Message";
import User from "../types/User";

export const context: Context<any> = createContext(null);

interface Props {
    children: any;
}

const ContextProvider: FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) as any;
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const messageCollection = firestore.collection("message");
    const userCollection = firestore.collection("user");

    const register = (email: string, password: string) => {
        localStorage.setItem("currentContact", "");
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then(async (result) => {
                await storage
                    .ref(`profile/${result.user!.uid}`)
                    .put(require("../assets/account.png"));

                const url = await storage
                    .ref(`profile/${result.user!.uid}`)
                    .getDownloadURL();

                const newUser: User = {
                    contact: [],
                    createdAt: new Date(),
                    email: result.user!.email!,
                    uid: result.user!.uid,
                    status: "Hello World!",
                    profile: url,
                };

                await userCollection.doc().set(newUser);
            });
    };

    const login = (email: string, password: string) => {
        localStorage.setItem("currentContact", "");
        return auth.signInWithEmailAndPassword(email, password);
    };

    const signOut = () => {
        localStorage.setItem("currentContact", "");
        return auth.signOut();
    };

    const addMessage = async (message: string, to: string) => {
        const newMessage: Message = {
            createdAt: new Date(),
            uid: currentUser.uid,
            message,
            to,
            sender: currentUser.email,
        };
        await messageCollection.doc().set(newMessage);
    };

    const addToContact = async (email: string) => {
        let updatedContact = userData!.contact;
        updatedContact.push(email);

        await userCollection.doc(userData!.id).update({
            contact: updatedContact,
        });
    };

    const removeFromContact = async (email: string) => {
        let updatedContact = userData!.contact.filter(
            (m: string) => m !== email
        );

        await userCollection.doc(userData!.id).update({
            contact: updatedContact,
        });
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (currentUser !== null) {
            userCollection
                .where("uid", "==", currentUser.uid)
                .onSnapshot((snapshot) => {
                    let documents: any[] = [];
                    snapshot.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id });
                    });
                    setUserData(documents[0]);
                });
        } else {
            setUserData(null);
        }
    }, [currentUser]);

    return (
        <context.Provider
            value={{
                register,
                login,
                addToContact,
                currentUser,
                userData,
                removeFromContact,
                signOut,
                addMessage,
            }}
        >
            {!loading && children}
        </context.Provider>
    );
};

export default ContextProvider;
