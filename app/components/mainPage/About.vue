<template>
  <section class="py-20 lg:py-0 relative bg-[#070707] border-y border-white/5 overflow-hidden">
    <UiBaseGrid />

    <div class="absolute -left-4 lg:-left-10 top-1/2 -translate-y-1/2 text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-white/[0.03] to-transparent select-none pointer-events-none uppercase leading-none tracking-tighter">
      Exclusive
    </div>

    <div class="container flex items-center min-h-[calc(100dvh-72px)]">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
        
        <div class="lg:col-span-5 flex flex-col gap-3 md:gap-4 lg:gap-8">
          <div class="flex items-center gap-4 text-technical">
            <span class="red-line"/> Лучший выбор года
          </div>
          
          <h2 class="text-4xl md:text-5xl">
            СОВРЕМЕННЫЙ РИТЕЙЛЕР<br /> 
            <span class="text-text-main italic"> НАРУЧНЫХ ЧАСОВ</span>
          </h2>

          <div class="p-4 lg:p-8 border-l-2 border-accent-red/40 bg-white/[0.02] backdrop-blur-sm">
             <p class="text-[13px] lg:text-[14px] text-text-main font-mono leading-relaxed uppercase tracking-wider italic">
              Мы помогаем всем нашим клиентам подобрать свои часы, которые станут частью их личной истории.
              В наличии — большой выбор наручных часов ведущих швейцарских, японских, скандинавских, американских и других брендов.
            </p>
          </div>
        </div>

        <div class="lg:col-span-7 flex flex-col justify-center gap-4 lg:gap-8">
          <h3 class="text-white/90 font-light leading-tight tracking-tight max-w-2xl ">
            Часы от популярных брендов — 
            <span class="text-accent-red font-black italic">доступны для покупки прямо сейчас</span>.
          </h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div v-for="spec in specs" :key="spec.title" class="flex flex-col gap-4">
              <span class="text-text-main font-black  uppercase tracking-tighter">
                {{ spec.title }}
              </span>
              <p class="text-[14px] leading-[1.6] uppercase tracking-[0.1em] text-white/40 font-medium">
                {{ spec.code }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const specs = [
  { 
    title: 'В наличии', 
    code: 'Широкая экспозиция: от вечной классики до редких лимитированных серий, доступных к покупке в день обращения.' 
  },
  { 
    title: 'Экспертиза', 
    code: 'Тщательный отбор брендов и многоступенчатая проверка подлинности. Мы работаем только с прозрачной историей владения.' 
  },
  { 
    title: 'Гарантия', 
    code: 'Собственные техцентры и высокоточное оборудование. Полный цикл сервисного обслуживания на базе официальных регламентов.' 
  }
]
</script>
