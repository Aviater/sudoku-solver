class Sudoku {
    constructor(rowMatrix, columnMatrix, subGridMatrix) {
        this.rowMatrix = rowMatrix;
        this.columnMatrix = columnMatrix;
        this.subGridMatrix = subGridMatrix;
    }

    rowPos = 0;
    colPos = 8;
    subGridPos = 0;
    numToCheck = 1;
    candidate = 0;
    candidatePos;
    traversalCounter = 0;

    mainLoop() {
        // Check for Nº of traversals and stop at the set limit
        if(this.traversalCounter > 9) {
            console.log(`Exiting after ${this.traversalCounter} times to avoid infinite recursion...`)
            return this.rowMatrix;
        }

        // this.debug('mainLoop');

        // Sub-loop for candidate flow
        if(this.candidate !== 0) {
            if(this.crossReference()) {
                
                this.candidate = 0;
                this.candidatePos = undefined;
                this.numToCheck += 1;
                this.mainLoop();
            } else {
                if(this.candidatePos === 8) {
                    this.rowMatrix[this.colPos][this.rowPos] = this.candidate;
                    console.log('===========')
                    console.log('INSERT:', this.rowMatrix[this.colPos][this.rowPos])
                    console.log('===========')
                    this.candidate = 0;
                    this.candidatePos = undefined;
                }
                
                this.setPosition();
                this.mainLoop();
            }
        } else {
            // loop for no candidate
            if(this.rowMatrix[this.colPos][this.rowPos] === 0) {
                this.numberChecker();
                if(this.candidate !== 0) {
                    if(!this.crossReference()) {
                        this.candidate = 0;
                        this.candidatePos = undefined;
                        this.numToCheck += 1;
                        this.mainLoop();
                    }
                } 
            }
        }

        // Check if matrix is complete
        if(this.rowPos === 8 && this.colPos === 8) {
            if(this.checkZeros(0)) {
                console.log('COMPLETED:', this.rowMatrix);
                return this.rowMatrix;
            } else {
                this.traversalCounter += 1;
            }
        }

        
        this.setPosition();

        // setTimeout(() => {
        //     this.mainLoop();
        // }, 2000)
        this.mainLoop();
    }

    setPosition() {
        if(this.candidatePos) {
            this.candidatePos += 1;
        } else {
            if(this.rowPos === 8 && this.colPos === 8) {
                this.rowPos = 0;
                this.colPos = 0;
            } else if(this.rowPos === 8) {
                this.rowPos = 0;
                this.colPos += 1;
            } else {
                this.rowPos += 1;
            }
        }

        // this.debug('setPosition');
    }

    numberChecker() {
        if(this.rowMatrix[this.colPos].includes(this.numToCheck)) {
            if(this.numToCheck > 9) {
                this.numToCheck = 1;
                this.candidate = 0;
            } else {
                this.numToCheck += 1;

                return this.numberChecker();
            }
        } else {
            if(this.numToCheck > 9) {
                this.numToCheck = 1;
                this.candidate = 0;
            } else {
                this.candidate = this.numToCheck;
                this.candidatePos = this.rowPos;
            }
        }

        // this.debug('numberChecker');
    }

    crossReference() {
        const row = this.colPos;
        const col = this.candidatePos;

        if([0, 1, 2].includes(col) && [0, 1, 2].includes(row)) {
            this.subGridPos = 0;
        } else if([3, 4, 5].includes(col) && [0, 1, 2].includes(row)) {
            this.subGridPos = 1;
        } else if([6, 7, 8].includes(col) && [0, 1, 2].includes(row)) {
            this.subGridPos = 2;
        } else if([0, 1, 2].includes(col) && [3, 4, 5].includes(row)) {
            this.subGridPos = 3;
        } else if([3, 4, 5].includes(col) && [3, 4, 5].includes(row)) {
            this.subGridPos = 4;
        } else if([6, 7, 8].includes(col) && [3, 4, 5].includes(row)) {
            this.subGridPos = 5;
        } else if([0, 1, 2].includes(col) && [6, 7, 8].includes(row)) {
            this.subGridPos = 6;
        } else if([3, 4, 5].includes(col) && [6, 7, 8].includes(row)) {
            this.subGridPos = 7;
        } else if([6, 7, 8].includes(col) && [6, 7, 8].includes(row)) {
            this.subGridPos = 8;
        }

        // this.debug('crossReference');

        if(this.columnMatrix[col].includes(this.candidate)) {
            return false;
        }

        if(this.subGridMatrix[this.subGridPos].includes(this.candidate)) {
            return false;
        }

        return true;
    }

    checkZeros(row) {
        if(row < 8) {
            if(this.rowMatrix[row].includes(0)) {
                this.traversalCounter += 1;
                return false;
            } else {
                row += 1;
                return this.checkZeros(row);
            }
        }
        return true;
    }

    debug(methodName) {
        console.log('===========')
        console.log(`${methodName} rowPos:`, this.rowPos);
        console.log(`${methodName} colPos:`, this.colPos);
        console.log(`${methodName} subGridPos:`, this.subGridPos);
        console.log(`${methodName} numToCheck:`, this.numToCheck);
        console.log(`${methodName} candidate:`, this.candidate);
        console.log(`${methodName} candidatePos:`, this.candidatePos);
        console.log('===========')
    }
}

module.exports.Sudoku = Sudoku;