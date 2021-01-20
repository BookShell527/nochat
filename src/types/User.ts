interface User {
    status: string;
    email: string;
    contact: string[];
    profile: string;
    createdAt: Date;
    id?: string;
    uid: string;
}

export default User;
