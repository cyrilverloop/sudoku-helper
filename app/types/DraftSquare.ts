import Square from "./Square";

export default class DraftSquare extends Square {

    // Properties :

    _digits: number[];


    // Constructor :

    /**
     * The constructor.
     * @param {number} row - the row.
     * @param {number} column - the column.
     * @param {number[]} digits - the digits.
     */
    constructor(
        row: number,
        column: number,
        digits: number[] = []
    ) {
        super(row, column);

        this._digits = digits;
    }


    // Accessors :

    /**
     * Returns the digits.
     * @returns {number[]} the digits.
     */
    get digits(): number[] {
        return this._digits;
    }


    // Mutators :

    /**
     * Changes the digits.
     * @param {number[]} digits - the digits.
     */
    set digits(digits: number[]) {
        this._digits = digits;
    }
};
