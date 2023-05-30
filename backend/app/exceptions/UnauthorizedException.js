class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 401;
    }
}

module.exports = UnauthorizedException;