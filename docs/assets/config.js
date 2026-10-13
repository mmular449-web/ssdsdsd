/* Replace only this file to adapt the demos. Contacts stay unpublished until you fill them. */
window.SHOWCASE = {
  portfolio: {
    brand: 'independent.', logo: '', name: 'Независимый разработчик',
    telegram: '', email: '',
    headline: 'Ваш бизнес.\nВ новом свете.',
    description: 'Сайты, которые приятно открыть. Боты, которыми удобно пользоваться. Делаю небольшие цифровые решения под ваш бизнес.',
    demoBot: 'https://t.me/LepestokDemo26Bot'
  },
  detailing: {
    brand: 'FORMA', logo: '', tagline: 'DETAILING STUDIO', accent: '#d5f6df',
    headline: 'Совершенство.\nВ деталях.',
    description: 'Уход за автомобилем, который чувствуется в каждой детали. От первого отражения до последнего штриха.',
    contact: '', city: 'Ваш город',
    colors: {},
    services: [
      { id: 'wash', name: 'Деликатная мойка', detail: 'Бережная очистка кузова, колёс и внешних деталей.', price: 3500, time: 'от 2 часов', tag: 'Чистота', image: 'car-hero' },
      { id: 'polish', name: 'Полировка кузова', detail: 'Обновление блеска и работа с мелкими следами эксплуатации.', price: 18000, time: 'от 1 дня', tag: 'Сияние', image: 'car-dark' },
      { id: 'ceramic', name: 'Защита керамикой', detail: 'Защитное покрытие и финишная подготовка поверхности.', price: 24000, time: 'от 1 дня', tag: 'Защита', image: 'car-detail' },
      { id: 'interior', name: 'Химчистка салона', detail: 'Деликатный уход за тканью, кожей и деталями интерьера.', price: 12000, time: 'от 8 часов', tag: 'Комфорт', image: 'car-dark' }
    ],
    carClasses: [{ name: 'Седан / купе', factor: 1 }, { name: 'Кроссовер', factor: 1.2 }, { name: 'Большой внедорожник', factor: 1.4 }]
  },
  flowers: {
    brand: 'les fleurs', logo: '', tagline: 'ЦВЕТОЧНАЯ СТУДИЯ', accent: '#304c3b',
    headline: 'Для чувств,\nкоторым тесно\nв словах.',
    description: 'Цветы, немного воздуха и много смысла. Соберите свой повод для улыбки.',
    contact: '', city: 'Ваш город',
    colors: {},
    products: [
      { id: 'garden', name: 'Тихий сад', price: 5900, description: 'Нежные розы и эвкалипт. Спокойная палитра и естественная форма.', image: 'flower-rose', occasion: ['love', 'birthday'], tag: 'Выбор студии' },
      { id: 'tulips', name: 'Первый свет', price: 3900, description: 'Букет тюльпанов — лёгкий, свежий и очень живой.', image: 'flower-pink', occasion: ['birthday', 'just'], tag: 'Сезонная история' },
      { id: 'lily', name: 'Тонкая линия', price: 2900, description: 'Минималистичная композиция с лилией для маленького знака внимания.', image: 'flower-hero', occasion: ['just', 'love'], tag: 'Минимализм' },
      { id: 'spring', name: 'Солнечный день', price: 4500, description: 'Жёлтые цветы и садовое настроение — для радости без повода.', image: 'flower-white', occasion: ['birthday', 'just'], tag: 'Яркий акцент' }
    ]
  },
  pastry: {
    brand: 'miette.', logo: '', tagline: 'АТЕЛЬЕ ДЕСЕРТОВ', accent: '#8b4437',
    headline: 'Маленькое\nискусство.\nБольшая радость.',
    description: 'Торты и десерты для тех самых моментов. Вкус, текстура и внимание к каждой детали.',
    contact: '', city: 'Ваш город',
    fillings: ['Ваниль и ягоды', 'Шоколад и карамель', 'Фисташка и малина', 'Лимон и сливочный крем'],
    products: [
      { id: 'celebration', name: 'Ягодное облако', price: 3200, unit: 'кг', image: 'cake-hero', description: 'Воздушная композиция с ягодами и сливочным кремом.', tag: 'Для важного дня', type: 'cake', filling: 'Ваниль и ягоды' },
      { id: 'chocolate', name: 'Шоколадный этюд', price: 3400, unit: 'кг', image: 'cake-chocolate', description: 'Глубокий шоколадный вкус и мягкие кремовые акценты.', tag: 'Классика ателье', type: 'cake', filling: 'Шоколад и карамель' },
      { id: 'berry', name: 'Сливочный момент', price: 1800, unit: 'набор 6 шт.', image: 'cake-berry', description: 'Порционные сливочные десерты со свежими ягодами.', tag: 'Маленькая радость', type: 'dessert', filling: 'Ваниль и ягоды' },
      { id: 'tart', name: 'Ягодная история', price: 2600, unit: 'кг', image: 'cake-mini', description: 'Хрустящее тесто, ягоды и уют домашнего праздника.', tag: 'К чаю', type: 'cake', filling: 'Лимон и сливочный крем' }
    ]
  }
};
