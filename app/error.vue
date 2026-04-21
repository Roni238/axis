<template>
  <div class="fixed inset-0 bg-[#0c0c0c] flex items-center justify-center overflow-hidden z-[100]">
    <div class="absolute inset-0 opacity-20 pointer-events-none bg-[url('/img/noise.png')]"></div>
    
    <div ref="contentRef" class="relative z-10 text-center px-6">
      <div class="relative inline-block mb-8">
        <h1 class="text-[12rem] md:text-[18rem] font-light leading-none tracking-tighter text-text-muted select-none">
          {{ error.statusCode }}
        </h1>
      </div>

      <div class="max-w-md mx-auto">
        <h2 class="text-xl md:text-2xl text-text-main font-light mb-4 uppercase tracking-widest">
          {{ error.statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка' }}
        </h2>
        
        <p class="text-white/40 text-sm md:text-base mb-12 leading-relaxed font-light">
          Похоже, вы попали на страницу, которой еще не существует.
        </p>

        <button @click="handleError"
          class="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden border border-primary transition-all duration-300 hover:border-white"
        >
          <span class="relative text-xs uppercase tracking-[0.2em] text-text-main transition-colors duration-300">
            Вернуться в на главную
          </span>
          <div class="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 opacity-[0.03]"></div>
        </button>
      </div>
    </div>

    <div class="absolute top-10 left-10 text-[10px] text-text-muted font-mono uppercase tracking-widest hidden md:block">
      Axis_Archive / v.22.16.0
    </div>
    <div class="absolute bottom-10 right-10 text-[10px] text-text-muted font-mono uppercase tracking-widest hidden md:block">
      Status: {{ error.statusCode }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ error: Object })
const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
h1 {
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
}
</style>