class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 404;
    }
}

module.exports = NotFoundException;