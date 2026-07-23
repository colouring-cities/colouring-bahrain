interface User {
    user_id?: string;
    username?: string;
    email?: string;
    registered?: Date;
    api_key?: string;
    error?: string;
    // TODO: add other fields as needed
}

export {
    User
};
