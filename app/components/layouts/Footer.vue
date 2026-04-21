<template>
  <footer class="relative bg-[#070707] border-t border-white/5 pt-20 pb-10 overflow-hidden">
    
    <div class="absolute -bottom-10 -right-10 text-[20vw] font-black text-white/[0.01] select-none pointer-events-none uppercase leading-none tracking-tighter">
      Obsidian
    </div>

    <div class="relative z-10 container">
      <div class="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-0 mb-20">
        
        <div class="max-w-sm">
          
            <NuxtLink to="/" class="block mb-6" aria-label="AXIS — Вернуться на главную">
              <IconsLogo />
            </NuxtLink>
          
          
          
          <p class="text-[0.8rem] xl:text-[1.2rem] text-text-muted font-mono uppercase leading-relaxed tracking-wider">
            Архитектурное часовое искусство. <br />
            Разработано на стыке брутализма и технологий.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-12 lg:gap-24">
          
          <div class="flex flex-col gap-6">
            <span class="text-technical">Карта</span>
            <nav class="flex flex-col gap-3">
              <NuxtLink v-for="link in navigation" :key="link.name" :to="link.href" 
                class="text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text-main transition-colors">
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>

          <div class="flex flex-col gap-6">
            <span class="text-technical">Социальные сети</span>
            <nav class="flex flex-col gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.href" 
                class="text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-text-main transition-colors">
                {{ social.name }}
              </a>
            </nav>
          </div>

        </div>
      </div>

      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-[9px] font-mono text-text-muted uppercase tracking-[0.3em]">
          <span>© 2026 Obsidian Edition</span>
          <span class="hidden md:inline text-white/5">/</span>
          <span>By.Roni238</span>
          <span class="hidden md:inline text-white/5">/</span>
          <span class="italic text-white/40">Build_v4.4.2</span>
        </div>
        
        <div class="flex gap-8">
          <span v-for="item in legal" :key="item" 
            class="text-[9px] font-mono text-text-muted uppercase tracking-[0.3em] hover:text-accent-red cursor-pointer transition-colors">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigation = [
  { name: 'Коллекция', href: '#articles' },
  { name: 'О нас', href: '#about' },
  { name: 'Контакты', href: '#contact' }
]

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/' },
  { name: 'Telegram', href: 'https://web.telegram.org/' },
]

const legal = ['Privacy', 'Terms']
</script>
