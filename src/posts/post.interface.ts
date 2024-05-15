interface IPost {
    _id?: String;
    title: String;
    content: String;
    user?: String;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    IPost
}