import { assert, suite, test } from "vitest";
import { mount } from "@vue/test-utils";
import Table from "../../app/components/Table.vue";
import AnswerSquare from "../../app/types/AnswerSquare";
import DraftSquare from "../../app/types/DraftSquare";
import FilledSquare from "../../app/types/FilledSquare";
import Square from "../../app/types/Square";
import SquareType from '../../app/types/SquareType';

/**
 * Returns the new square.
 * @param squareType the type of square.
 * @param row the row.
 * @param column the column.
 * @param value the value.
 * @param digits the digits.
 * @returns the new square.
 */
function getNewSquare(
    squareType: SquareType,
    row: number,
    column: number,
    value?: number|null,
    digits?: number[]|undefined
): Square {

    switch(squareType) {
        case SquareType.answer:
            return new AnswerSquare(row, column, value);

        case SquareType.draft:
            return new DraftSquare(row, column, digits);

        case SquareType.empty:
            return new Square(row, column);

        case SquareType.filled:
            return new FilledSquare(row, column, value);
    }
}

/**
 * Returns the generated squares.
 * @param squareType the type of square.
 * @param value the value.
 * @param digits the digits.
 * @returns the generated squares.
 */
function generateSquares(
    squareType: SquareType,
    value?: number|null,
    digits?: number[]|undefined
): Square[][] {
    const squares: Square[][] = [];

    for(let row = 1; row < 10; row++) {
        let currentRow = [];

        for(let column = 1; column < 10; column++) {
            currentRow[column] = getNewSquare(squareType, row, column, value, digits);
        }

        squares[row] = currentRow;
    }

    return squares;
}

/**
 * Returns the generated answer squares.
 * @returns the generated answer squares.
 */
function generateAnswerSquares(): AnswerSquare[][] {
    return generateSquares(SquareType.answer, 1);
}

/**
 * Returns the generated draft squares.
 * @returns the generated draft squares.
 */
function generateDraftSquares(): DraftSquare[][] {
    return generateSquares(SquareType.draft, null, [1, 2]);
}

/**
 * Returns the generated empty squares.
 * @returns the generated empty squares.
 */
function generateEmptySquares(): Square[][] {
    return generateSquares(SquareType.empty);
}

/**
 * Returns the generated filled squares.
 * @returns the generated filled squares.
 */
function generateFilledSquares(): FilledSquare[][] {
    return generateSquares(SquareType.filled, 1);
}

suite("The Table component", (): void => {

    suite("can have", (): void => {

        test("answer squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateAnswerSquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.strictEqual(node?.text(), "1");
            }
        });

        test("draft squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateDraftSquares()
                }
            });

            for(let rowIndex: number = 1; rowIndex < 10; rowIndex++) {
                for(let columnIndex: number = 1; columnIndex < 10; columnIndex++) {
                    const tdNode = table.find('[data-row="' + rowIndex + '"][data-column="' + columnIndex + '"]');

                    assert.strictEqual(tdNode.text(), "12");
                }
            }
        });

        test("empty squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.isEmpty(node?.text());
            }
        });

        test("filled squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateFilledSquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.strictEqual(node?.text(), "1");
            }
        });

        test("a selected square", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: new Square(1, 1),
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const selectedSquaresNodeIndex = [
                0, 1, 2, 3, 4, 5, 6, 7, 8,
                9,
                27,
                36,
                54,
                63,
                72
            ];

            for(let currentIndex of selectedSquaresNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const notSelectedSquaresNodeIndex = [
                10, 11, 12, 13, 14, 15, 16, 17,
                19, 20, 21, 22, 23, 24, 25, 26,
                28, 29, 30, 31, 32, 33, 34, 35,
                37, 38, 39, 40, 41, 42, 43, 44,
                46, 47, 48, 49, 50, 51, 52, 53,
                55, 56, 57, 58, 59, 60, 61, 62,
                64, 65, 66, 67, 68, 69, 70, 71,
                73, 74, 75, 76, 77, 78, 79, 80
            ];

            for(let currentIndex of notSelectedSquaresNodeIndex) {
                assert.notInclude(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }
        });

        test("no selected square", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.notInclude(
                    node?.classes(),
                    "bg-(--bg-selected)"
                );
            }
        });
    });


    suite("can be displayed with", (): void => {

        test("a 5 pixels black exterior border", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            assert.include(
                table.classes(),
                "border-5"
            );

            assert.include(
                table.classes(),
                "border-black"
            );
        });

        test("3 pixels black right border between 3x3 squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const rBorderNodeIndex = [
                2, 5,
                11, 14,
                20, 23,
                29, 32,
                38, 41,
                47, 50,
                56, 59,
                65, 68,
                74, 77,
            ];

            for(let currentIndex of rBorderNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-r-3"
                );

                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-r-black"
                );
            }
        });

        test("3 pixels black bottom border between 3x3 squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const bBorderNodeIndex = [
                18, 19, 20, 21, 22, 23, 24, 25, 26,
                45, 46, 47, 48, 49, 50, 51, 52, 53
            ];

            for(let currentIndex of bBorderNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-b-3"
                );

                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-b-black"
                );
            }
        });

        test("1 pixel gray 400 right border between squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const rBorderNodeIndex = [
                0, 1, 3, 4, 6, 7,
                9, 10, 12, 13, 15, 16,
                18, 19, 21, 22, 24, 25,
                27, 28, 30, 31, 33, 34,
                36, 37, 39, 40, 42, 43,
                45, 46, 48, 49, 51, 52,
                54, 55, 57, 58, 60, 61,
                63, 64, 66, 67, 69, 70,
                72, 73, 75, 76, 78, 79
            ];

            for(let currentIndex of rBorderNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-r"
                );

                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-r-gray-400"
                );
            }
        });

        test("1 pixel gray 400 bottom border between squares", (): void => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const bBorderNodeIndex = [
                0, 1, 2, 3, 4, 5, 6, 7, 8,
                9, 10, 11, 12, 13, 14, 15, 16, 17,
                27, 28, 29, 30, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42, 43, 44,
                54, 55, 56, 57, 58, 59, 60, 61, 62,
                63, 64, 65, 66, 67, 68, 69, 70, 71
            ];

            for(let currentIndex of bBorderNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-b"
                );

                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "border-b-gray-400"
                );
            }
        });
    });


    suite("can emit a", (): void => {

        test("'selectSquare' event when a square is selected", async (): Promise<void> => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.notInclude(
                    node?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const firstSquareNode = trNodes.at(0);
            await firstSquareNode?.trigger("click");

            const toggleSelectedSquareEvent = table.emitted("selectSquare");
            assert.lengthOf(
                toggleSelectedSquareEvent,
                1,
                "Has not been called only once."
            );
            assert.lengthOf(
                toggleSelectedSquareEvent[0],
                2,
                "Has not been called with two parameters."
            );
            assert.strictEqual(
                toggleSelectedSquareEvent[0][0],
                1,
                "The event did not send the row 1."
            );
            assert.strictEqual(
                toggleSelectedSquareEvent[0][1],
                1,
                "The event did not send the column 1."
            );

            await table.setProps({
                selectedSquare: new Square(1, 1)
            });

            const selectedSquaresNodeIndex = [
                0, 1, 2, 3, 4, 5, 6, 7, 8,
                9,
                27,
                36,
                54,
                63,
                72
            ];

            for(let currentIndex of selectedSquaresNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const notSelectedSquaresNodeIndex = [
                10, 11, 12, 13, 14, 15, 16, 17,
                19, 20, 21, 22, 23, 24, 25, 26,
                28, 29, 30, 31, 32, 33, 34, 35,
                37, 38, 39, 40, 41, 42, 43, 44,
                46, 47, 48, 49, 50, 51, 52, 53,
                55, 56, 57, 58, 59, 60, 61, 62,
                64, 65, 66, 67, 68, 69, 70, 71,
                73, 74, 75, 76, 77, 78, 79, 80
            ];

            for(let currentIndex of notSelectedSquaresNodeIndex) {
                assert.notInclude(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }
        });

        test("'selectSquare' event when an other square is selected", async (): Promise<void> => {
            const table = mount(Table, {
                props: {
                    selectedSquare: null,
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.notInclude(
                    node?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const firstSquareNode = trNodes.at(0);
            await firstSquareNode?.trigger("click");

            const otherSquareNode = trNodes.at(10);
            await otherSquareNode?.trigger("click");

            const toggleSelectedSquareEvent = table.emitted("selectSquare");
            assert.lengthOf(
                toggleSelectedSquareEvent,
                2,
                "Has not been called twice."
            );
            assert.lengthOf(
                toggleSelectedSquareEvent[1],
                2,
                "Has not been called with two parameters."
            );
            assert.strictEqual(
                toggleSelectedSquareEvent[1][0],
                2,
                "The event did not send the row 2."
            );
            assert.strictEqual(
                toggleSelectedSquareEvent[1][1],
                2,
                "The event did not send the column 2."
            );

            await table.setProps({
                selectedSquare: new Square(2, 2)
            });

            const selectedSquaresNodeIndex = [
                1,
                9, 10, 11, 12, 13, 14, 15, 16, 17,
                28,
                37,
                55,
                64,
                73
            ];

            for(let currentIndex of selectedSquaresNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const notSelectedSquaresNodeIndex = [
                0, 2, 3, 4, 5, 6, 7, 8,
                18, 20, 21, 22, 23, 24, 25, 26,
                27, 29, 30, 31, 32, 33, 34, 35,
                36, 38, 39, 40, 41, 42, 43, 44,
                45, 47, 48, 49, 50, 51, 52, 53,
                54, 56, 57, 58, 59, 60, 61, 62,
                63, 65, 66, 67, 68, 69, 70, 71,
                72, 74, 75, 76, 77, 78, 79, 80
            ];

            for(let currentIndex of notSelectedSquaresNodeIndex) {
                assert.notInclude(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }
        });

        test("'deselectSquare' event when a square is deselected", async (): Promise<void> => {
            const table = mount(Table, {
                props: {
                    selectedSquare: new Square(1, 1),
                    squares: generateEmptySquares()
                }
            });

            const trNodes = table.findAll('td');
            const selectedSquaresNodeIndex = [
                0, 1, 2, 3, 4, 5, 6, 7, 8,
                9,
                27,
                36,
                54,
                63,
                72
            ];

            for(let currentIndex of selectedSquaresNodeIndex) {
                assert.include(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const notSelectedSquaresNodeIndex = [
                10, 11, 12, 13, 14, 15, 16, 17,
                19, 20, 21, 22, 23, 24, 25, 26,
                28, 29, 30, 31, 32, 33, 34, 35,
                37, 38, 39, 40, 41, 42, 43, 44,
                46, 47, 48, 49, 50, 51, 52, 53,
                55, 56, 57, 58, 59, 60, 61, 62,
                64, 65, 66, 67, 68, 69, 70, 71,
                73, 74, 75, 76, 77, 78, 79, 80
            ];

            for(let currentIndex of notSelectedSquaresNodeIndex) {
                assert.notInclude(
                    trNodes.at(currentIndex)?.classes(),
                    "bg-(--bg-selected)"
                );
            }

            const firstSquareNode = trNodes.at(0);
            await firstSquareNode?.trigger("click");

            const toggleSelectedSquareEvent = table.emitted("deselectSquare");
            assert.lengthOf(
                toggleSelectedSquareEvent,
                1,
                "Has not been called only once."
            );
            assert.lengthOf(
                toggleSelectedSquareEvent[0],
                0,
                "Has not been called without parameter."
            );

            await table.setProps({
                selectedSquare: null
            });

            for(let index: number = 0; index < 81; index++) {
                const node = trNodes.at(index);

                assert.notInclude(
                    node?.classes(),
                    "bg-(--bg-selected)"
                );
            }
        });
    });
});
