<template>
    <div class="bg-grid-lines">
      <div v-for="line in lines" :key="line" class="bg-grid-line"/>
    </div>
</template>

<script setup>
defineProps({
    lines: {
        type: Number,
        default: 4
    }
})
</script>