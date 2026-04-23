# AXIS

## Предпросмотр [https://estatein-rho.vercel.app/](https://axis-archive.vercel.app/)

## Начало работы

```
$ npm install
$ npm run dev
```

Стек - Nuxt + SSR, Embla carousel, Gsap, Tailwind, PostCss, Nuxt-icon, Nuxt-image, Nuxt-sitemap, Playwright

* Реализовал анимации через Gsap
* Сделаны e2e тесты на playwright
* Оптимизация всех изображений через Nuxt images, автоконвертация из любого формата в webp, + поддержка ретина дисплеев
* Заданы глобальные переменные для палитры и контейнера в tailwind конфиге
* Использовал tailwind классы для стилизации + @apply для создания собственных глобальных классов
* Postcss унифицирует css код, создает префиксы и чистит коментарии перед сборкой
* Lazy-loading`и, отложенная загрузка некоторых элементов и страницы
