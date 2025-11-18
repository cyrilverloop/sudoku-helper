<script setup lang="ts">
    import AnswerSquare from "~/types/AnswerSquare";
    import DraftSquare from "~/types/DraftSquare";
    import FilledSquare from "~/types/FilledSquare";
    import Square from "~/types/Square";

    const {
        selectedSquare,
        squares
    } = defineProps<{
        selectedSquare: Square|null,
        squares: (Square)[][]
    }>();

    const emit = defineEmits<{
        selectSquare: [
            row: number,
            column: number
        ],
        deselectSquare: []
    }>();

    /**
     * Toggles the selected square.
     * @param {Event} event - the event.
     */
    function toggleSelectedSquare(event: any): void {
        let squareNode = event.target;

        while(squareNode.dataset.row === undefined) {
            squareNode = squareNode.parentElement;
        }

        const row: number = parseInt(squareNode.dataset.row);
        const column: number = parseInt(squareNode.dataset.column);

        if(
            selectedSquare !== null
            && selectedSquare.row === row
            && selectedSquare.column === column
        ) {
            emit("deselectSquare");
        }
        else {
            emit("selectSquare", row, column);
        }
    }
</script>

<template>
    <table
        @click.stop="toggleSelectedSquare"
        class="m-auto table-fixed border-black border-5"
    >
        <tbody>
            <tr v-for="row in 9">
                <td
                    v-for="column in 9"
                    :class="{
                        'border-r-gray-400 border-r': (column % 3 !== 0) && column !== 9,
                        'border-b-gray-400 border-b': (row % 3 !== 0) && row !== 9,
                        'border-r-black border-r-3': (column % 3 === 0) && column !== 9,
                        'border-b-black border-b-3': (row % 3 === 0) && row !== 9,
                        'bg-(--bg-selected)': selectedSquare !== null && (selectedSquare.row === row || selectedSquare.column === column)
                    }"
                    :data-column="column"
                    :data-row="row"
                    class="text-center w-15 h-15"
                >
                    <AnswerTD
                        v-if="(getSquare(squares, row, column) instanceof AnswerSquare) === true"
                        :digit="((getSquare(squares, row, column) as AnswerSquare).value as number)"
                    />
                    <FilledTD
                        v-else-if="(getSquare(squares, row, column) instanceof FilledSquare) === true"
                        :digit="((getSquare(squares, row, column) as FilledSquare).value as number)"
                    />
                    <DraftTD
                        v-else-if="(getSquare(squares, row, column) instanceof DraftSquare) === true"
                        :digits="(getSquare(squares, row, column) as DraftSquare).digits"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
