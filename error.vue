<script setup>
    defineProps(['error']);
</script>

<template>
    {{ error.statusCode }} - {{ error.message }}<br />
    <NuxtLink to="/">Go back home</NuxtLink>
</template>
