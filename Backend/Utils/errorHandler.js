// (haven't understood)
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this,this.constructor);
    }  
}

module.exports = ErrorHandler

// try and catch and class 