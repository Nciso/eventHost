import formatDate from './formatDate';
import formatNumber from './formatNumber';

describe('formatDate function, convert a date to string format, `MM/DD/YYYY, HH:mm` format or `N/A`', () => {
  test('convert current Date to string format', () => {
    const date = new Date();

    const stringDate = formatDate(date);

    const [month, day, unformattedTime] = stringDate.split('/');
    const [year, time] = unformattedTime.split(',');
    const [hours, minutes] = time.trim().split(':');

    expect(date.getFullYear()).toBe(parseInt(year, 10));
    expect(formatNumber(date.getMonth() + 1)).toBe(month);
    expect(formatNumber(date.getDate())).toBe(day);
    expect(formatNumber(date.getHours())).toBe(hours);
    expect(formatNumber(date.getMinutes())).toBe(minutes);
  });

  test('convert fixed Date to string format', () => {
    const originalYear = 1994;
    const originalMonth = 1; // February (indext start at 0)
    const originalDate = 11;
    const originalHour = 2;
    const originalMinutes = 3;
    const date = new Date(
      originalYear,
      originalMonth,
      originalDate,
      originalHour,
      originalMinutes
    );

    const stringDate = formatDate(date);
    const [month, day, unformattedTime] = stringDate.split('/');
    const [year, time] = unformattedTime.split(',');
    const [hours, minutes] = time.trim().split(':');

    expect(originalYear).toBe(parseInt(year, 10));
    expect(formatNumber(originalMonth + 1)).toBe(month);
    expect(formatNumber(originalDate)).toBe(day);
    expect(formatNumber(originalHour)).toBe(hours);
    expect(formatNumber(originalMinutes)).toBe(minutes);
  });

  test('passing not a date', () => {
    const stringDate = formatDate();
    const stringDate2 = formatDate('random string');
    expect(stringDate).toBe('N/A');
    expect(stringDate2).toBe('N/A');
  });
});
