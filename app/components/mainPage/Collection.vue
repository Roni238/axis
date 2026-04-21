<script setup>
import { ref, computed } from 'vue'
import { gsap } from 'gsap'

const products = [
  { id: 'LOT_AX-01', name: 'Certina OBSIDIAN', price: '4,200', desc: 'Титановый браслет. Сапфировое стекло. Искусственно изготовленное стекло с высокой прочностью и устойчивостью к царапинам.', img: '/images/clock1.png' },
  { id: 'LOT_AX-02', name: 'PAGANI Quartz', price: '3,850', desc: 'Браслет из нержавеющей стали. Прочное, устойчивое к царапинам минеральное стекло защищает часы от повреждений.', img: '/images/clock2.jpeg' },
  { id: 'LOT_AX-03', name: 'Breitling DS Action', price: '5,100', desc: 'Браслет из нержавеющей стали. Сапфировое стекло. Искусственно изготовленное стекло с высокой прочностью и устойчивостью к царапинам.', img: '/images/clock3.jpg' },
  { id: 'LOT_AX-04', name: 'PAGANI Daytona', price: '5,100', desc: 'Браслет из нержавеющей стали. Искусственно изготовленное стекло с высокой прочностью и устойчивостью к царапинам.', img: '/images/clock4.jpeg' },
  { id: 'LOT_AX-05', name: 'PAGANI Daytona', price: '2,100', desc: 'Браслет из силикона. Искусственно изготовленное стекло с высокой прочностью и устойчивостью к царапинам.', img: '/images/clock5.jpeg' },
]

const currentIndex = ref(0)
const isAnimating = ref(false)
const isOrderModalOpen = ref(false)

const getSlideTransform = (index) => {
  let diff = index - currentIndex.value
  const len = products.length

  if (diff > len / 2) diff -= len
  if (diff < -len / 2) diff += len

  const xTranslate = diff * 500 
  const isActive = diff === 0

  return {
    transform: `translateX(${xTranslate}px) scale(${isActive ? 1.1 : 0.7})`,
    opacity: isActive ? 1 : 0.1,
  }
}

const setSlide = (newIndex) => {
  if (isAnimating.value) return
  
  const targetIndex = (newIndex + products.length) % products.length
  const direction = newIndex > currentIndex.value ? 1 : -1

  const tl = gsap.timeline({
    onStart: () => { isAnimating.value = true },
    onComplete: () => { isAnimating.value = false }
  })

  tl.to(".content-reveal", { 
    opacity: 0, 
    x: -30 * direction, 
    duration: 0.3, 
    stagger: 0.05, 
    ease: "power2.in" 
  })
  .add(() => { currentIndex.value = targetIndex })
  .fromTo(".content-reveal", 
    { opacity: 0, x: 30 * direction }, 
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
  )
}
</script>

<template>
  <section class="relative min-h-[calc(100dvh-72px)] w-full bg-[#070707] text-text-main font-sans flex flex-col overflow-hidden">
    
    <div class="relative w-full flex flex-col flex-1 container lg:flex-row">
      
      <div class="w-full flex-1 lg:w-1/2 flex flex-col justify-center">
        
        <div class="content-reveal mb-4 lg:mb-12 ">
          
          <div class="flex items-center gap-4 text-technical mb-2">
            <span class="red-line"/> ID: {{ products[currentIndex].id }}
          </div>

          <h2 class="text-5xl md:text-7xl lg:text-[7vw] leading-[0.85] tracking-tighter mb-3 lg:mb-8 max-w-[12ch] lg:max-w-none">
            {{ products[currentIndex].name }}
          </h2>

          <p class="font-mono text-[13px] lg:text-[14px] leading-relaxed lg:leading-[1.8] text-white/40 uppercase tracking-widest max-w-[800px] min-h-[3.6em]">
            {{ products[currentIndex].desc }}
          </p>
        </div>

        <div class="content-reveal lg:hidden w-full  max-h-[500px] relative my-4 flex items-center justify-center">
          <div class="absolute inset-0 bg-white/[0.02] blur-[40px] rounded-full scale-110"></div>
          <NuxtImg loading="lazy" :src="products[currentIndex].img" class="w-full max-h-[200px] object-cover lg:max-h-[500px]" alt="AXIS Chronograph"/>
        </div>

        <div class="content-reveal flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-12 border-t border-white/5 pt-5 lg:pt-12">
          <div class="flex flex-col min-w-fit">
            <span class="text-[14px] font-mono text-text-muted uppercase tracking-widest mb-0.5 italic">Цена:</span>
            <span class="text-3xl lg:text-5xl font-light italic tracking-tighter text-white/90">
              {{ products[currentIndex].price }} ₽ 
            </span>
          </div>

          <UiBaseButton @click="isOrderModalOpen = true" class="px-6 lg:px-14">Сделать заказ</UiBaseButton>
        </div>

        <div class="lg:hidden flex items-center justify-between w-full mt-6 pt-5 border-t border-white/5">
          <button class="w-12 h-12 flex items-center justify-center active:bg-primary transition-colors"
            @click="setSlide(currentIndex - 1)" 
            aria-label="Предыдущий товар"
          >
            <Icon class="w-5 h-5 text-white" name="lucide:chevron-left"/>
          </button>
  
          <div class="flex flex-col items-center gap-1.5">
            <span class="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
              {{ products[currentIndex].name }}
            </span>
            <div class="flex gap-1">
              <div v-for="i in products.length" :key="i" 
                  class="w-1 h-1 transition-all duration-300"
                  :class="currentIndex === i-1 ? 'bg-accent-red' : 'bg-primary'">
              </div>
            </div>
          </div>

          <button class="w-12 h-12 flex items-center justify-center active:bg-primary transition-colors" 
            aria-label="Следующий товар"
            @click="setSlide(currentIndex + 1)" 
          >
            <Icon class="w-5 h-5 text-white" name="lucide:chevron-right" />
          </button>

        </div>
      </div>

      <div class="hidden lg:block h-full m-auto relative content-reveal relative group">
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[160px] scale-125"></div>
          <NuxtImg loading="lazy" :src="products[currentIndex].img" class="h-[70vh] w-auto object-contain" alt="AXIS Chronograph"/>
      </div>
    </div>

    <div class="hidden lg:flex relative h-32 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl items-center justify-center">
      
      <button @click="setSlide(currentIndex - 1)" aria-label="Предыдущий товар"
        class="absolute left-10 z-50 p-6 transition-all hover:scale-110">
        <Icon name="lucide:chevron-left" class="w-10 h-10" />
      </button>

      <div class="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div v-for="(p, i) in products" :key="p.id" 
          class="absolute flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          :style="getSlideTransform(i)"
        >

          <span class="text-3xl lg:text-2xl font-black uppercase tracking-[0.4em] whitespace-nowrap select-none">
            {{ p.name }}
          </span>

          <div class="mt-6 h-[2px] bg-red-600 transition-all duration-700" 
               :class="currentIndex === i ? 'w-32 opacity-100' : 'w-0 opacity-0'"/>
        </div>
      </div>

      <button @click="setSlide(currentIndex + 1)" aria-label="Следующий товар"
              class="absolute right-10 z-50 p-6  transition-all hover:scale-110">
        <Icon name="lucide:chevron-right" class="w-10 h-10" />
      </button>

    </div>

    <MainPageOrderModal v-model="isOrderModalOpen" />
  </section>
</template>

<style scoped>
.content-reveal {
  will-change: transform, opacity;
}

section {
  background: radial-gradient(circle at 50% 50%, #0f0f0f 0%, #070707 100%);
}
</style>