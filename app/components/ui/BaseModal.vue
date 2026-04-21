<template>
  <Teleport to="body">
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="modelValue" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div 
          ref="overlayRef"
          class="absolute inset-0 bg-[#0c0c0c]/90 backdrop-blur-md"
          @click="$emit('update:modelValue', false)"
        ></div>

        <div 
          ref="modalRef"
          class="relative w-full max-w-2xl bg-[#0f0f0f] border-b border-primary p-8 lg:p-12 overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-full h-[2px] bg-accent-red"></div>
          
          <button 
            @click="$emit('update:modelValue', false)"
            class="absolute top-6 right-6 "
          >
            <Icon name="lucide:x" class="w-5 h-5 inline-block hover:fill-accent-red" />
          </button>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
const overlayRef = ref(null)
const modalRef = ref(null)

const onEnter = (el, done) => {
  const tl = gsap.timeline({ onComplete: done })
  
  tl.fromTo(overlayRef.value, { opacity: 0 }, { opacity: 1, duration: 0.5 })
  tl.fromTo(modalRef.value, 
    { y: 50, opacity: 0, scale: 0.95 }, 
    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, 
    "-=0.3"
  )
}

const onLeave = (el, done) => {
  const tl = gsap.timeline({ onComplete: done })
  
  tl.to(modalRef.value, { y: 20, opacity: 0, scale: 0.98, duration: 0.4, ease: "power2.in" })
  tl.to(overlayRef.value, { opacity: 0, duration: 0.3 }, "-=0.2")
}
</script>