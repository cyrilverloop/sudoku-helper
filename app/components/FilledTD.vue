<script setup lang="ts">
    const {
        digit
    } = defineProps<{
        digit: number|null
    }>();
</script>

<template>
    <OneValueTD
        :digit="digit"
        class="font-bold text-black"
    />
</template>
