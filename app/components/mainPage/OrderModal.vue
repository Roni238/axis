<template>
  <UiBaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="relative min-h-[460px] flex flex-col justify-center overflow-hidden">
      
      <div v-if="isSubmitted" ref="successContent" class="flex flex-col items-center text-center py-10 opacity-0">
        <div class="relative mb-10">
          <div class="success-ring w-24 h-24 border border-accent-red/20 rounded-full flex items-center justify-center">
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="1.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
        </div>
        
        <h3 class="text-3xl tracking-[0.2em] mb-6">
          Запрос <span class="text-accent-red italic">Принят</span>
        </h3>
        
        <div class="space-y-2">
          <p class="text-xs text-text-muted font-light max-w-[280px] leading-relaxed uppercase tracking-widest">
            Ваш запрос на {{ formData.lot }} зарегистрирован. Ожидайте связи со специалистом.
          </p>
        </div>
      </div>

      <div v-else ref="formContent" class="flex flex-col gap-10">
        <div>
          <div class="flex items-center gap-4 mb-4">
            <span class="w-8 h-[1px] bg-accent-red"></span>
            <span class="text-accent-red text-[10px] tracking-[0.6em] uppercase font-mono font-bold">
              Мы свяжемся с вами
            </span>
          </div>
          <h2 class="text-4xl">
            Оформить <span class="text-text-muted italic">Заказ</span>
          </h2>
        </div>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <UiBaseInput v-model="formData.name" label="Полное имя" placeholder="" />
          <UiBaseInput v-model="formData.email" type="email" label="Email" required />

          <div class="col-span-full flex flex-col gap-2 relative group">
            <label class="text-[10px] uppercase tracking-[0.3em] text-text-muted font-mono mb-2" for="lot-select">
              Выбрать Лот
            </label>
            <div class="relative">
              <select id="lot-select" v-model="formData.lot" class="w-full bg-transparent border-b border-primary py-4 text-lg outline-none focus:border-accent-red transition-all appearance-none text-text-main font-mono cursor-pointer">
                <option class="bg-[#0c0c0c]" v-for="lot in lots" :key="lot" :value="lot">{{ lot }}</option>
              </select>
              <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-focus-within:text-accent-red">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <div class="col-span-full mt-6">
            <UiBaseButton class="w-full !h-16 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" :disabled="!formData.name || !formData.email">
              Отправить запрос на покупку
            </UiBaseButton>
          </div>
        </form>
      </div>
    </div>
  </UiBaseModal>
</template>

<script setup>
import { reactive, ref, nextTick } from 'vue'
import { gsap } from 'gsap'

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const isSubmitted = ref(false)
const formContent = ref(null)
const successContent = ref(null)

const lots = ['Certina OBSIDIAN', 'PAGANI Quartz', 'Breitling DS Action', 'PAGANI Daytona', 'PAGANI Daytona']
const formData = reactive({
  name: '',
  email: '',
  lot: lots[0] || ''
})

const handleSubmit = async () => {
  const tl = gsap.timeline()
  
  await tl.to(formContent.value, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.inOut'
  })

  isSubmitted.value = true
  
  await nextTick()

  tl.fromTo(successContent.value, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
  )
  .from('.success-ring', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.3")

  setTimeout(() => {
    emit('update:modelValue', false)
    setTimeout(() => { 
      isSubmitted.value = false
      formData.name = ''
      formData.email = ''
    }, 500)
  }, 3500)
}
</script>