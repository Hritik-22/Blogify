class successHandler {
    constructor(statusCode = 200, message = "successfully completed", data = null) {
        this.statusCode = statusCode,
            this.message = message,
            this.data = data
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: true,
            message: this.message,
            data: this.data,
        });
    }
}


export default successHandler;