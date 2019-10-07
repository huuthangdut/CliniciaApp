export class AppError {
    errorCode;
    errorMessage;

    constructor(errorCode, errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}