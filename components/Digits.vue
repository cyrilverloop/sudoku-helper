<script setup lang="ts">
    defineProps<{
        digit: number
    }>();
</script>

<template>
    <slot></slot>

    <label class="btn btn-outline-primary fs-2"
        :for="`digit-${digit}`">
        {{ digit }}
    </label>
</template>
