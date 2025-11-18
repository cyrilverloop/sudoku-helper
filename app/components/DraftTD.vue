<script setup lang="ts">
    const {
        digits = []
    } = defineProps<{
        digits: number[]
    }>();
</script>

<template>
    <table
        class="m-auto"
    >
        <tbody>
            <tr
                v-for="row in 3"
            >
                <td
                    v-for="column in 3"
                    class="text-gray-400 text-xs px-1"
                >
                    <template
                        v-if="digits.includes(((row - 1) * 3) + column) === true"
                    >
                        {{ ((row - 1) * 3) + column }}
                    </template>
                    <template
                        v-else
                    >
                        &nbsp;&nbsp;
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>
