class FailedDependencyException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.code = 424;
    }
}

module.exports = FailedDependencyException;