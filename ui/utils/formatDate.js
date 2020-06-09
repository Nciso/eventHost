import formatNumber from './formatNumber';

/**
 * formats a Date into a pretty string MM/DD/YYYY, HH:mm or N/A  if is not a valid Date
 * @name formatDate
 * @param {Date} d
 * @returns {String}
 */
const formatDate = d => {
  if (typeof d === 'undefined') {
    return 'N/A';
  }

  return typeof d.getMonth !== 'function'
    ? 'N/A'
    : `${formatNumber(
        d.getMonth() + 1
      )}/${d.getDate()}/${d.getFullYear()}, ${formatNumber(
        d.getHours()
      )}:${formatNumber(d.getMinutes())}`;
};

export default formatDate;
