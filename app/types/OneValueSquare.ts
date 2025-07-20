import Square from "./Square";

export default class OneValueSquare extends Square {

    // Properties :

    _value: number|null;


    // Constructor :

    /**
     * The constructor.
     * @param {number} row - the row.
     * @param {number} column - the column.
     * @param {number|null} value - the value.
     */
    constructor(
        row: number,
        column: number,
        value: number|null = null
    ) {
        super(row, column);

        this._value = value;
    }


    // Accessors :

    /**
     * Returns the row.
     * @returns {number|null} the row.
     */
    get value(): number|null {
        return this._value;
    }


    // Mutators :

    /**
     * Changes the value.
     * @param {number} value - the value.
     */
    set value(value: number) {
        this._value = value;
    }
};
