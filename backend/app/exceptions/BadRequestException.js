class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 400;
    }
}

module.exports = BadRequestException;