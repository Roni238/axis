<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const heroRoot = ref(null)
const bgTextRef = ref(null)
const watchRef = ref(null)

let lastMouseY = 0
let lastMouseX = 0

const updatePosition = () => {
  if (!heroRoot.value || !bgTextRef.value || !watchRef.value) return
  
  const globalY = window.scrollY + lastMouseY
  const totalHeight = document.documentElement.scrollHeight
  const progress = globalY / totalHeight

  gsap.to(bgTextRef.value, { 
    xPercent: 35 - (progress * 150), 
    duration: 2, 
    ease: "power2.out" 
  })

  const xMove = (lastMouseX / window.innerWidth - 0.5) * 30
  const yMove = (lastMouseY / window.innerHeight - 0.5) * 20

  gsap.to(watchRef.value, {
    x: xMove,
    y: yMove,
    rotateZ: xMove * 0.1,
    duration: 3,
    ease: "power3.out"
  })
}

const handleMouseMove = (e) => {
  lastMouseX = e.clientX
  lastMouseY = e.clientY
  updatePosition()
}

let ctx
onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.from(".reveal-title", {
      opacity: 0,
      x: -40,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.15
    })

    tl.from(".reveal-fade", {
      opacity: 0,
      y: 15,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")

    tl.from(watchRef.value, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      duration: 2,
      ease: "expo.out"
    }, "-=1.5")

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', updatePosition)
    updatePosition()
  }, heroRoot.value)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <section ref="heroRoot" class="relative bg-[#0c0c0c] min-h-[calc(100dvh-72px)] flex items-center overflow-hidden isolate">
    <UiBaseGrid />

    <div class="absolute inset-0 z-0 opacity-[0.04] pointer-events-none noise-bg"/>

    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
      <h2 ref="bgTextRef" class="bg-text-huge will-change-transform">
        AXIS:ARCHIVE
      </h2>
    </div>

    <div class="relative z-30 container w-full">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        
        <div class="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">
          <h1 class="reveal-title h-section text-text-main mb-10 ">
            <div>AXIS</div>
            <div class="text-accent-red italic tracking-tight">Exclusive</div>
          </h1>

          <p class="reveal-fade max-w-md text-dimmed-mono !text-white/40 mb-12 !tracking-[0.2em] !lowercase first-letter:uppercase">
            Открой для себя коллекцию уникальных часов от мировых брендов. Редкие модели, проверенные эксперты и гарантия подлинности. Выбирай, инвестируй и носи стиль, который становится историей.
          </p>
          
          <NuxtLink to="#articles" class="reveal-fade">
            <UiBaseButton>
              Смотреть коллекцию
            </UiBaseButton>
          </NuxtLink>
        </div>

        <div class="w-full lg:w-1/2 h-full absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-end items-center z-20">
          <div ref="watchRef" class="h-[110vh] lg:h-[130vh] w-auto flex items-center justify-center">
            <NuxtImg 
              src="/images/banner.png" 
              class="h-full hidden lg:block w-auto object-contain select-none filter drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              alt="AXIS Chronograph"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-10 left-10 flex flex-col gap-2 pointer-events-none opacity-20">
       <span class="text-technical text-white">LOT ID: 03-BKR-9</span>
       <span class="text-technical text-white">STATUS: OPENED</span>
    </div>

  </section>
</template>
