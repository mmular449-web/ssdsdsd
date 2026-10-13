(() => {
  'use strict';
  const DATA = window.SHOWCASE;
  const page = document.body.dataset.page;
  const root = page === 'portfolio' ? '' : '../';
  const assets = root + 'assets/';
  const cfg = page === 'portfolio' ? DATA.portfolio : DATA[page];
  const money = n => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';
  const e = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  const lines = s => String(s).split('\n').map(e).join('<br>');
  const arrow = '<svg class="arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
  const img = (name, alt, cls = '', hero = false) => `<img class='${cls}' src='${assets}img/${name}-800.webp' srcset='${assets}img/${name}-800.webp 800w, ${assets}img/${name}-1600.webp 1600w' sizes='${hero ? (page==='detailing' ? '100vw' : '(max-width:600px) 100vw, 45vw') : '(max-width:600px) 50vw, (max-width:1100px) 45vw, 25vw'}' alt='${e(alt)}' loading='${hero ? 'eager' : 'lazy'}' decoding='async' ${hero ? "fetchpriority='high'" : ''}>`;
  document.body.classList.add(page);
  if (cfg.accent) document.body.style.setProperty('--accent', cfg.accent);
  if (cfg.colors) Object.entries(cfg.colors).forEach(([key,value]) => document.body.style.setProperty('--'+key,value));

  function heroHeading() {
    const p = cfg.headline.split('\n').map(e);
    const idx = page === 'pastry' ? 1 : p.length - 1;
    const tag = page === 'portfolio' || page === 'detailing' ? 'span' : 'em';
    p[idx] = '<' + tag + '>' + p[idx] + '</' + tag + '>';
    return p.join('<br>');
  }
  function logoMarkup() { return cfg.logo ? '<img class="logo-image" src="' + e(root + cfg.logo) + '" alt="' + e(cfg.brand) + '">' : e(cfg.brand); }
  function header(links, action) {
    return `<header class='site-header'><nav class='site-nav' aria-label='Основная навигация'>
      <a class='brand' href='#main' aria-label='${e(cfg.brand)}, наверх'>${logoMarkup()}${cfg.tagline ? `<small>${e(cfg.tagline)}</small>` : ''}</a>
      <div class='nav-links' id='nav-links'>${links.map(([text, href]) => `<a href='${href}'>${text}</a>`).join('')}</div>
      <div class='nav-end'>${page !== 'portfolio' ? `<a class='demo-back' href='${root}index.html'>Портфолио</a>` : "<span class='demo-label'>Сайты & Telegram</span>"}${action}
      <button class='menu-toggle' aria-label='Открыть меню' aria-expanded='false' aria-controls='nav-links'><span></span><span></span></button></div>
    </nav></header>`;
  }
  function footer() {
    const raw = (page === 'portfolio' ? cfg.telegram : cfg.contact || '').replace(/^https:\/\/t\.me\//,'').replace(/^@/,'').trim();
    const studioLink = /^[A-Za-z0-9_]{5,32}$/.test(raw) ? '<a href="https://t.me/'+e(raw)+'" target="_blank" rel="noopener">Написать ↗</a>' : '';
    return `<footer class='site-footer'><div class='container'><div class='footer-top'><a class='brand' href='#main'>${logoMarkup()}</a><div class='footer-links'>${studioLink}${page === 'portfolio' ? "<a href='#projects'>Проекты</a><button class='text-link' data-contact style='background:none;border:0;padding:0'>Обсудить проект ↗</button>" : `<a href='${root}index.html'>Другие демонстрации ↗</a><a href='#main'>Наверх ↑</a>`}</div></div>
      <p class='footer-note'>${page === 'portfolio' ? 'Все представленные проекты — демонстрации, созданные для портфолио. Это вымышленные бренды, а не оплаченные клиентские кейсы. Фотографии — Unsplash.' : 'Демонстрационный проект: вымышленный бренд, ассортимент и цены для примера. Формы работают локально: заявки не отправляются, деньги не принимаются. Фотографии — Unsplash.'}</p>
      <div class='footer-bottom'><span>${page === 'portfolio' ? 'Independent digital · 2026' : 'Demonstration · 2026'}</span><a href='${root}ASSET_CREDITS.md'>Фото и шрифты ↗</a></div>
    </div></footer>`;
  }
  function serviceCard(s) {
    return `<article class='service-card'><div class='service-image'>${img(s.image, s.name)}<span>${e(s.tag)}</span></div><div class='service-body'><h3>${e(s.name)}</h3><p>${e(s.detail)}</p><div class='service-bottom'><div><strong>от ${money(s.price)}</strong><small>${e(s.time)}</small></div><button data-book='${s.id}' aria-label='Выбрать: ${e(s.name)}'>${arrow}</button></div></div></article>`;
  }
  function detailing() {
    return header([['Услуги', '#services'], ['Подход', '#process'], ['До / после', '#comparison']], "<button class='button small nav-cta' data-book='wash'>Записаться ↗</button>") + `
    <main id='main'>
      <section class='detail-hero'>
        ${img('car-dark', 'Спортивный автомобиль в полумраке студии', 'hero-media', true)}<div class='light-sweep' aria-hidden='true'></div>
        <div class='container hero-content'><p class='eyebrow'>${e(cfg.brand)} / демонстрация студии</p><h1>${heroHeading()}</h1><p class='lead'>${e(cfg.description)}</p><a class='button' href='#services'>Откройте новый блеск ${arrow}</a></div>
        <div class='hero-bottom'><a class='scroll-hint' href='#services'><span aria-hidden='true'>↓</span>Листайте, чтобы почувствовать</a><div class='hero-glass-note'><b>01—04</b><small>ЧИСТОТА · СИЯНИЕ<br>ЗАЩИТА · КОМФОРТ</small></div></div>
      </section>
      <section class='light-scene section' id='services'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Забота в каждой детали</p><h2>Больше, чем<br>просто чистота.</h2></div><p class='lead muted'>Выберите уход под ваш автомобиль. Посмотрите услуги и соберите пример заявки на запись.</p></div><div class='service-grid'>${cfg.services.map(serviceCard).join('')}</div><p class='fine-print' style='margin-top:25px'>Цены и длительность — демонстрационные. Итог реального ухода зависит от автомобиля и состояния поверхностей.</p></div></section>
      <section class='detail-stage' id='process'><div class='container'><div class='stage-intro reveal'><p class='eyebrow'>Свет раскрывает форму</p><h2>Сначала — внимание.<br>Потом — результат.</h2></div><div class='stage-layout'><div class='stage-visual'>${img('car-hero', 'Блики на кузове автомобиля', 'story-media')}<span class='image-label'>The art of care / FORMA</span></div><div class='stage-copy'>
        <article class='reveal'><span class='number'>01 / ПОВЕРХНОСТЬ</span><h3>Глубина цвета.</h3><p>Деликатная подготовка, работа с мелкими следами эксплуатации и финишная полировка. Красота, которую видно под любым углом.</p><span class='pill'>Полировка кузова</span></article>
        <article class='reveal'><span class='number'>02 / ОЩУЩЕНИЕ</span><h3>Тактильная чистота.</h3><p>Кожа, ткань, пластик. У каждого материала свой характер — и свой бережный способ ухода.</p><span class='pill'>Химчистка салона</span></article>
        <article class='reveal'><span class='number'>03 / ЗАБОТА</span><h3>Невидимая защита.</h3><p>Финишный слой, который завершает уход. Покрытие выбирают по задаче и состоянию автомобиля.</p><span class='pill'>Керамическое покрытие</span></article>
      </div></div></div></section>
      <section class='light-scene section' id='comparison'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Каждый блик имеет значение</p><h2>Разницу<br>можно увидеть.</h2></div><p class='lead muted'>Проведите границу между двумя состояниями кадра. Этот интерактивный блок можно наполнить настоящими фотографиями студии.</p></div>
        <div class='comparison' id='comparison-view'>${img('car-hero', 'Автомобиль — светлый вариант фотографии')}<div class='comparison-before'>${img('car-hero', 'Тот же кадр с приглушённым цветом')}</div><span class='compare-tag before'>До</span><span class='compare-tag after'>После</span><div class='compare-line'><span aria-hidden='true'>↔</span></div></div>
        <div class='comparison-tools'><label for='compare-range'>Двигайте ползунок</label><input id='compare-range' type='range' min='0' max='100' value='50' aria-label='Положение границы до и после'><output for='compare-range' id='compare-value'>50%</output></div><p class='fine-print'>Визуальное демо: один кадр с разной обработкой. Это не результат реальной работы и не обещание эффекта услуги.</p>
      </div></section>
      <section class='section'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Эстетика движения</p><h2>Форма. Свет.<br>Характер.</h2></div><p class='lead muted'>Фотогалерея демонстрирует подачу будущего портфолио студии. В реальном проекте здесь будут ваши работы.</p></div><div class='gallery-grid'>${img('car-dark', 'Автомобиль в студийном свете')}${img('car-detail', 'Спортивный автомобиль на открытом воздухе')}${img('car-hero', 'Детали кузова и отражения')}</div></div></section>
      <section class='section' style='padding-top:0' id='request'><div class='container'><div class='detail-invite reveal'><div><p class='eyebrow'>Следующий шаг</p><h2 style='margin-top:20px'>Ваш автомобиль.<br>Новый взгляд.</h2><p>Выберите услугу, укажите автомобиль и желаемую дату. Посмотрите, какой могла бы быть ваша заявка.</p></div><button class='button' data-book='wash'>Попробовать запись ${arrow}</button></div></div></section>
    </main>` + footer();
  }
  function productCard(p) {
    return `<article class='product-card'><button class='product-photo' data-product='${p.id}' aria-label='Открыть ${e(p.name)}'>${img(p.image, p.name)}<span class='product-tag'>${e(p.tag)}</span><span class='round-arrow' aria-hidden='true'>${arrow}</span></button><div class='product-info'><div class='name-price'><h3>${e(p.name)}</h3><strong>${money(p.price)}${p.unit ? `<small> / ${e(p.unit)}</small>` : ''}</strong></div><p>${e(p.description)}</p></div></article>`;
  }
  function flowers() {
    return header([['Букеты', '#catalog'], ['О студии', '#story'], ['Telegram-демо', '#telegram']], "<a class='button small nav-cta' href='#catalog'>Выбрать букет ↗</a>") + `
      <main id='main'><section class='container floral-hero'><div><p class='eyebrow'>${e(cfg.brand)} / демонстрация студии</p><h1>${heroHeading()}</h1><p class='lead muted'>${e(cfg.description)}</p><a class='button' href='#catalog'>Найти свой букет ${arrow}</a></div><div class='floral-image'>${img('flower-rose', 'Светлый букет роз с зеленью', '', true)}<span class='circle-seal' aria-hidden='true'>FLOWERS<br>FOR EVERY<br>FEELING</span><div class='floating-label'>${img('flower-hero', 'Нежная лилия')}<div><b>Маленький жест.<br>Большое чувство.</b><small>Цветы для вашего момента</small></div></div></div></section>
      <div class='container floral-footnotes'><p><span>01 / ВЫБОР</span>Букет под настроение</p><p><span>02 / ДЕТАЛИ</span>Открытка с вашими словами</p><p><span>03 / МОМЕНТ</span>Удобная дата получения</p></div>
      <section class='section' id='catalog'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Цветочные истории</p><h2 class='serif'>Собраны с чувством.</h2></div><p class='lead muted'>Для важных дней и обычных вторников. Выберите повод и бюджет — всё остальное начнётся с цветов.</p></div>
      <div class='filters'><div class='filter-chips' role='group' aria-label='Повод для букета'>${[['all','Все букеты'],['love','О любви'],['birthday','День рождения'],['just','Без повода']].map(([id,text]) => `<button class='filter-chip' data-occasion='${id}' aria-pressed='${id==='all'}'>${text}</button>`).join('')}</div><label class='budget-select'>Бюджет<select id='budget' aria-label='Бюджет букета'><option value='0'>Любой бюджет</option><option value='3000'>До 3 000 ₽</option><option value='5000'>До 5 000 ₽</option><option value='7000'>До 7 000 ₽</option></select></label></div>
      <p class='sr-only' id='catalog-status' role='status' style='position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)'></p><div class='product-grid' id='product-grid'>${cfg.products.map(productCard).join('')}</div></div></section>
      <section class='section' id='story' style='padding-top:0'><div class='container'><div class='floral-story reveal'><div class='story-image'>${img('flower-pink', 'Букет тюльпанов в мягком свете')}</div><div><p class='eyebrow'>Больше, чем цветы</p><h2 style='margin-top:20px'>Ваш способ<br>сказать главное.</h2><p>Букет — это продолжение вашего настроения. В демонстрационной студии можно выбрать цветочную историю, дату и добавить слова для открытки.</p><div class='tiny-steps'><div><b>01</b>Выберите букет</div><div><b>02</b>Добавьте детали</div><div><b>03</b>Посмотрите заявку</div></div></div></div></div></section>
      <section class='section' id='telegram' style='padding-top:0'><div class='container'><div class='bot-band reveal'><div><p class='eyebrow'>Ещё один способ</p><h2 style='margin-top:20px'>Та же забота.<br>В Telegram.</h2><p class='lead'>У каталога может быть свой Telegram-бот: покупатель выбирает букет и оставляет детали заказа прямо в привычном приложении.</p></div><div><a class='button' href='${e(DATA.portfolio.demoBot)}' target='_blank' rel='noopener'>Открыть Telegram-демо ${arrow}</a><p class='fine-print'>Это отдельный демонстрационный бот. Его доступность зависит от запуска демо; интерактивный сценарий на этом сайте доступен независимо.</p></div></div></div></section>
    </main>` + footer();
  }
  function pastry() {
    return header([['Коллекция', '#catalog'], ['Начинки', '#fillings'], ['Вдохновение', '#gallery']], "<button class='button small nav-cta' data-product='celebration'>Выбрать торт ↗</button>") + `
      <main id='main'><section class='container pastry-hero'><div><p class='eyebrow'>${e(cfg.brand)} / демонстрация ателье</p><h1>${heroHeading()}</h1><p class='lead muted'>${e(cfg.description)}</p><a class='button' href='#catalog'>Откройте коллекцию ${arrow}</a></div><div class='pastry-hero-image'>${img('cake-hero', 'Праздничный торт со сливочным кремом и ягодами', '', true)}<span class='circle-seal' aria-hidden='true'>A LITTLE<br>MORE<br>DELIGHT</span><div class='floating-label'><div><b>Вкус, который<br>становится моментом.</b><small>Ваша история · ваш десерт</small></div></div></div></section>
      <div class='container pastry-intro-line'><span>Внимание к текстурам</span><span>Любимые сочетания</span><span>Детали вашего праздника</span></div>
      <section class='section' id='catalog'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Коллекция ателье</p><h2 class='serif'>Повод улыбнуться.</h2></div><p class='lead muted'>Выберите десерт, любимую начинку и дату. Из небольших деталей складывается ваше особенное событие.</p></div><div class='product-grid'>${cfg.products.map(productCard).join('')}</div></div></section>
      <section class='section' id='fillings' style='padding-top:0'><div class='container'><div class='pastry-feature'><img src='${assets}img/cake-berry-800.webp' alt='Сливочные десерты с ягодами' loading='lazy'><div class='feature-copy'><p class='eyebrow'>Внутри — самое интересное</p><h2>Хороший вкус<br>начинается<br>с сочетания.</h2><p>Мягкая ваниль, глубокий шоколад или свежие ягоды. Попробуйте выбрать начинку для своего демонстрационного торта.</p><div class='filling-list'>${cfg.fillings.map(f => `<button data-filling='${e(f)}'>${e(f)}</button>`).join('')}</div></div></div></div></section>
      <section class='section' id='gallery' style='padding-top:0'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Вдохновение для вашего дня</p><h2 class='serif'>Красота в деталях.</h2></div><p class='lead muted'>Референсная галерея демонстрации. В проекте вашей кондитерской здесь будут фотографии ваших работ.</p></div><div class='pastry-gallery'>${img('cake-mini', 'Ягодные тарты на светлом столе')}${img('cake-hero', 'Торт с ягодным декором')}${img('cake-chocolate', 'Шоколадный торт с кремовыми деталями')}</div></div></section>
      <section class='section' style='padding-top:0'><div class='container'><div class='pastry-invite reveal'><p class='eyebrow' style='justify-content:center'>Ваш особенный повод</p><h2 style='margin-top:20px'>Осталось выбрать<br><em>любимый вкус.</em></h2><p>Начинка, вес, дата и несколько слов о празднике. Посмотрите, как просто собрать заявку.</p><button class='button' data-product='celebration'>Создать свой торт ${arrow}</button></div></div></section>
    </main>` + footer();
  }
  const projects = [
    { id:'detailing', cls:'car', num:'01', name:'Детейлинг-студия', title:'Услуги, которые<br>хочется рассмотреть.', description:'Кинематографичная подача, услуги с ценами, интерактивное сравнение и заявка на запись с выбором автомобиля.', tags:['Премиальный лендинг','Запись','До / после'], img:'car-dark', visual:DATA.detailing.brand },
    { id:'flowers', cls:'flower', num:'02', name:'Цветочная студия', title:'Букет — это<br>ещё и чувство.', description:'Каталог с подбором по поводу и бюджету. Выбор букета, доставки, даты и открытки в одном понятном сценарии.', tags:['Каталог','Подбор','Доставка'], img:'flower-rose', visual:DATA.flowers.brand },
    { id:'pastry', cls:'cake', num:'03', name:'Кондитерская', title:'Вкус начинается<br>с первого взгляда.', description:'Аппетитная коллекция, выбор начинки и веса, дата события и форма заявки под конкретный десерт.', tags:['Торты и десерты','Начинки','Конфигуратор'], img:'cake-hero', visual:DATA.pastry.brand }
  ];
  function portfolio() {
    const projectCards = projects.map(p => `<article class='project-card ${p.cls} reveal'><a class='project-visual screen-preview' href='${p.id}/' aria-label='Открыть демо: ${p.name}'><img src='previews/${p.id}-desktop.webp' alt='Снимок рабочего демо: ${e(p.name)}' loading='lazy' width='1440' height='1000'></a><div class='project-copy'><span class='project-index'>${p.num} / ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ</span><h3>${p.title}</h3><p>${p.description}</p><div class='project-tags'>${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class='button' href='${p.id}/'>Открыть демо ${arrow}</a></div></article>`).join('');
    return header([['Проекты','#projects'],['Что я делаю','#services'],['Стоимость','#prices']], "<button class='button small nav-cta' data-contact>Обсудить проект ↗</button>") + `
      <main id='main'><section class='container portfolio-hero'><div><p class='eyebrow'>${e(cfg.name)} / digital</p><h1>${heroHeading()}</h1><p class='lead muted'>${e(cfg.description)}</p><div class='hero-buttons'><a class='button' href='#projects'>Посмотреть проекты ${arrow}</a><button class='text-link' data-contact style='border-width:0 0 1px;background:transparent'>Обсудить вашу задачу ↗</button></div><div class='hero-meta'><span><b>03</b> интерактивных демо</span><span><b>Сайт + бот</b> под ваш бизнес</span></div></div><div class='portfolio-visual' aria-label='Превью трёх демонстрационных проектов'><div class='visual-sticker'>IDEAS<br>MADE<br>INTERACTIVE</div>${projects.map(p => `<a class='mini-browser ${p.cls}' href='${p.id}/' aria-label='Открыть демо ${p.name}'><div class='browser-bar'><i></i><i></i><i></i><small>${p.visual}</small></div>${img(p.img,p.name)}<span class='mini-title'>${p.cls==='car'?'Совершенство.<br>В деталях.':p.cls==='flower'?'Для чувств,<br>которым тесно<br>в словах.':'Маленькое<br>искусство.'}</span></a>`).join('')}</div></section>
      <div class='container portfolio-intro'><span>ОТ ИДЕИ ДО ПОНЯТНОГО РЕШЕНИЯ</span><p>Я делаю небольшие сайты и Telegram-ботов для малого бизнеса. Ниже — работающие демонстрации, которые можно попробовать, а затем адаптировать под вашу задачу.</p></div>
      <section class='section' id='projects'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Не картинки. Рабочие примеры.</p><h2>Попробуйте<br>сами.</h2></div><p class='lead muted'>Три разных характера. Один принцип: красиво, понятно и удобно на телефоне.</p></div><div class='project-list'>${projectCards}</div></div></section>
      <section class='section' id='services' style='padding-top:0'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Под вашу задачу</p><h2>Что можно сделать<br>для вашего бизнеса.</h2></div></div><div class='capability-grid'>
        <article class='capability'><span class='cap-icon' aria-hidden='true'>⌘</span><h3>Сайт, который объясняет.</h3><p>Услуги, цены, фотографии и понятный способ связаться. Для студии, мастерской, магазина или небольшого сервиса.</p></article>
        <article class='capability'><span class='cap-icon' aria-hidden='true'>↗</span><h3>Бот, который помогает.</h3><p>Каталог, меню, сбор деталей заказа и уведомление владельцу. Привычный Telegram, удобный сценарий для покупателя.</p></article>
        <article class='capability'><span class='cap-icon' aria-hidden='true'>⊞</span><h3>Каталог с характером.</h3><p>Товары или услуги, фильтры и форма заявки. Ваши фото, ваши тексты, ваша подача — вместо безличного шаблона.</p></article>
      </div></div></section>
      <section class='section' id='prices' style='padding-top:0'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Понятный старт</p><h2>Небольшая задача.<br>Честная стоимость.</h2></div><p class='lead muted'>Пакеты для адаптации готовой основы. Один сайт или один бот — выбираем решение под вашу задачу.</p></div><div class='prices-grid'>
        <article class='price-card'><span class='plan'>01 / Старт</span><h3>от 2 000 ₽</h3><p>Небольшая страница или простое меню бота.</p><ul><li>До 4 блоков сайта или 3 разделов бота</li><li>Ваши тексты, фото и контакт</li><li>Адаптация под телефон</li><li>Один раунд правок</li></ul><button class='button secondary' data-contact>Обсудить старт ↗</button></article>
        <article class='price-card featured'><span class='plan'>02 / Заявки</span><h3>от 3 000 ₽</h3><p>Собрать нужные детали в одном сценарии.</p><ul><li>До 6 блоков сайта или один сценарий бота</li><li>Одна форма заявки</li><li>Уведомление в один Telegram-контакт*</li><li>Два раунда правок</li></ul><button class='button' data-contact>Обсудить заявки ↗</button></article>
        <article class='price-card'><span class='plan'>03 / Каталог</span><h3>от 5 000 ₽</h3><p>Простой каталог с выбором и заявкой.</p><ul><li>До 12 товаров или услуг</li><li>До двух параметров выбора</li><li>Один сценарий заявки</li><li>Краткая инструкция по обновлению</li></ul><button class='button secondary' data-contact>Обсудить каталог ↗</button></article>
      </div><p class='pricing-note'>Пакеты относятся к адаптации готового решения с вашими материалами. Домен, платный хостинг и дальнейшее обслуживание не входят. *Уведомление подключается при наличии доступного сервера или хостинга; его стоимость согласуется отдельно. Оплата на сайте, CRM, сложные интеграции и уникальный дизайн оцениваются отдельно. Итоговые объём, цена и срок — после обсуждения задачи.</p></div></section>
      <section class='section' style='padding-top:0'><div class='container'><div class='section-head reveal'><div><p class='eyebrow'>Без сложных слов</p><h2>Как всё проходит.</h2></div><p class='lead muted'>Небольшие понятные шаги. На каждом этапе вы видите, что получается.</p></div><div class='process-grid'>
        <article class='process-step'><span>01</span><h3>Обсуждаем</h3><p>Что нужно бизнесу, какие функции обязательны и что уже есть.</p></article><article class='process-step'><span>02</span><h3>Выбираем</h3><p>Подходящий пример, материалы, объём работы и стоимость.</p></article><article class='process-step'><span>03</span><h3>Проверяем</h3><p>Показываю рабочую версию. Проверяем телефон, кнопки и сценарий заявки.</p></article><article class='process-step'><span>04</span><h3>Передаю</h3><p>Готовые файлы и инструкцию. Публикацию и дальнейшую поддержку обсуждаем отдельно.</p></article>
      </div></div></section>
      <section class='section' id='about' style='padding-top:0'><div class='container'><div class='about-row reveal'><div><p class='eyebrow'>Кто стоит за проектом</p><h2 style='margin-top:20px'>Независимый.<br>Внимательный<br>к вашей задаче.</h2></div><div><p>Я независимый разработчик сайтов и Telegram-ботов. Использую ИИ как инструмент в разработке и проверяю, как работает готовое решение.</p><p>Эти три проекта созданы для демонстрации возможностей. Я не выдаю их за оплаченные заказы и не обещаю рост продаж — предлагаю понятное небольшое решение под вашу задачу.</p></div></div>
      <div class='faq-list'><details><summary>Можно изменить цвета, фотографии и ассортимент?</summary><p>Да. Название, палитра, фотографии, товары, услуги и цены заменяются под ваш бизнес. Для быстрого старта удобно использовать одну из готовых основ.</p></details><details><summary>Формы в демо действительно отправляют заявки?</summary><p>Нет. В демо заявка собирается только на экране, без отправки и оплаты. В рабочем проекте способ получения заявки подключается и проверяется отдельно.</p></details><details><summary>Сколько времени займёт небольшой проект?</summary><p>Срок зависит от объёма и готовности материалов. После короткого обсуждения я смогу оценить работу; окончательный срок фиксируется до начала заказа.</p></details><details><summary>Будет ли сайт работать на телефоне?</summary><p>Да. Каждая демонстрация адаптирована под мобильный экран. В готовом проекте также проверяются навигация, формы и фотографии.</p></details></div></div></section>
      <section class='section' id='contact' style='padding-top:0'><div class='container'><div class='contact-band reveal'><div><p class='eyebrow'>Начнём с вашей идеи</p><h2 style='margin-top:20px'>Какой проект нужен<br>вашему бизнесу?</h2><p>Расскажите, чем занимаетесь и какую задачу хотите решить. Выберем подходящий небольшой вариант.</p></div><button class='button' data-contact>Обсудить проект ${arrow}</button></div></div></section>
    </main>` + footer();
  }
  document.getElementById('app').innerHTML = ({portfolio, detailing, flowers, pastry}[page])() + "<dialog class='order-dialog' id='order-dialog' aria-labelledby='dialog-title'></dialog><div id='toast' role='status' aria-live='polite'></div>";
  const dialog = document.getElementById('order-dialog');
  const state = { selected: null, lastValues: null, occasion: 'all', budget: 0, filling: null };
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };
  const closeButton = "<button class='dialog-close' aria-label='Закрыть окно' data-close>×</button>";
  let toastTimer;
  function toast(text) { const box=document.getElementById('toast'); box.className='toast'; box.textContent=text; clearTimeout(toastTimer); toastTimer=setTimeout(()=>{box.className='';box.textContent='';},3000); }
  function openDialog() { document.body.classList.add('dialog-open'); if(!dialog.open) dialog.showModal(); }
  function closeDialog() { dialog.close(); document.body.classList.remove('dialog-open'); }
  dialog.addEventListener('cancel', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', ev => { if(ev.target===dialog) closeDialog(); });
  const option = (v, text, selected) => `<option value='${e(v)}' ${String(v)===String(selected)?'selected':''}>${e(text)}</option>`;
  const field = (label, html, wide = false) => `<label class='field ${wide?'wide':''}'>${label}${html}</label>`;
  function selectedItem(id) { return (page==='detailing'?cfg.services:cfg.products).find(p=>p.id===id) || (page==='detailing'?cfg.services:cfg.products)[0]; }
  function orderPrice(form) {
    const v = Object.fromEntries(new FormData(form));
    const item = selectedItem(v.product || v.service || state.selected);
    if(page==='detailing') return item.price * cfg.carClasses[Number(v.carclass||0)].factor;
    if(page==='pastry') return item.type==='dessert' ? item.price : item.price*Number(v.weight||1);
    return item.price+(v.method==='delivery'?(cfg.deliveryPrice??400):0);
  }
  function updateForm() {
    const form=dialog.querySelector('form'); if(!form) return;
    const v=Object.fromEntries(new FormData(form)); const item=selectedItem(v.product||v.service||state.selected);state.selected=item.id;
    const price=dialog.querySelector('#form-price-amount'); if(price) price.textContent=money(orderPrice(form));
    if(page==='flowers') { const address=form.elements.address;const wrap=address.closest('label');wrap.hidden=v.method!=='delivery';address.required=v.method==='delivery';address.disabled=v.method!=='delivery'; }
    if(page==='pastry') {const weight=form.elements.weight; weight.disabled=item.type==='dessert';dialog.querySelector('#weight-note').textContent=item.type==='dessert'?'Набор 6 штук, фиксированная цена':'Цена зависит от выбранного веса';}
    const preview=dialog.querySelector('.dialog-preview img');if(preview) { preview.src=assets+'img/'+item.image+'-800.webp';preview.removeAttribute('srcset');preview.alt=item.name; }
    const caption=dialog.querySelector('.preview-caption h3');if(caption)caption.textContent=item.name;
  }
  function showOrder(id, values = null, filling = null) {
    state.selected=id; state.lastValues=values; state.filling=filling || values?.filling || null;
    const item=selectedItem(id);
    let specific='';
    if(page==='detailing') specific=field('Услуга', `<select name='service' required>${cfg.services.map(p=>option(p.id,p.name,id)).join('')}</select>`,true)+field('Ваш автомобиль',"<input name='car' required maxlength='60' placeholder='Например, Porsche 911'>")+field('Класс автомобиля',`<select name='carclass'>${cfg.carClasses.map((c,i)=>option(i,c.name,0)).join('')}</select>`);
    if(page==='flowers') specific=field('Выбранный букет',`<select name='product'>${cfg.products.map(p=>option(p.id,p.name,id)).join('')}</select>`,true)+field('Как получить',"<select name='method'><option value='delivery'>Доставка</option><option value='pickup'>Самовывоз</option></select>")+field('Желаемое время',"<select name='time'><option>10:00–13:00</option><option>13:00–17:00</option><option>17:00–20:00</option></select>");
    if(page==='pastry') specific=field('Выбранный десерт',`<select name='product'>${cfg.products.map(p=>option(p.id,p.name,id)).join('')}</select>`,true)+field('Начинка',`<select name='filling'>${cfg.fillings.map(f=>option(f,f,state.filling||item.filling)).join('')}</select>`)+field('Вес, кг',`<select name='weight'>${[1,1.5,2,2.5,3].map(w=>option(w,w+' кг',1)).join('')}</select><small id='weight-note' style='display:block;font-weight:400;color:#76836d;margin-top:5px'></small>`);
    let end='';
    if(page==='flowers') end=field('Адрес для примера',"<input name='address' required maxlength='140' placeholder='Вымышленный адрес доставки'>",true)+field('Текст открытки',"<textarea name='note' maxlength='300' placeholder='Ваши слова для получателя'></textarea>",true);
    else end=field(page==='pastry'?'Пожелания к оформлению':'Комментарий',`<textarea name='note' maxlength='300' placeholder='${page==='pastry'?'Цвета, надпись или повод для праздника':'Что важно учесть?'}'></textarea>`,true);
    dialog.innerHTML=closeButton+`<div class='dialog-layout'><aside class='dialog-preview'>${img(item.image,item.name)}<div class='preview-caption'><span class='eyebrow'>${e(cfg.brand)}</span><h3>${e(item.name)}</h3><p>${e(item.description||item.detail)}</p></div></aside><div class='dialog-content'><span class='local-badge'>ДЕМО · БЕЗ ОТПРАВКИ</span><h2 id='dialog-title'>${page==='detailing'?'Выберите ваш уход.':page==='flowers'?'Ваш цветочный момент.':'Ваш особенный десерт.'}</h2><p class='dialog-intro'>Попробуйте сценарий на вымышленных данных. Заявка появится только на этом экране — никто её не получит.</p><form id='demo-order'><div class='form-grid'>${specific}${field(page==='flowers'?'Дата доставки / получения':'Желаемая дата',`<input name='date' type='date' min='${today()}' required>`)}${field('Имя для примера',"<input name='name' required maxlength='60' placeholder='Анна'>")}${field('Телефон или @Telegram для примера',"<input name='contact' required maxlength='40' placeholder='@demo_client' autocomplete='off'>",true)}${end}</div><div class='form-price'><small>Демо-расчёт${page==='flowers'?'<br>Доставка в примере: '+money(cfg.deliveryPrice??400):''}</small><strong id='form-price-amount'></strong></div><button class='button form-submit' type='submit'>Показать демо-заявку ${arrow}</button><p class='fine-print'>Без отправки, оплаты и сохранения данных. Наличие товара и доступность даты в демонстрации не проверяются.</p></form></div></div>`;
    if(values) for(const [key,value] of Object.entries(values)) {const el=dialog.querySelector('form').elements.namedItem(key);if(el)el.value=value;}
    updateForm();openDialog();
  }
  function showContact() {
    const contact=DATA.portfolio;
    const handle=contact.telegram.trim().replace(/^@/,'');
    if(handle && /^[A-Za-z0-9_]{5,32}$/.test(handle)) { window.open('https://t.me/'+handle,'_blank','noopener'); return; }
    dialog.innerHTML=closeButton+"<div class='contact-dialog'><span class='local-badge'>ДАВАЙТЕ ОБСУДИМ</span><h2 id='dialog-title'>Расскажите о вашей задаче.</h2><p>В этой версии портфолио контакт ещё не опубликован. Ответьте на сообщение, с которым вам прислали эту ссылку: какой сайт или бот нужен вашему бизнесу?</p><button class='button' data-close>Понятно ↗</button></div>";openDialog();
  }
  function filterProducts() {
    const products=cfg.products.filter(p => (state.occasion==='all'||p.occasion.includes(state.occasion))&&(!state.budget||p.price<=state.budget));
    document.getElementById('product-grid').innerHTML=products.length?products.map(productCard).join(''):"<div class='empty-state'><h3 class='serif'>Для этих условий букета нет.</h3><p class='muted'>Попробуйте другой повод или увеличьте бюджет.</p><button class='button secondary' data-reset-filter>Показать все букеты</button></div>";
    document.getElementById('catalog-status').textContent=products.length+' букетов по вашим условиям';
    document.querySelectorAll('[data-occasion]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.occasion===state.occasion)));
  }
  document.addEventListener('click', ev => {
    const b=ev.target.closest('button,a');if(!b)return;
    if(b.hasAttribute('data-close')) closeDialog();
    if(b.hasAttribute('data-contact')) showContact();
    if(b.hasAttribute('data-book')) showOrder(b.dataset.book);
    if(b.hasAttribute('data-product')) showOrder(b.dataset.product);
    if(b.hasAttribute('data-filling')) showOrder('celebration',null,b.dataset.filling);
    if(b.hasAttribute('data-occasion')) {state.occasion=b.dataset.occasion;filterProducts();}
    if(b.hasAttribute('data-reset-filter')) {state.occasion='all';state.budget=0;document.getElementById('budget').value='0';filterProducts();}
    if(b.classList.contains('menu-toggle')) { const nav=b.closest('.site-nav');const open=nav.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню'); }
    if(b.closest('.nav-links')) { document.querySelector('.site-nav').classList.remove('menu-open');const t=document.querySelector('.menu-toggle');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Открыть меню'); }
    if(b.hasAttribute('data-edit-order')) showOrder(state.selected,state.lastValues);
    if(b.hasAttribute('data-copy-order')) {const text=dialog.querySelector('pre').textContent; const status=dialog.querySelector('.copy-status');if(!navigator.clipboard){status.textContent='Копирование недоступно — выделите текст заявки.';return;} navigator.clipboard.writeText(text).then(()=>{status.textContent='Пример скопирован. Отправки не было.'},()=>{status.textContent='Копирование недоступно — выделите текст заявки.'});}
  });
  document.addEventListener('change', ev => { if(ev.target.id==='budget'){state.budget=Number(ev.target.value);filterProducts();} if(ev.target.closest('#demo-order'))updateForm();});
  dialog.addEventListener('input', ev => { if(ev.target.name==='contact')ev.target.setCustomValidity('');});
  dialog.addEventListener('submit', ev => {
    const form=ev.target;if(form.id!=='demo-order')return;ev.preventDefault();
    const values=Object.fromEntries(new FormData(form));const contact=values.contact.trim();const digits=contact.replace(/\D/g,'');const valid=/^@[A-Za-z0-9_]{5,32}$/.test(contact)||(/^\+?[\d ()-]+$/.test(contact)&&digits.length>=10&&digits.length<=15);
    form.elements.contact.setCustomValidity(valid?'':'Укажите @username или телефон из 10–15 цифр.');
    if(!form.reportValidity())return;
    state.lastValues=values;state.selected=values.product||values.service;const item=selectedItem(state.selected);
    const date=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric'}).format(new Date(values.date+'T12:00:00'));
    const parts=['ДЕМОНСТРАЦИОННАЯ ЗАЯВКА',cfg.brand,'',page==='detailing'?'Услуга: '+item.name:'Выбор: '+item.name];
    if(page==='detailing')parts.push('Автомобиль: '+values.car,'Класс: '+cfg.carClasses[Number(values.carclass)].name);
    if(page==='flowers')parts.push('Получение: '+(values.method==='delivery'?'Доставка':'Самовывоз'),'Время: '+values.time, ...(values.address?['Адрес: '+values.address]:[]));
    if(page==='pastry')parts.push('Начинка: '+values.filling,item.type==='dessert'?'Количество: набор 6 шт.':'Вес: '+values.weight+' кг');
    parts.push('Дата: '+date,'Имя: '+values.name,'Контакт: '+contact,...(values.note?['Пожелания: '+values.note]:[]),'','Демо-стоимость: '+money(orderPrice(form)),'','Это пример на экране. Заявка не отправлена, данные не сохранены.');
    dialog.innerHTML=closeButton+"<div class='success-panel'><span class='success-icon' aria-hidden='true'>✓</span><span class='local-badge'>ТОЛЬКО ДЕМОНСТРАЦИЯ</span><h2 id='dialog-title'>Так выглядит ваша заявка.</h2><p>Вы прошли сценарий заказа. В рабочем проекте здесь можно подключить отправку владельцу — в этом демо её нет.</p><pre tabindex='0'></pre><div class='success-actions'><button class='button' data-copy-order>Скопировать пример ↗</button><button class='button secondary' data-edit-order>Изменить детали</button></div><p class='copy-status' role='status'></p></div>";
    dialog.querySelector('pre').textContent=parts.join('\n');dialog.scrollTop=0;dialog.querySelector('h2').setAttribute('tabindex','-1');dialog.querySelector('h2').focus();
  });
  const slider=document.getElementById('compare-range');if(slider)slider.addEventListener('input',()=>{document.getElementById('comparison-view').style.setProperty('--position',slider.value+'%');document.getElementById('compare-value').value=slider.value+'%';});
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const ob=new IntersectionObserver(entries=>{entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('is-visible');ob.unobserve(x.target);}});},{threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>ob.observe(el));
    if(page==='detailing'){const hero=document.querySelector('.detail-hero .hero-media');let queued=false;window.addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{hero.style.transform='translateY('+Math.min(window.scrollY*.12,100)+'px) scale(1.09)';queued=false;});},{passive:true});}
  }
})();
