class HttpException extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        console.log("HttpException constructor");
        super(message);

        this.statusCode = statusCode;
        this.message = message;
    }
}

export {
    HttpException
}