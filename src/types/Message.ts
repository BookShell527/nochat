interface Message {
    uid: string;
    to: string;
    message: string;
    createdAt: any;
    sender: string;
    id?: string;
}

export default Message;
