import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments:', () => {

    test('sum function should add two numbers', () => {
        expect(sum(2, 2)).toBe(4);
        expect(sum(1, 3)).toBe(4);
        expect(sum(7, 3)).toBe(10);
    });

    test('sum function should throw Error with non-number as first argument', () => {
        expect(() => sum('olololo', 2)).toThrow();
    });

    test('sum function should throw Error with non-number as second argument', () => {
        expect(() => sum(1, 'azaza')).toThrow();
    });

    test('delay function should return a resolved Promise', async () => {
        await expect(delay()).resolves.toBe('success');
    });

    test('getUniqueID function should return string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });

    test('getUniqueID function should return string with length === argument', () => {
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getUniqueID function should throw Error with non-number as argument', () => {
        expect(() => getUniqueID('olololo')).toThrow();
    });

    test('getFullApiUrl function should return concat string with /', () => {
        expect(getFullApiUrl('api', 'test')).toBe('api/test');
        expect(getFullApiUrl('api-v2', 'test')).toBe('api-v2/test');
    });

    test('getFullApiUrl function should throw Error with non-string as first argument', () => {
        expect(() => getFullApiUrl('olololo', 2)).toThrow();
    });

    test('getFullApiUrl function should throw Error with non-string as second argument', () => {
        expect(() => getFullApiUrl(1, 'azaza')).toThrow();
    });

});
