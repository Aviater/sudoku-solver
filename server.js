const express = require('express');
const { sampleRowMatrix, sampleColMatrix, sampleSubGridMatrix
 } = require('./data/sudoku1');
const { Sudoku } = require('./controller');

const app = express();

const sudoku1 = new Sudoku(sampleRowMatrix, sampleColMatrix, sampleSubGridMatrix);
sudoku1.mainLoop();

const port = 5000;
app.listen(port, () => console.log('Server started on port ' + port + '...'));