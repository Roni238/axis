<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-400 ease-out" enter-from-class="opacity-0" leave-active-class="transition duration-300 ease-in" leave-to-class="opacity-0">
      <div v-if="modelValue" class="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm" @click="emit('update:modelValue', false)" />
    </Transition>

    <Transition enter-active-class="transition duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]" enter-from-class="-translate-y-full" leave-active-class="transition duration-400 ease-in" leave-to-class="-translate-y-full">
      <aside 
        v-if="modelValue" 
        class="fixed inset-x-0 top-16 z-[90] bg-secondary border-b border-white/5 p-10 rounded-b-none shadow-2xl"
        @click="e => e.target.closest('a') && emit('update:modelValue', false)"
      >
        <nav class="flex flex-col gap-1">
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to" 
            class="group py-6 border-b border-white/5 last:border-none flex justify-between items-center"
          >
            <span class="text-text-main text-lg font-bold uppercase tracking-[0.2em] group-active:text-primary-light">
              {{ link.label }}
            </span>
            <Icon name="lucide:chevron-right" class="w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </nav>
        
        <div class="">
          <span class="text-xs text-text-muted tracking-widest">Коллекция / 2026</span>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  links: {
    type: Array,
    default: () => [
      { label: 'Ассортимент', to: '#articles' },
      { label: 'О нас', to: '#about' },
      { label: 'Контакты', to: '#contact' }
    ]
  }
})

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, v => {
  if (process.client) document.body.style.overflow = v ? 'hidden' : ''
})

onUnmounted(() => {
  if (process.client) document.body.style.overflow = ''
})
</script>