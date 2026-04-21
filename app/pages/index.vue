<script setup>
const title = 'AXIS — Современный ритейлер часов'
const description = 'Эксклюзивная коллекция редчайших часов. Курируем поиск и аукционную покупку уникальных дизайнерских моделей. Инвестируйте в объекты, которые становятся историей.'
const siteUrl = 'https://axis-archive.vercel.app'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: `${siteUrl}/images/banner.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/images/banner.png`,
  ogType: 'website',
  ogUrl: siteUrl,
  ogLocale: 'ru_RU',
  robots: 'index, follow',
})

useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "AXIS",
        "description": description,
        "url": siteUrl,
        "image": `${siteUrl}/images/banner.png`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Moscow",
          "addressCountry": "RU"
        },
        "offers": {
          "@type": "AggregateOffer",
          "offerCount": "10",
          "priceCurrency": "USD"
        }
      })
    }
  ]
})
</script>
<template>
<main>
    <MainPageHero />
    <MainPageCollection id="articles"/>
    <LazyMainPageAbout id="about"/>
    <LazyMainPageContact id="contact"/>
</main>
    
</template>

<style scoped>
#articles,
#about,
#contact {
  scroll-margin-top: 64px;
}
</style>