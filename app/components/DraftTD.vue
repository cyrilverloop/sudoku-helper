<script setup lang="ts">
    defineProps<{
        digits: number[]
    }>();
</script>

<template>
    <ul class="list-inline mb-0">
        <li
            v-for="digit in digits"
            class="text-gray list-inline-item me-1">
            {{ digit }}
        </li>
    </ul>
</template>

<style scoped>
    .text-gray {
        color: gray;
    }
</style>
