const { UniqueIdFn } = require('../src/index');

//----------------------- Unique id test start ------------------//

describe('UniqueIdFn', () => {
    it('should generate a unique ID of the specified length without separator', () => {
        const length = 25;
        const groupLength = 5;
        const id = UniqueIdFn(length, groupLength);

        expect(id.length).toBe(length);
        // Check raw length since no separator is present
        expect(id.split('').length).toBe(length);
    });

    it('should generate a unique ID with separator', () => {
        const id = UniqueIdFn(25, 5, '-');
        const rawLength = id.replace(/-/g, '').length;
        const totalSeparatorLength = (id.length - rawLength);

        expect(id.length).toBeLessThanOrEqual(25);
        expect(rawLength + totalSeparatorLength).toBeLessThanOrEqual(25);
        expect(id.split('-').every(group => group.length <= 5)).toBe(true);
    });

    it('should throw an error for invalid length', () => {
        expect(() => UniqueIdFn(-1)).toThrow("The length parameter must be a positive number.");
    });

    it('should generate unique IDs on multiple calls', () => {
        const id1 = UniqueIdFn(25, 5);
        const id2 = UniqueIdFn(25, 5);
        expect(id1).not.toBe(id2);
    });

    it('should handle default group length correctly', () => {
        const length = 20;
        const id = UniqueIdFn(length);
        
        expect(id.length).toBe(length);
        expect(id.split('').length).toBe(length);  // No separator, check for exact length
    });

    it('should respect separator length adjustment', () => {
        const id = UniqueIdFn(30, 4, '/');
        const rawLength = id.replace(/\//g, '').length;
        const totalSeparatorLength = (id.length - rawLength);

        expect(id.length).toBeLessThanOrEqual(30);
        expect(rawLength + totalSeparatorLength).toBeLessThanOrEqual(30);
        expect(id.split('/').every(group => group.length <= 4)).toBe(true);
    });
});

//----------------------- Unique id test end here ------------------//
