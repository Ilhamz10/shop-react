import { getPageCount, getPagesArray } from "../utils/pages"

describe('tests for little functions', () => {
    test('test getPagesArray function', () => {
        expect(getPagesArray(3)).toEqual([0, 1, 2]);
    })

    test('test getPageCount function', () => {
        expect(getPageCount(17, 5)).toEqual(4);
        expect(getPageCount(0, 5)).toEqual(0);
    })
})