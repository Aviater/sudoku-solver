const { Sudoku } = require('../controller');
const { rowMatrix, columnMatrix, subGridMatrix, completedMatrix, partialCompletedMatrix } = require('../data/sudoku1');

describe("checkZeros method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const sudoku = new Sudoku(partialCompletedMatrix, columnMatrix, subGridMatrix);
    const sudoku2 = new Sudoku(completedMatrix, columnMatrix, subGridMatrix);

    test('Simulate one or more 0\'s to be found', () => {
        // Test 1
        sudoku.traversalCounter = 0;

        let checkZeroSpy = jest.spyOn(sudoku, 'checkZeros');
        let result = sudoku.checkZeros(3);

        expect(sudoku.traversalCounter).toEqual(1);
        expect(result).toEqual(false);
        expect(checkZeroSpy).toBeCalledTimes(2);
        expect(checkZeroSpy).toHaveBeenCalledWith(3);
        expect(checkZeroSpy).toHaveBeenLastCalledWith(4);

        jest.clearAllMocks();
 
        // Test 2
        sudoku.traversalCounter = 4;
        result = sudoku.checkZeros(0);
        expect(sudoku.traversalCounter).toEqual(5);
        expect(result).toEqual(false);
        expect(checkZeroSpy).toBeCalledTimes(5);
        expect(checkZeroSpy).toHaveBeenCalledWith(0);
        expect(checkZeroSpy).toHaveBeenCalledWith(1);
        expect(checkZeroSpy).toHaveBeenCalledWith(2);
        expect(checkZeroSpy).toHaveBeenCalledWith(3);
        expect(checkZeroSpy).toHaveBeenLastCalledWith(4);
    });

    
    test('Simulate no 0\'s to be found', () => {
        // Test 1
        sudoku2.traversalCounter = 0;

        let checkZeroSpy = jest.spyOn(sudoku2, 'checkZeros');
        let result = sudoku2.checkZeros(0);

        expect(sudoku2.traversalCounter).toEqual(0);
        expect(result).toEqual(true);
        expect(checkZeroSpy).toBeCalledTimes(9);
        expect(checkZeroSpy).toHaveBeenCalledWith(0);
        expect(checkZeroSpy).toHaveBeenCalledWith(1);
        expect(checkZeroSpy).toHaveBeenCalledWith(7);
        expect(checkZeroSpy).toHaveBeenLastCalledWith(8);

        jest.clearAllMocks();

        // Test 2
        sudoku2.traversalCounter = 3;

        result = sudoku2.checkZeros(5);

        expect(sudoku2.traversalCounter).toEqual(3);
        expect(result).toEqual(true);
        expect(checkZeroSpy).toBeCalledTimes(4);
        expect(checkZeroSpy).toHaveBeenCalledWith(5);
        expect(checkZeroSpy).toHaveBeenCalledWith(6);
        expect(checkZeroSpy).toHaveBeenCalledWith(7);
        expect(checkZeroSpy).toHaveBeenLastCalledWith(8);
    });
});

