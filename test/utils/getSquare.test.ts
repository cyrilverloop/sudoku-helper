import { assert, suite, test } from 'vitest';
import getSquare from "../../app/utils/getSquare.ts";
import AnswerSquare from "../../app/types/AnswerSquare";
import DraftSquare from "../../app/types/DraftSquare";
import FilledSquare from "../../app/types/FilledSquare";
import Square from "../../app/types/Square";

suite("The getSquare util", () => {

    suite("can return", () => {

        test("an answer square at every position", () => {
            const squares: AnswerSquare[][] = [];

            for(let row = 1; row < 10; row++) {
                let currentRow = [];

                for(let column = 1; column < 10; column++) {
                    currentRow[column] = new AnswerSquare(row, column);
                }

                squares[row] = currentRow;
            }


            for(let row = 1; row < 10; row++) {

                for(let column = 1; column < 10; column++) {
                    const returnedSquare = getSquare(squares, 1, 1);

                    assert.strictEqual(
                        returnedSquare.row,
                        1
                    );
                    assert.strictEqual(
                        returnedSquare.column,
                        1
                    );
                    assert.instanceOf(
                        returnedSquare,
                        AnswerSquare
                    );
                }
            }
        });

        test("a draft square at every position", () => {
            const squares: DraftSquare[][] = [];

            for(let row = 1; row < 10; row++) {
                let currentRow = [];

                for(let column = 1; column < 10; column++) {
                    currentRow[column] = new DraftSquare(row, column);
                }

                squares[row] = currentRow;
            }


            for(let row = 1; row < 10; row++) {

                for(let column = 1; column < 10; column++) {
                    const returnedSquare = getSquare(squares, 1, 1);

                    assert.strictEqual(
                        returnedSquare.row,
                        1
                    );
                    assert.strictEqual(
                        returnedSquare.column,
                        1
                    );
                    assert.instanceOf(
                        returnedSquare,
                        DraftSquare
                    );
                }
            }
        });

        test("an empty square at every position", () => {
            const squares: Square[][] = [];

            for(let row = 1; row < 10; row++) {
                let currentRow = [];

                for(let column = 1; column < 10; column++) {
                    currentRow[column] = new Square(row, column);
                }

                squares[row] = currentRow;
            }


            for(let row = 1; row < 10; row++) {

                for(let column = 1; column < 10; column++) {
                    const returnedSquare = getSquare(squares, 1, 1);

                    assert.strictEqual(
                        returnedSquare.row,
                        1
                    );
                    assert.strictEqual(
                        returnedSquare.column,
                        1
                    );
                    assert.instanceOf(
                        returnedSquare,
                        Square
                    );
                }
            }
        });

        test("a filled square at every position", () => {
            const squares: FilledSquare[][] = [];

            for(let row = 1; row < 10; row++) {
                let currentRow = [];

                for(let column = 1; column < 10; column++) {
                    currentRow[column] = new FilledSquare(row, column);
                }

                squares[row] = currentRow;
            }


            for(let row = 1; row < 10; row++) {

                for(let column = 1; column < 10; column++) {
                    const returnedSquare = getSquare(squares, 1, 1);

                    assert.strictEqual(
                        returnedSquare.row,
                        1
                    );
                    assert.strictEqual(
                        returnedSquare.column,
                        1
                    );
                    assert.instanceOf(
                        returnedSquare,
                        FilledSquare
                    );
                }
            }
        });
    });

    suite("throws an Error", () => {

        test("when the row does not exist", (): void => {
            assert.throws(
                (): void => {
                    getSquare([], 1, 1);
                },
                Error,
                "The square does not exist !"
            );
        });

        test("when the column does not exist", (): void => {
            assert.throws(
                (): void => {
                    getSquare([[], []], 1, 1);
                },
                Error,
                "The square does not exist !"
            );
        });
    });
});
