const { Sudoku } = require('../controller');
const { rowMatrix, columnMatrix, subGridMatrix } = require('../data/sudoku1');

describe("crossReference method", () => {
    const sudoku = new Sudoku(rowMatrix, columnMatrix, subGridMatrix);

    test('Simulate a collision in the column matrix', () => {
        // Test 1
        sudoku.rowPos = 0;
        sudoku.colPos = 0;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 5;
        sudoku.candidate = 5;
        sudoku.candidatePos = 0;

        let result = sudoku.crossReference();

        expect(sudoku.rowPos).toEqual(0);
        expect(sudoku.colPos).toEqual(0);
        expect(sudoku.subGridPos).toEqual(0);
        expect(sudoku.numToCheck).toEqual(5);
        expect(sudoku.candidate).toEqual(5);
        expect(result).toEqual(false);

        // Test 2
        sudoku.rowPos = 3;
        sudoku.colPos = 5;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 2;
        sudoku.candidate = 2;
        sudoku.candidatePos = 3;

        result = sudoku.crossReference();

        expect(sudoku.rowPos).toEqual(3);
        expect(sudoku.colPos).toEqual(5);
        expect(sudoku.subGridPos).toEqual(4);
        expect(sudoku.numToCheck).toEqual(2);
        expect(sudoku.candidate).toEqual(2);
        expect(result).toEqual(false);
    });

    test('Simulate a collision in the sub-grid matrix', () => {
        // Test 1
        sudoku.rowPos = 7;
        sudoku.colPos = 3;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 7;
        sudoku.candidate = 7;
        sudoku.candidatePos = 7;

        let result = sudoku.crossReference();

        expect(sudoku.rowPos).toEqual(7);
        expect(sudoku.colPos).toEqual(3);
        expect(sudoku.subGridPos).toEqual(5);
        expect(sudoku.numToCheck).toEqual(7);
        expect(sudoku.candidate).toEqual(7);
        expect(result).toEqual(false);

        // Test 2
        sudoku.rowPos = 4;
        sudoku.colPos = 0;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 6;
        sudoku.candidate = 6;
        sudoku.candidatePos = 4;

        result = sudoku.crossReference();

        expect(sudoku.rowPos).toEqual(4);
        expect(sudoku.colPos).toEqual(0);
        expect(sudoku.subGridPos).toEqual(1);
        expect(sudoku.numToCheck).toEqual(6);
        expect(sudoku.candidate).toEqual(6);
        expect(result).toEqual(false);
    });

    test('Simulate no collisions', () => {
        // Test 1
        sudoku.rowPos = 6;
        sudoku.colPos = 0;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 5;
        sudoku.candidate = 5;
        sudoku.candidatePos = 6;

        let result = sudoku.crossReference();
 
        expect(sudoku.rowPos).toEqual(6);
        expect(sudoku.colPos).toEqual(0);
        expect(sudoku.subGridPos).toEqual(2);
        expect(sudoku.numToCheck).toEqual(5);
        expect(sudoku.candidate).toEqual(5);
        expect(result).toEqual(true);

        // Test 2
        sudoku.rowPos = 1;
        sudoku.colPos = 7;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 4;
        sudoku.candidate = 4;
        sudoku.candidatePos = 1;

        result = sudoku.crossReference();

        expect(sudoku.rowPos).toEqual(1);
        expect(sudoku.colPos).toEqual(7);
        expect(sudoku.subGridPos).toEqual(6);
        expect(sudoku.numToCheck).toEqual(4);
        expect(sudoku.candidate).toEqual(4);
        expect(result).toEqual(true);
    });
});

