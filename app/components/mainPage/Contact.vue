<script setup>
import { ref, reactive, nextTick } from 'vue'
import gsap from 'gsap'

const isSubmitted = ref(false)
const isLoading = ref(false)
const formRef = ref(null)
const successRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  message: '',
  agree: false
})

const handleSubmit = async () => {
  isLoading.value = true

  await new Promise(resolve => setTimeout(resolve, 800))

  gsap.to(formRef.value, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: "power2.in",
    onComplete: async () => {
      isSubmitted.value = true
      isLoading.value = false
      
      await nextTick()
      
      gsap.fromTo(successRef.value, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
      )
      
      gsap.from(successRef.value.querySelector('.check-icon'), {
        scale: 0.5,
        rotate: -45,
        duration: 1,
        ease: "back.out(2)"
      })
    }
  })
}

const resetForm = () => {
  gsap.to(successRef.value, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      isSubmitted.value = false
      Object.assign(form, { name: '', email: '', message: '', agree: false })
    }
  })
}
</script>

<template>
  <section class="relative bg-[#070707] py-20 lg:py-32 overflow-hidden">
    <UiBaseGrid :lines="5" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative container">
      <div class="lg:col-span-5 flex flex-col">
        <div class="flex items-center gap-4 text-technical mb-2">
          <span class="red-line" /> Контакты
        </div>
        
        <h2 class="h-section tracking-wide text-text-main">
          Свяжемся <br /> <span class="text-text-muted italic"> по заказу</span>
        </h2>
      </div>

      <div class="lg:col-span-7 relative flex flex-col justify-center">
        <form class="flex flex-col gap-10 lg:gap-14" v-if="!isSubmitted" ref="formRef" @submit.prevent="handleSubmit">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            <UiBaseInput v-model="form.name" label="ФИО" required />
            <UiBaseInput v-model="form.email" type="email" label="Email" required />
          </div>

          <UiBaseInput v-model="form.message" label="Сообщение / Интересный лот" />

          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6">
            <label class="flex items-center gap-4 max-w-[320px] group cursor-pointer">
              <UiBaseCheckbox v-model="form.agree"/>
              <p class="text-dimmed-mono group-hover:text-white/50 transition-colors lowercase tracking-wide">
                Я принимаю условия <span class="text-text-white/50 underline decoration-accent-red/40 underline-offset-4">передачи данных</span>
              </p>
            </label>
            
            <UiBaseButton class="w-full lg:w-auto" type="submit">
              <span v-if="!isLoading">Отправить заявку</span>
              <span v-else>Отправка...</span>
            </UiBaseButton>
          </div>
        </form>

        <div 
          v-else 
          ref="successRef"
          class="flex flex-col items-center text-center py-10"
        >
          <div class="check-icon w-16 h-16 mb-6 border border-accent-red flex items-center justify-center">
             <span class="text-accent-red text-2xl">✓</span>
          </div>
          <h3 class="text-text-main text-xl tracking-widest mb-4 uppercase">Заявка принята</h3>
          <p class="text-dimmed-mono max-w-xs">
            Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
          </p>
          <button 
            class="mt-8 text-[10px] text-accent-red uppercase tracking-[0.2em] hover:text-text-main transition-colors"
            @click="resetForm" 
          >
            Отправить еще раз
          </button>
        </div>
      </div>
    </div>
  </section>
</template>