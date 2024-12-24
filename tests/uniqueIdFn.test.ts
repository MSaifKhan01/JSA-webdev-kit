const { UniqueIdFn} = require('../src/index');


describe('UniqueIdFn', () => {
    it('should generate a unique ID of the specified length', () => {
        const id = UniqueIdFn(25, 5);
        expect(id.length).toBe(25);
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
        const id = UniqueIdFn(20);
        expect(id.length).toBe(20);
        expect(id.split('-').every(group => group.length <= 10)).toBe(true); // Assuming default group length is 10
    });
});
