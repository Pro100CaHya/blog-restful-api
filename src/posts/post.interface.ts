interface IPost {
    _id?: String;
    title: String;
    content: String;
    userId: String;
    createdAt?: Date;
    updatedAt?: Date;
}

export {
    IPost
}