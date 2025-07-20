export default class Square {

    // Properties :

    _row: number;
    _column: number;


    // Constructor :

    /**
     * The constructor.
     * @param {number} row - the row.
     * @param {number} column - the column.
     */
    constructor(
        row: number,
        column: number
    ) {
        this._row = row;
        this._column = column;
    }


    // Accessors :

    /**
     * Returns the row.
     * @returns {number} the row.
     */
    get row(): number {
        return this._row;
    }

    /**
     * Returns the column.
     * @returns {number} the column.
     */
    get column(): number {
        return this._column;
    }
};
