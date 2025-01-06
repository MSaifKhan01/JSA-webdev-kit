import { getFormattedDateTime } from '../src/index';

const fixedDate = new Date('2024-12-24T15:30:00Z');
// jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);
jest.spyOn(global, 'Date').mockImplementation(() => new Date(Date.UTC(2024, 11, 24, 15, 30, 0)));



// Tests
describe('getFormattedDateTime', () => {
    test('should return ISO format', () => {
        expect(getFormattedDateTime('ISO')).toBe('2024-12-24T15:30:00.000Z');
    });

    test('should return short date format', () => {
        expect(getFormattedDateTime('SHORT')).toBe('12/24/2024');
    });

    test('should return long date format', () => {
        expect(getFormattedDateTime('LONG')).toBe('Tuesday, December 24, 2024');
    });

    test('should return 24-hour format', () => {
        expect(getFormattedDateTime('24H')).toBe('15:30');
    });

    test('should return 12-hour format with AM/PM', () => {
        expect(getFormattedDateTime('12H')).toBe('03:30 PM');
    });

    test('should return full date and time', () => {
        expect(getFormattedDateTime('FULL')).toBe('Tuesday, December 24, 2024 15:30:00');
    });

    test('should return UNIX epoch time', () => {
        expect(getFormattedDateTime('UNIX')).toBe('1735051800');
    });

    test('should return custom format with slashes', () => {
        expect(getFormattedDateTime('CUSTOM')).toBe('2024/12/24');
    });

    test('should return dash-separated format', () => {
        expect(getFormattedDateTime('DASH')).toBe('24-12-2024');
    });

    test('should return RFC 2822 format', () => {
        expect(getFormattedDateTime('RFC')).toBe('Tue, 24 Dec 2024 15:30:00 GMT');
    });

    test('should return human-readable format', () => {
        expect(getFormattedDateTime('HUMAN')).toBe('12/24/2024, 3:30:00 PM');
    });

    test('should return time only', () => {
        expect(getFormattedDateTime('TIME')).toBe('15:30:00');
    });

    test('should return date only', () => {
        expect(getFormattedDateTime('DATEONLY')).toBe('2024-12-24');
    });

    test('should return datetime format', () => {
        expect(getFormattedDateTime('DATETIME')).toBe('2024-12-24 15:30:00');
    });

    test('should return default format for unknown format', () => {
        expect(getFormattedDateTime('UNKNOWN')).toBe('2024-12-24 15:30:00');
    });
});
