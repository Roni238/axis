<script setup>
const model = defineModel({ default: false })

defineProps({
  required: {
    type: Boolean,
    default: true
  }
})
</script>
<template>
    <div class="group relative flex h-4 w-4 shrink-0 items-center justify-center border border-primary transition-colors hover:border-primary">
        <input class="peer absolute inset-0 z-10 cursor-pointer opacity-0" v-model="model" type="checkbox" :required="required" />
        <div class="h-2 w-2 scale-0 bg-accent-red transition-transform duration-300 peer-checked:scale-100"></div>
    </div>
</template>