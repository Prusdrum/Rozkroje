const _ = require('lodash');

const hasAnyElements = (data) => {
    return _.some(data, element => element.count > 0);
};

module.exports = hasAnyElements;