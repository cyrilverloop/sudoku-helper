<script setup lang="ts">
    import AnswerSquare from "~/types/AnswerSquare";
    import DraftSquare from "~/types/DraftSquare";
    import FilledSquare from "~/types/FilledSquare";
    import OneValueSquare from "~/types/OneValueSquare";
    import Square from "~/types/Square";
    import SquareType from "~/types/SquareType";
    import type { CheckboxGroupItem, RadioGroupItem, RadioGroupValue } from '@nuxt/ui';

    const squares = ref<(Square)[][]>([]);

    for(let row = 1; row < 10; row++) {
        let currentRow = [];

        for(let column = 1; column < 10; column++) {
            currentRow[column] = new Square(row, column);
        }

        squares.value[row] = currentRow;
    }

    const selectedSquare = ref<Square|null>(null);

    /**
     * Selects a square.
     * @param row the row.
     * @param column the column.
     */
    function selectSquare(
        row: number,
        column: number
    ): void {
        selectedSquare.value = getSquare(squares.value, row, column);
        squareTypeValue.value = checkedType.value;
        digitValue.value = "" + selectedDigitValue.value;
        draftValues.value = selectedDraftValues.value;
    }

    /**
     * Deselects a square.
     */
    function deselectSquare(): void {
        selectedSquare.value = null;
        squareTypeValue.value = null;
        digitValue.value = null;
        draftValues.value = [];
    }

    // Square type selector :
    const squareTypeItems = ref<RadioGroupItem[]>([
        SquareType.empty,
        SquareType.draft,
        SquareType.answer,
        SquareType.filled
    ]);

    const checkedType = computed((): SquareType|null => {

        if(selectedSquare.value === null) {
            return null;
        }

        const selectedSquareType: string = Object.getPrototypeOf(selectedSquare.value).constructor.name;

        switch(selectedSquareType.split("Square")[0]) {
            case SquareType.answer:
                return SquareType.answer;

            case SquareType.draft:
                return SquareType.draft;

            case "":
                return SquareType.empty;

            case SquareType.filled:
                return SquareType.filled;
        }

        throw new Error("The square type does not exist.");
    });
    const squareTypeValue = ref<RadioGroupValue>(null);

    /**
     * Changes the square type.
     * @throws {Error} if there is no selected square.
     * @throws {Error} if the coordinates do not correspond to a square.
     */
    function changeSquareType(): void {

        if(selectedSquare.value === null) {
            throw new Error("There is no selected square.");
        }

        const row = selectedSquare.value.row;
        const column = selectedSquare.value.column;

        switch(squareTypeValue.value) {
            case SquareType.empty:
                selectedSquare.value = new Square(row, column);
                break;

            case SquareType.draft:
                selectedSquare.value = new DraftSquare(row, column);
                break;

            case SquareType.answer:
                selectedSquare.value = new AnswerSquare(row, column);
                break;

            case SquareType.filled:
                selectedSquare.value = new FilledSquare(row, column);
        }

        digitValue.value = null;
        draftValues.value = [];

        if(
            squares.value[row] === undefined ||
            squares.value[row][column] === undefined
        ) {
            throw new Error("The square does not exist !");
        }

        squares.value[row][column] = selectedSquare.value;
    }


    // One value selector :
    const oneValueItems = ref<RadioGroupItem[]>([
        1, 2, 3, 4, 5, 6, 7, 8, 9
    ]);
    const selectedDigitValue = computed((): number|null => {

        if(
            selectedSquare.value === null
            || (selectedSquare.value instanceof OneValueSquare) === false
        ) {
            return null;
        }

        return selectedSquare.value.value;
    });
    const digitValue = ref<RadioGroupValue>(null);

    const hasOneValue = computed((): boolean => {

        if(
            selectedSquare.value === null
            || ((selectedSquare.value instanceof AnswerSquare) === false
            && (selectedSquare.value instanceof FilledSquare) === false)
        ) {
            return false;
        }

        return true;
    });

    /**
     * Changes the digit value.
     * @throws Error when there is no selected square.
     */
    function changeDigitValue(): void {

        if(selectedSquare.value === null) {
            throw new Error("There is no selected square.");
        }

        (selectedSquare.value as OneValueSquare).value = parseInt(digitValue.value as string);
    }


    // Draft selector :
    const draftItems = ref<CheckboxGroupItem[]>([
        1, 2, 3, 4, 5, 6, 7, 8, 9
    ]);
    const selectedDraftValues = computed((): string[] => {

        if(
            selectedSquare.value === null
            || (selectedSquare.value instanceof DraftSquare) === false
        ) {
            return [];
        }

        const selectedValues: string[] = [];

        for(const value of selectedSquare.value.digits) {
            selectedValues.push((value  as number).toString());
        }

        return selectedValues;
    });
    const draftValues = ref<RadioGroupValue[]>([]);

    const hasManyValues = computed((): boolean => {

        if(
            selectedSquare.value === null
            || (selectedSquare.value instanceof DraftSquare) === false
        ) {
            return false;
        }

        return true;
    });

    /**
     * Changes the draft values.
     * @throws Error when there is no draft square selected.
     */
    function changeDraftValues(): void {

        if(
            selectedSquare.value === null
            || (selectedSquare.value instanceof DraftSquare) === false

        ) {
            throw new Error("There is no draft square selected.");
        }

        const newSelectedValues: number[] = [];

        for(const value of draftValues.value) {
            newSelectedValues.push(parseInt(value as string));
        }

        selectedSquare.value.digits = newSelectedValues;
    }
</script>

<template>
    <UApp>
        <Table
            :selected-square="selectedSquare"
            :squares="squares"
            @deselect-square="deselectSquare"
            @select-square="selectSquare"
        />

        <URadioGroup
            v-if="selectedSquare !== null"
            :items="squareTypeItems"
            v-model="squareTypeValue"
            @change="changeSquareType"
            class="m-auto mt-3 w-84"
            id="square-type-selector"
            indicator="hidden"
            orientation="horizontal"
            size="xl"
            variant="table"
        />

        <URadioGroup
            v-if="hasOneValue"
            :items="oneValueItems"
            v-model="digitValue"
            @change="changeDigitValue"
            class="m-auto mt-3 w-105"
            id="digit-selector"
            indicator="hidden"
            orientation="horizontal"
            size="xl"
            variant="table"
        />
        <UCheckboxGroup
            v-else-if="hasManyValues"
            :items="draftItems"
            v-model="draftValues"
            @change="changeDraftValues"
            class="m-auto mt-3 w-105"
            id="draft-selector"
            indicator="hidden"
            orientation="horizontal"
            size="xl"
            variant="table"
        />
    </UApp>
</template>
