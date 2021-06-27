const { Sudoku } = require('../controller');
const { rowMatrix, columnMatrix, subGridMatrix } = require('../data/sudoku1');

describe("CheckPosition method", () => {
    const sudoku = new Sudoku(rowMatrix, columnMatrix, subGridMatrix);

    test('Simulate setPosition without row hop', () => {
        // Test 1
        sudoku.rowPos = 6;
        sudoku.colPos = 0;

        sudoku.setPosition();

        expect(sudoku.rowPos).toEqual(7);
        expect(sudoku.colPos).toEqual(0);

        // Test 2
        sudoku.rowPos = 2;
        sudoku.colPos = 7;

        sudoku.setPosition();

        expect(sudoku.rowPos).toEqual(3);
        expect(sudoku.colPos).toEqual(7);
    });

    test('Simulate setPosition with row hop', () => {
        // Test 1
        sudoku.rowPos = 8;
        sudoku.colPos = 3;

        sudoku.setPosition();

        expect(sudoku.rowPos).toEqual(0);
        expect(sudoku.colPos).toEqual(4);

        // Test 2
        sudoku.rowPos = 8;
        sudoku.colPos = 5;

        sudoku.setPosition();

        expect(sudoku.rowPos).toEqual(0);
        expect(sudoku.colPos).toEqual(6);
    });
});

