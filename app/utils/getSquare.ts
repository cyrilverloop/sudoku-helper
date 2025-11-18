import Square from "~/types/Square";

/**
 * Returns the square at [row, column].
 * @param Square[][] the squares.
 * @param row the row.
 * @param column the column.
 * @throws {Error} if there is no square at [row, column].
 * @returns Square the square.
 */
export default function(
    squares: Square[][],
    row: number,
    column: number
): Square {

    if(
        squares[row] === undefined ||
        squares[row][column] === undefined
    ) {
        throw new Error("The square does not exist !");
    }

    return squares[row][column];
}
