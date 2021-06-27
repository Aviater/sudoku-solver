const { Sudoku } = require('../controller');
const { 
    rowMatrix, 
    columnMatrix, 
    subGridMatrix, 
    completedMatrix, 
    partialCompletedMatrix, 
    oneMissingCompletedRowMatrix,
    oneMissingCompletedColMatrix,
    oneMissingCompletedSubGridMatrix,
    twoMissingCompletedRowMatrix,
    twoMissingCompletedColMatrix,
    twoMissingCompletedSubGridMatrix
 } = require('../data/sudoku1');

describe("mainLoop method", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const sudoku = new Sudoku(oneMissingCompletedRowMatrix, oneMissingCompletedColMatrix, oneMissingCompletedSubGridMatrix);
    const sudoku2 = new Sudoku(twoMissingCompletedRowMatrix, twoMissingCompletedColMatrix, twoMissingCompletedSubGridMatrix);
    const sudoku3 = new Sudoku(completedMatrix, columnMatrix, subGridMatrix)

    test('Simulate recursion exit due to 10 traversals', () => {
        sudoku.traversalCounter = 10;
        sudoku.rowPos = 0;
        sudoku.colPos = 0;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 1;
        sudoku.candidate = 0;
        sudoku.candidatePos = 0;

        const mainLoopSpy = jest.spyOn(sudoku, 'mainLoop');
        const result = sudoku.mainLoop();

        expect(sudoku.traversalCounter).toEqual(10);
        expect(sudoku.rowPos).toEqual(0);
        expect(sudoku.colPos).toEqual(0);
        expect(sudoku.subGridPos).toEqual(0);
        expect(sudoku.numToCheck).toEqual(1);
        expect(sudoku.candidate).toEqual(0);
        expect(sudoku.candidatePos).toEqual(0);
        expect(result).toEqual(sudoku.rowMatrix);
        expect(mainLoopSpy).toBeCalledTimes(1);
    });

    test('Simulate initial candidate check', () => {
        sudoku.traversalCounter = 0;
        sudoku.rowPos = 0;
        sudoku.colPos = 8;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 1;
        sudoku.candidate = 0;
        sudoku.candidatePos = undefined;

        const numberCheckerSpy = jest.spyOn(sudoku, 'numberChecker');
        const crossReferenceSpy = jest.spyOn(sudoku, 'crossReference');
        const setPositionSpy = jest.spyOn(sudoku, 'setPosition');
        const mainLoopSpy = jest.spyOn(sudoku, 'mainLoop');

        sudoku.mainLoop();

        expect(setPositionSpy).toBeCalledTimes(12);
        expect(numberCheckerSpy).toBeCalledTimes(9);
        expect(crossReferenceSpy).toBeCalledTimes(5);
        expect(mainLoopSpy).toBeCalledTimes(13);
        expect(sudoku.traversalCounter).toEqual(0);
        expect(sudoku.rowPos).toEqual(8);
        expect(sudoku.colPos).toEqual(8);
        expect(sudoku.subGridPos).toEqual(8);
        expect(sudoku.numToCheck).toEqual(9);
        expect(sudoku.candidate).toEqual(0);
        expect(sudoku.candidatePos).toBeUndefined();
    });

    test('Simulate initial candidate check', () => {
        sudoku.traversalCounter = 0;
        sudoku.rowPos = 0;
        sudoku.colPos = 8;
        sudoku.subGridPos = 0;
        sudoku.numToCheck = 1;
        sudoku.candidate = 0;
        sudoku.candidatePos = undefined;

        sudoku.mainLoop();

        expect(sudoku.traversalCounter).toEqual(0);
        expect(sudoku.rowPos).toEqual(8);
        expect(sudoku.colPos).toEqual(8);
        expect(sudoku.subGridPos).toEqual(0);
        expect(sudoku.numToCheck).toEqual(1);
        expect(sudoku.candidate).toEqual(0);
        expect(sudoku.candidatePos).toBeUndefined();
    });

    test('Simulate repeat candidate check', () => {
        sudoku2.traversalCounter = 0;
        sudoku2.rowPos = 0;
        sudoku2.colPos = 8;
        sudoku2.subGridPos = 0;
        sudoku2.numToCheck = 1;
        sudoku2.candidate = 0;
        sudoku2.candidatePos = undefined;

        const numberCheckerSpy = jest.spyOn(sudoku2, 'numberChecker');
        const crossReferenceSpy = jest.spyOn(sudoku2, 'crossReference');
        const setPositionSpy = jest.spyOn(sudoku2, 'setPosition');
        const mainLoopSpy = jest.spyOn(sudoku2, 'mainLoop');

        sudoku2.mainLoop();

        expect(setPositionSpy).toBeCalledTimes(16);
        expect(numberCheckerSpy).toBeCalledTimes(6);
        expect(crossReferenceSpy).toBeCalledTimes(10);
        expect(mainLoopSpy).toBeCalledTimes(17);
        expect(sudoku2.traversalCounter).toEqual(0);
        expect(sudoku2.rowPos).toEqual(8);
        expect(sudoku2.colPos).toEqual(8);
        expect(sudoku2.subGridPos).toEqual(8);
        expect(sudoku2.numToCheck).toEqual(5);
        expect(sudoku2.candidate).toEqual(0);
        expect(sudoku2.candidatePos).toBeUndefined();
    });

    test('Simulate completed row matrix', () => {
        sudoku3.traversalCounter = 0;
        sudoku3.rowPos = 8;
        sudoku3.colPos = 8;
        sudoku3.subGridPos = 0;
        sudoku3.numToCheck = 1;
        sudoku3.candidate = 0;
        sudoku3.candidatePos = 0;

        const checkZerosSpy = jest.spyOn(sudoku3, 'checkZeros');
        const numberCheckerSpy = jest.spyOn(sudoku3, 'numberChecker');
        const crossReferenceSpy = jest.spyOn(sudoku3, 'crossReference');
        const setPositionSpy = jest.spyOn(sudoku3, 'setPosition');
        const mainLoopSpy = jest.spyOn(sudoku3, 'mainLoop');

        const result = sudoku3.mainLoop();

        expect(setPositionSpy).toBeCalledTimes(0);
        expect(numberCheckerSpy).toBeCalledTimes(0);
        expect(crossReferenceSpy).toBeCalledTimes(0);
        expect(checkZerosSpy).toBeCalledTimes(9);
        expect(mainLoopSpy).toBeCalledTimes(1);
        expect(sudoku3.traversalCounter).toEqual(0);
        expect(sudoku3.rowPos).toEqual(8);
        expect(sudoku3.colPos).toEqual(8);
        expect(sudoku3.subGridPos).toEqual(0);
        expect(sudoku3.numToCheck).toEqual(1);
        expect(sudoku3.candidate).toEqual(0);
        expect(sudoku3.candidatePos).toEqual(0);
        expect(result).toEqual(sudoku3.rowMatrix);
        expect(mainLoopSpy).toBeCalledTimes(1);
    });
});
