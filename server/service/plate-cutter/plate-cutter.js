const putHorizontally = (plate) => {
  const {width, height} = plate;

  return width > height ? plate : {
    ...plate,
    width: height,
    height: width
  };
} 


module.exports = {
  putHorizontally
}