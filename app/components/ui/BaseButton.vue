<template>
  <button 
    v-bind="$attrs"
    class="group relative h-16 px-12 border border-primary overflow-hidden transition-all hover:border-accent-red active:scale-[0.98]"
  >
    <div class="absolute z-[-1] inset-0 bg-accent-red translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
    
    <span class="text-[10px] font-black tracking-[0.4em] uppercase text-text-main transition-colors">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: true })
</script>