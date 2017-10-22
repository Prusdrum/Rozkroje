
class ElementLongerThanReferenceError extends Error {
    constructor(message) {
        super(message);
    }
}

class InfiniteLoopBreakerError extends Error {
    constructor(message){
        super(message);
    }
}

module.exports = {
    ElementLongerThanReferenceError,
    InfiniteLoopBreakerError
}