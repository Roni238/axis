<template>
  <div class="relative group w-full">
    <input class="peer w-full bg-transparent border-b border-primary py-4 text-lg outline-none focus:border-accent-red transition-all resize-none min-h-[60px] text-white" 
    v-model="model" v-bind="$attrs" placeholder=" " :id="inputId">
    
    <label 
      :for="inputId"
      class="absolute left-0 top-4 text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-accent-red peer-[:not(:placeholder-shown)]:-top-4">
      {{ label }}
    </label>

    <div class="absolute bottom-0 left-0 h-[1px] bg-accent-red w-0 transition-all duration-300 peer-focus:w-full"/>
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

const model = defineModel({ default: '' })
const inputId = useId()

defineProps({ label: String })
</script>