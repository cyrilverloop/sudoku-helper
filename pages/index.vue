<script setup lang="ts">
    import AnswerSquare from "../types/AnswerSquare";
    import DraftSquare from "../types/DraftSquare";
    import EmptySquare from "../types/EmptySquare";
    import FilledSquare from "../types/FilledSquare";
    import Square from "../types/Square";

    const squares = ref<(AnswerSquare|DraftSquare|EmptySquare|FilledSquare)[][]>([]);

    for(let row = 1; row < 10; row++) {
        squares.value[row] = [];

        for(let column = 1; column < 10; column++) {
            squares.value[row][column] = new EmptySquare(row, column);
        }
    }

    const selectedSquare = ref<AnswerSquare|DraftSquare|EmptySquare|FilledSquare|null>(null);

    /**
     * Toggles the selected square.
     * @param {Event} event - the event.
     */
    function toggleSelectedSquare(event: any): void {
        let square = event.target.closest(".square");

        const row: number = parseInt(square.dataset.row);
        const column: number = parseInt(square.dataset.column);

        if(
            selectedSquare.value !== null
            && selectedSquare.value.row === row
            && selectedSquare.value.column === column
        ) {
            selectedSquare.value = null;
        }
        else {
            selectedSquare.value = squares.value[row][column];
        }
    }

    /**
     * Changes the square type.
     * @param {Event} event - the event.
     */
    function changeSquareType(event: any): void {
        const row = (selectedSquare.value as Square).row;
        const column = (selectedSquare.value as Square).column;

        switch(event.target.value) {
            case EmptySquare.name:
                squares.value[row][column] = new EmptySquare(row, column);
                break;

            case DraftSquare.name:
                squares.value[row][column] = new DraftSquare(row, column);
                break;

            case AnswerSquare.name:
                squares.value[row][column] = new AnswerSquare(row, column);
                break;

            case FilledSquare.name:
                squares.value[row][column] = new FilledSquare(row, column);
        }

        selectedSquare.value = squares.value[row][column];
    }
</script>

<template>
    <section class="container pt-3">
        <div class="row ">
            <div class="col d-flex justify-content-center">
                <table class="border-black">
                    <tr v-for="row in 9">
                        <td v-for="column in 9"
                            class="text-center square"
                            :class="{
                                'border-right-grey': (column % 3 !== 0) && column !== 9,
                                'border-bottom-grey': (row % 3 !== 0) && row !== 9,
                                'border-right-black': (column % 3 === 0) && column !== 9,
                                'border-bottom-black': (row % 3 === 0) && row !== 9,
                                'bg-blue': selectedSquare !== null && (selectedSquare.row === row || selectedSquare.column === column)
                            }"
                            :id="`square-${row}-${column}`"
                            :data-row="row"
                            :data-column="column"
                            @click="toggleSelectedSquare"
                            >
                            <span
                                v-if="(squares[row][column] instanceof AnswerSquare) === true || (squares[row][column] instanceof FilledSquare) === true"
                                class="fs-1"
                                :class="{
                                    'fw-bold text-black': (squares[row][column] instanceof FilledSquare) === true,
                                    'text-blue': (squares[row][column] instanceof AnswerSquare) === true
                                }">
                                {{ (squares[row][column] as AnswerSquare|FilledSquare).value }}
                            </span>

                            <DraftTD
                                v-else-if="(squares[row][column] instanceof DraftSquare) === true"
                                :digits="(squares[row][column] as DraftSquare).digits"
                                />
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="row mt-3" v-if="selectedSquare !== null">
            <div class="col d-flex justify-content-center">
                <div class="btn-group btn-group-lg" role="group" aria-label="Choice of type of square." @input="changeSquareType">

                    <input type="radio" class="btn-check" autocomplete="off" name="square-type"
                        :id="`square-${EmptySquare.name}`"
                        :value="EmptySquare.name"
                        :checked="(selectedSquare instanceof EmptySquare) === true">
                    <label class="btn btn-outline-primary fs-2"
                        :for="`square-${EmptySquare.name}`">
                        empty
                    </label>

                    <input type="radio" class="btn-check" autocomplete="off" name="square-type"
                        :id="`square-${DraftSquare.name}`"
                        :value="DraftSquare.name"
                        :checked="(selectedSquare instanceof DraftSquare) === true">
                    <label class="btn btn-outline-primary fs-2"
                        :for="`square-${DraftSquare.name}`">
                        draft
                    </label>

                    <input type="radio" class="btn-check" autocomplete="off" name="square-type"
                        :id="`square-${AnswerSquare.name}`"
                        :value="AnswerSquare.name"
                        :checked="(selectedSquare instanceof AnswerSquare) === true">
                    <label class="btn btn-outline-primary fs-2"
                        :for="`square-${AnswerSquare.name}`">
                        answer
                    </label>

                    <input type="radio" class="btn-check" autocomplete="off" name="square-type"
                        :id="`square-${FilledSquare.name}`"
                        :value="FilledSquare.name"
                        :checked="(selectedSquare instanceof FilledSquare) === true">
                    <label class="btn btn-outline-primary fs-2"
                        :for="`square-${FilledSquare.name}`">
                        filled
                    </label>

                </div>
            </div>
        </div>

        <div class="row mt-3" v-if="selectedSquare !== null && (selectedSquare instanceof EmptySquare) === false">
            <div class="col d-flex justify-content-center">
                <div class="btn-group btn-group-lg" role="group" aria-label="Choice of digit.">

                    <Digit v-for="digit in 9"
                        :digit="digit">
                        <input type="radio" class="btn-check" name="digit-answer" autocomplete="off"
                            v-if="(selectedSquare instanceof AnswerSquare) === true || (selectedSquare instanceof FilledSquare) === true"
                            :id="`digit-${digit}`"
                            v-model="selectedSquare.value"
                            :value="digit"
                            />

                        <input type="checkbox" class="btn-check" autocomplete="off"
                            v-if="(selectedSquare instanceof DraftSquare) === true"
                            v-model="selectedSquare.digits[digit]"
                            :id="`digit-${digit}`"
                            :true-value="digit"
                            :false-value="null"
                            />
                    </Digit>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .square {
        height: 70px;
        width: 70px;
    }

    .border-black {
        border: 5px solid black;
    }

    .border-right-black {
        border-right: 3px solid black;
    }

    .border-right-grey {
        border-right: 1px solid grey;
    }

    .border-bottom-black {
        border-bottom: 3px solid black;
    }

    .border-bottom-grey {
        border-bottom: 1px solid grey;
    }

    .text-blue {
        color: rgb(56, 56, 191)    }

    .bg-blue {
        background-color: rgba(64, 247, 204, 0.447)
    }
</style>
