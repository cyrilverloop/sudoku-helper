<script setup lang="ts">
    const {
        digit
    } = defineProps<{
        digit: number|null
    }>();

    if(
        digit !== null &&
        (digit < 1 ||
        digit > 9)
    ) {
        throw new Error(digit + " is not > 0 and < 10.");
    }
</script>

<template>
    <span
        v-if="digit !== null"
        class="text-4xl"
    >
        {{ digit }}
    </span>
</template>
