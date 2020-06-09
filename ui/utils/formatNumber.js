/**
 * @name formatNumber
 * @param {Number} digit a Number from 0 to 59
 * @returns {String} a valid formatted number for a date
 */
const formatNumber = digit => {
  if (typeof digit !== 'number') {
    throw new Error('Invalid Date');
  }
  if (digit >= 60) {
    throw new Error('Invalid Date');
  }
  return digit < 10 ? digit.toString(10).padStart(2, '0') : digit.toString(10);
};

export default formatNumber;
