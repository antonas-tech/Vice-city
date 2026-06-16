# Topzol Adler — Landing Page

Премиальный landing page для элитного компьютерного клуба **Topzol Adler**
на первой береговой линии Черного моря (Адлер / Сочи).

Frontend-only проект: backend, база данных и реальная оплата не подключены.
Форма бронирования работает как mock с валидацией и success-состоянием.

## Стек

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 3**
- **Framer Motion** — анимации
- **Lucide React** — иконки
- Шрифты: **Unbounded** (заголовки) + **Manrope** (текст), Google Fonts

## Запуск

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev
# откроется на http://localhost:5173

# 3. Production-сборка
npm run build

# 4. Локальный просмотр сборки
npm run preview
```

## Структура проекта

```
src/
├── components/        # переиспользуемые UI-компоненты
│   ├── Badge.tsx
│   ├── BookingForm.tsx    # mock-форма брони с валидацией и success state
│   ├── Button.tsx         # кнопка с magnetic hover
│   ├── FAQAccordion.tsx
│   ├── FloatingCTA.tsx    # плавающие кнопки «Бронь» и «Позвонить»
│   ├── GalleryGrid.tsx    # галерея + lightbox-модалка
│   ├── GameTicker.tsx     # бегущая строка с играми
│   ├── GlassCard.tsx
│   ├── Header.tsx         # sticky header + мобильное меню
│   ├── PricingCard.tsx
│   ├── Reveal.tsx         # fade-up появление секций
│   ├── ScrollProgress.tsx # индикатор прокрутки сверху
│   ├── SectionTitle.tsx
│   ├── StatCounter.tsx    # анимированные счетчики
│   ├── ZoneTabs.tsx       # tabs с анимированным индикатором
│   └── icons.ts
├── data/
│   └── site.ts        # ВЕСЬ контент: цены, залы, FAQ, контакты
├── sections/          # секции лендинга
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Zones.tsx
│   ├── Pricing.tsx
│   ├── Booking.tsx
│   ├── Gallery.tsx
│   ├── Offers.tsx
│   ├── WhyUs.tsx
│   ├── Faq.tsx
│   ├── Contacts.tsx
│   └── Footer.tsx
├── App.tsx
├── index.css          # Tailwind + glass/neon утилиты
└── main.tsx
```

## Как редактировать контент

Все тексты, цены, характеристики залов, FAQ и контакты лежат в одном файле —
[`src/data/site.ts`](src/data/site.ts). Изменения там автоматически
подхватываются всеми секциями.

## Как заменить placeholder-фото в галерее

Карточки галереи сейчас рисуются градиентами. Чтобы подставить реальные фото:

1. Положите изображения в `src/assets/` или `public/`.
2. В `src/data/site.ts` добавьте к элементам `GALLERY` поле `image: "/photo.jpg"`.
3. В `src/components/GalleryGrid.tsx` в компоненте `GalleryVisual` замените
   градиентный фон на `<img src={item.image} … />`.

## Контакты клуба

- Адрес: Адлер, ул. Бестужева 1/1, 2 этаж (рядом с «Вкусно и точка»)
- Телефон: +7 (918) 638-20-10
- Режим работы: 24/7
