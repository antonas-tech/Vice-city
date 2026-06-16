export const CLUB = {
  name: "Topzol Adler",
  tagline: "Gaming Club · Adler",
  phone: "+7 (918) 638-20-10",
  phoneHref: "tel:+79186382010",
  address: "ул. Бестужева 1/1, 2 этаж",
  addressNote: "рядом с «Вкусно и точка»",
  city: "Адлер · Сочи",
  schedule: "24/7, каждый день",
  mapsHref:
    "https://yandex.ru/maps/?text=" +
    encodeURIComponent("Адлер, ул. Бестужева 1/1 Topzol"),
} as const;

export const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Залы", href: "#zones" },
  { label: "Прайс", href: "#pricing" },
  { label: "Галерея", href: "#gallery" },
  { label: "Бронь", href: "#booking" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const HERO_BADGES = [
  "24/7",
  "1-я береговая линия",
  "RTX Gaming",
  "VIP-зал",
  "PS5 Zone",
] as const;

export const GAME_TICKER = [
  "CS2",
  "Dota 2",
  "Valorant",
  "Fortnite",
  "GTA V",
  "FC25",
  "UFC 5",
  "MK1",
  "Tekken 8",
  "Apex Legends",
  "PUBG",
  "World of Tanks",
] as const;

export type Feature = {
  icon: string;
  title: string;
  text: string;
};

export const FEATURES: Feature[] = [
  {
    icon: "waves",
    title: "Первая береговая линия",
    text: "Играйте в нескольких минутах от Черного моря — уникальная атмосфера Адлера.",
  },
  {
    icon: "clock",
    title: "Работаем 24/7",
    text: "Днем, вечером или ночью — клуб открыт каждый день без выходных.",
  },
  {
    icon: "cpu",
    title: "Мощное железо",
    text: "RTX-видеокарты, быстрые процессоры, мониторы до 380 Гц и премиальная периферия.",
  },
  {
    icon: "crown",
    title: "VIP-зал",
    text: "Отдельное пространство для тех, кто хочет максимум комфорта и производительности.",
  },
  {
    icon: "gamepad",
    title: "PS5 Zone",
    text: "Топовые игры на PlayStation 5: FC25, UFC 5, MK1, Tekken 8, GTA V и многое другое.",
  },
  {
    icon: "sparkles",
    title: "Комфорт и чистота",
    text: "Уютная атмосфера, отзывчивый персонал, напитки и порядок в каждой зоне.",
  },
];

export type ZoneId = "standart" | "vip" | "ps5";

export type Zone = {
  id: ZoneId;
  label: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  accent: "cyan" | "purple" | "pink";
};

export const ZONES: Zone[] = [
  {
    id: "standart",
    label: "Standart",
    title: "Standart Zone",
    description:
      "Основной зал для комфортной игры, тренировок, каток с друзьями и ночных сессий.",
    specs: [
      { label: "Игровые ПК", value: "24 места" },
      { label: "Процессор", value: "Конфигурации на базе Ryzen 5 / i5" },
      { label: "Видеокарта", value: "NVIDIA RTX 3060 Ti" },
      { label: "Мониторы", value: "Dell Alienware 240 Гц" },
      { label: "Наушники", value: "HyperX Cloud Core 2" },
      { label: "Мышь", value: "Ardor Fury Pro" },
      { label: "Клавиатура", value: "Zet Gaming Edge" },
    ],
    highlights: ["24 ПК", "240 Гц", "RTX 3060 Ti"],
    accent: "cyan",
  },
  {
    id: "vip",
    label: "VIP",
    title: "VIP Zone",
    description:
      "Отдельный зал для тех, кто хочет максимум FPS, больше приватности и премиальный комфорт.",
    specs: [
      { label: "Игровые ПК", value: "5 мест" },
      { label: "Процессор", value: "Intel Core i5 14-го поколения" },
      { label: "Видеокарта", value: "NVIDIA RTX 4060 Ti" },
      { label: "Мониторы", value: "ASUS ROG 380 Гц на кронштейнах" },
      { label: "Наушники", value: "HyperX Cloud Core 2" },
      { label: "Мышь", value: "Logitech Pro Wireless / HyperX Pulsefire Surge" },
      { label: "Клавиатура", value: "HyperX Alloy Origins 65" },
      { label: "Кресла", value: "DxRacer" },
    ],
    highlights: ["5 ПК", "380 Гц", "RTX 40-series", "DxRacer"],
    accent: "purple",
  },
  {
    id: "ps5",
    label: "PS5 Zone",
    title: "PS5 Zone",
    description:
      "Консольная зона для спортивных симуляторов, файтингов, кооператива и вечеринок с друзьями.",
    specs: [
      { label: "Консоли", value: "3 × PlayStation 5" },
      {
        label: "Игры",
        value:
          "FC25, UFC 5, Mortal Kombat 1, Tekken 8, NHL25, NBA25, GTA V, Fortnite, It Takes Two и другие новинки",
      },
    ],
    highlights: ["3 консоли", "Топовые игры", "Для компании"],
    accent: "pink",
  },
];

export type PricePlan = {
  id: ZoneId;
  label: string;
  name: string;
  description: string;
  specs: string[];
  hourPrice: number;
  packages: { name: string; note?: string; price: number; accent?: boolean }[];
  badge?: string;
  premium?: boolean;
  accent: "cyan" | "purple" | "pink";
};

export const PRICING: PricePlan[] = [
  {
    id: "standart",
    label: "Standart",
    name: "STANDART",
    description: "Комфортная катка в основном зале — баланс цены и мощности.",
    specs: [
      "Intel Core i5-12400F",
      "RTX 3060 Ti",
      "Монитор 240 Гц",
      "HyperX Cloud Core 2",
      "Ardor Fury Pro",
      "Zet Gaming Edge",
    ],
    hourPrice: 150,
    packages: [
      { name: "Пакет «3 часа»", price: 400 },
      { name: "Пакет «5 часов»", price: 600 },
      {
        name: "Ночь · 10 часов",
        note: "с 22:00 до 08:00",
        price: 700,
        accent: true,
      },
    ],
    badge: "Best for friends",
    accent: "cyan",
  },
  {
    id: "vip",
    label: "VIP",
    name: "VIP",
    description: "Максимум FPS, приватность и премиальный комфорт.",
    specs: [
      "Intel Core i5 14-го поколения",
      "RTX 40-series",
      "ASUS ROG 380 Гц",
      "HyperX Cloud Core 2",
      "HyperX / Logitech игровая мышь",
      "HyperX Alloy Origins 65",
      "Кресла DxRacer",
    ],
    hourPrice: 250,
    packages: [
      { name: "Пакет «3 часа»", price: 600 },
      { name: "Пакет «5 часов»", price: 1000 },
      {
        name: "Ночь · 10 часов",
        note: "с 22:00 до 08:00",
        price: 1200,
        accent: true,
      },
    ],
    badge: "Most popular",
    premium: true,
    accent: "purple",
  },
  {
    id: "ps5",
    label: "TV / PS5",
    name: "TV / PS5",
    description:
      "FC25, MK1, UFC 5, Tekken 8, GTA V, Fortnite, It Takes Two и многое другое.",
    specs: [
      "PlayStation 5",
      "Большой TV-экран",
      "2 геймпада DualSense",
      "Топовые новинки и спортсимы",
    ],
    hourPrice: 350,
    packages: [
      { name: "Пакет «3 часа»", price: 850 },
      { name: "Пакет «5 часов»", price: 1200 },
    ],
    badge: "Party zone",
    accent: "pink",
  },
];

export const BOOKING_PACKAGES = [
  "1 час",
  "3 часа",
  "5 часов",
  "Ночь 10 часов",
] as const;

export type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
};

export const GALLERY: GalleryItem[] = [
  {
    id: "main-hall",
    title: "Main Hall",
    subtitle: "24 игровых ПК · 240 Гц",
    gradient: "from-cyan-500/40 via-blue-600/30 to-night-900",
  },
  {
    id: "vip-room",
    title: "VIP Room",
    subtitle: "Приватный зал · 380 Гц",
    gradient: "from-purple-500/40 via-fuchsia-600/25 to-night-900",
  },
  {
    id: "ps5-zone",
    title: "PS5 Zone",
    subtitle: "3 консоли · топовые игры",
    gradient: "from-pink-500/40 via-rose-600/25 to-night-900",
  },
  {
    id: "drinks-bar",
    title: "Drinks Bar",
    subtitle: "Прохладительные напитки",
    gradient: "from-amber-400/35 via-orange-600/20 to-night-900",
  },
  {
    id: "night-gaming",
    title: "Night Gaming",
    subtitle: "Ночные сессии до утра",
    gradient: "from-indigo-500/40 via-violet-700/25 to-night-900",
  },
  {
    id: "sea-line",
    title: "Sea Line Adler",
    subtitle: "Черное море в паре минут",
    gradient: "from-teal-400/40 via-cyan-700/25 to-night-900",
  },
];

export type Offer = {
  icon: string;
  title: string;
  text: string;
  badge?: string;
};

export const OFFERS: Offer[] = [
  {
    icon: "moon",
    title: "Ночные пакеты",
    text: "10 часов игры с 22:00 до 08:00 по выгодной цене.",
    badge: "Night pack",
  },
  {
    icon: "users",
    title: "Для компаний",
    text: "Бронируйте несколько мест для друзей и отдыхайте вместе.",
    badge: "Squad up",
  },
  {
    icon: "trophy",
    title: "PS5 вечер",
    text: "Собирайтесь на турниры по FC25, UFC 5, MK1 и Tekken 8.",
    badge: "Limited",
  },
  {
    icon: "zap",
    title: "Постоянные акции",
    text: "Следите за предложениями клуба и уточняйте актуальные акции у администратора.",
  },
];

export const STATS = [
  { value: 24, suffix: "+", label: "ПК в Standart" },
  { value: 5, suffix: "", label: "ПК в VIP" },
  { value: 3, suffix: "", label: "PlayStation 5" },
  { value: 380, suffix: "Hz", label: "мониторы до" },
  { value: 0, suffix: "24/7", label: "режим работы" },
  { value: 1, suffix: "-я", label: "береговая линия" },
] as const;

export const AUDIENCE = [
  { icon: "target", title: "Соло-геймерам", text: "Полный фокус: мощный ПК, 240–380 Гц и тишина наушников." },
  { icon: "users", title: "Компаниям друзей", text: "Места рядом, катки 5×5 и общий вайб до утра." },
  { icon: "trophy", title: "Турнирам", text: "Площадка для каток, праков и локальных ивентов." },
  { icon: "moon", title: "Ночным сессиям", text: "Ночные пакеты 10 часов — играй, пока город спит." },
  { icon: "gamepad", title: "PS5-вечерам", text: "FC25, UFC 5 и файтинги на большом экране." },
] as const;

export const TRUST_BADGES = [
  "Чистота",
  "Комфорт",
  "Отзывчивый персонал",
  "Напитки",
  "Топовая периферия",
] as const;

export type FaqItem = { question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    question: "Нужно ли бронировать заранее?",
    answer:
      "Желательно, особенно вечером, ночью и для компании. Забронировать можно по телефону +7 (918) 638-20-10 или через форму на сайте.",
  },
  {
    question: "Клуб работает ночью?",
    answer: "Да, Topzol Adler работает каждый день 24/7 — без перерывов и выходных.",
  },
  {
    question: "Можно прийти компанией?",
    answer:
      "Да, можно забронировать несколько ПК или PS5-зону для друзей. Подберем места рядом, чтобы играть вместе.",
  },
  {
    question: "Какие игры есть на PS5?",
    answer:
      "FC25, UFC 5, MK1, Tekken 8, NHL25, NBA25, GTA V, Fortnite, It Takes Two и другие игры. Библиотека регулярно пополняется новинками.",
  },
  {
    question: "Есть ли напитки?",
    answer: "Да, в клубе есть большой выбор прохладительных напитков.",
  },
  {
    question: "Где находится клуб?",
    answer:
      "Адлер, ул. Бестужева 1/1, 2 этаж, рядом с «Вкусно и точка». Первая береговая линия Черного моря.",
  },
];
