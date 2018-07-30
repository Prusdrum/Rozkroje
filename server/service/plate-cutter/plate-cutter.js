const _ = require('lodash');

// cordinate system starts top-left
//   (0, 0)
//   -----------> X
//   |
//   |
//   |
//   | Y



function putHorizontally(plate) {
  const {width, height} = plate;

  return width > height ? plate : {
    ...plate,
    width: height,
    height: width
  };
} 

function hasAnyElement(elements) {
  if (elements.length === 0) {
    return false;
  }

  return _.some(elements, (el) => el.count > 0);
}

function doesItFitBelow(plate, element) {
  const sumOfHeight = _.chain(plate.elements)
    .sumBy((el) => el.height)
    .value();

  if (element.height + sumOfHeight < plate.height) {
    return true;
  } else {
    return false;
  }
}

function sortElements(elements) {
  return _.sortBy(elements, (el) => el.width * el.height).reverse();
}


module.exports = {
  putHorizontally,
  hasAnyElement,
  doesItFitBelow,
  sortElements
}