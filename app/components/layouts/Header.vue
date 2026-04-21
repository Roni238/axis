<template>
  <header 
    ref="headerRef"
    class="h-[72px] sticky top-0 z-[100] bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-primary-dark overflow-hidden"
  >
    <div 
      class="tracer-line absolute bottom-[-1px] left-0 h-[3px] bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-0 z-50"
      style="width: 200px;" 
    ></div>

    <div class="container h-full mx-auto flex items-center justify-between relative">
      <div class="flex items-center md:w-[200px]"> 
        <NuxtLink to="/" class="group relative flex items-center" aria-label="AXIS — Вернуться на главную">
          <IconsLogo class="text-text-main w-[80px] relative z-10 transition-transform duration-500 group-hover:scale-105" />
        </NuxtLink>
      </div>

      <nav class="hidden lg:flex items-center h-full w-1/3 border-x border-primary-dark">
        <div v-for="(link, index) in navLinks" :key="link.to" class="flex-1 flex items-center h-full" :class="{'border-x border-primary-dark': index == 1}">
          <NuxtLink 
            :to="link.to" 
            class="group relative w-full h-full flex items-center justify-center text-text-muted hover:text-text-main transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-red transition-all duration-700 ease-expo group-hover:w-full"/>
            <span class="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </NuxtLink>
        </div>
      </nav>

      <div class="flex items-center justify-end md:w-[200px]">
        <div class="hidden md:block">
          <UiBaseButton class="!px-6 !h-10 !text-[9px]" @click="isOrderModalOpen = true">
            Сделать заказ
          </UiBaseButton>
        </div>

        <button aria-label="Открыть меню навигации" @click="showMenu = !showMenu"
          class="md:hidden w-10 h-10 flex items-center justify-center border border-primary rounded-sm bg-white/[0.02]"
        >
          <Icon 
            :name="showMenu ? 'lucide:plus' : 'lucide:menu'" 
            :class="{'rotate-45': showMenu, 'text-accent-red': showMenu}" 
            class="w-5 h-5 text-text-main transition-all duration-500 ease-expo" 
          />
        </button>
      </div>

      <MainPageOrderModal v-model="isOrderModalOpen" />
      <LayoutsMobileMenu v-model="showMenu" :links="navLinks" />
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const showMenu = ref(false)
const headerRef = ref(null)
let ctx
const isOrderModalOpen = ref(false)
const navLinks = [
  { label: 'Коллекция', to: '#articles' },
  { label: 'О нас', to: '#about' },  
  { label: 'Контакты', to: '#contact' }
]

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ 
      delay: 3,
      repeat: -1, 
      repeatDelay: 400 
    })

    tl.to(".tracer-line", {
      left: "100%",
      opacity: 1,
      width: "600px",
      duration: 2.8,
      ease: "power2.inOut",
      startAt: { left: "-600px", opacity: 0, width: "200px" },
      onComplete: function() {
        gsap.set(".tracer-line", { opacity: 0 })
      }
    })
  }, headerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.ease-expo {
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.router-link-active {
  color: white !important;
  opacity: 1;
}

.router-link-active span:first-of-type {
  width: 100%;
}

header {
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.3);
}

.tracer-line {
  filter: drop-shadow(0 0 4px rgba(255, 0, 0, 0.6));
}
</style>