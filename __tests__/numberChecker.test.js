const { Sudoku } = require('../controller');
const { rowMatrix, columnMatrix, subGridMatrix } = require('../data/sudoku1');

describe("numberChecker method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const sudoku = new Sudoku(rowMatrix, columnMatrix, subGridMatrix);

    test('Simulate numToCheck to reset due to number being found in row', () => {
        // Test 1
        sudoku.rowPos = 1;
        sudoku.colPos = 0;
        sudoku.numToCheck = 8;
        sudoku.candidate = 0;

        let numberCheckerSpy = jest.spyOn(sudoku, 'numberChecker');
        let result = sudoku.numberChecker();
 
        expect(sudoku.numToCheck).toEqual(1);
        expect(sudoku.candidate).toEqual(0);
        expect(sudoku.rowPos).toEqual(1);
        expect(sudoku.colPos).toEqual(0);
        expect(numberCheckerSpy).toBeCalledTimes(3);

        jest.clearAllMocks();

        // Test 2
        sudoku.rowPos = 4;
        sudoku.colPos = 0;
        sudoku.numToCheck = 8;
        sudoku.candidate = 0;

        sudoku.numberChecker();

        expect(sudoku.numToCheck).toEqual(1);
        expect(sudoku.candidate).toEqual(0);
        expect(sudoku.rowPos).toEqual(4);
        expect(sudoku.colPos).toEqual(0);
        expect(numberCheckerSpy).toBeCalledTimes(3);
    });

    test('Simulate a number being found that\'s not present in the row', () => {
        // Test 1
        sudoku.rowPos = 0;
        sudoku.colPos = 0;
        sudoku.numToCheck = 1;
        sudoku.candidate = 0;

        let numberCheckerSpy = jest.spyOn(sudoku, 'numberChecker');
        sudoku.numberChecker();

        expect(sudoku.numToCheck).toEqual(3);
        expect(sudoku.candidate).toEqual(3);
        expect(sudoku.rowPos).toEqual(0);
        expect(sudoku.colPos).toEqual(0);
        expect(numberCheckerSpy).toBeCalledTimes(3);
    });
});

