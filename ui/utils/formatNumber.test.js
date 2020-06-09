import formatNumber from './formatNumber';

describe('test formatNumber function', () => {
  test('convert a digit from 0 to 9 to a string with a leading `0`', () => {
    expect(formatNumber(0)).toBe('00');
    expect(formatNumber(12)).toBe('12');
    expect(formatNumber(1)).toBe('01');
  });

  test('throw an error if number is bigger than 59', () => {
    expect(() => formatNumber(60)).toThrow(Error);
    expect(() => formatNumber(1555555050505)).toThrow(Error);
    expect(formatNumber(59)).toBe('59');
  });

  test('throw error is is not a valid number', () => {
    expect(() => formatNumber()).toThrow(Error);
    expect(() => formatNumber('0')).toThrow(Error);
    expect(() => formatNumber('random string')).toThrow(Error);
  });
});
