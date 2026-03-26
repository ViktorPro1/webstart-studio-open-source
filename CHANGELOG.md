# Changelog

Всі помітні зміни в проєкті WebStart Studio React App документовані в цьому файлі.

Формат базується на [Keep a Changelog](https://keepachangelog.com/uk/1.0.0/),
і проєкт дотримується [Semantic Versioning](https://semver.org/lang/uk/).

---

## [v4.7.0] - 2026-03-23

### Added

- Видалення користувачів з адмін-панелі (захист: founder не можна видалити, admin — з попередженням)
- Лічильник користувачів у вкладці "Користувачі" (всього / клієнтів / адмінів / засновник /заблокованих)
- Форум: додано підтримку ролі `founder` — відображається бейдж «🚀 Засновник», окремий стиль аватара; виправлено права на редагування та видалення тем і коментарів у `forum.js`

---

## [v4.6.0] - 2026-03-22

### Added

- Facebook Pixel (ID: 1570037057391515) додано в `client/index.html`
- Створено портфоліо компанії WebStart Studio в Meta Business Manager
- Pixel перевірено локально через Meta Pixel Helper — статус Active

---

## [4.5.0] - 2026-03-22

### Added — Логування, валідація env, Loading Skeleton 🛠️

- 📝 **Логування HTTP запитів** (`morgan`)
  - Кожен запит до сервера логується в термінал
  - Формат `dev` — метод, роут, статус, час відповіді

- 🔍 **Валідація env змінних при старті**
  - Перевірка наявності: `JWT_SECRET`, `JWT_REFRESH_SECRET`, `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `EMAIL_USER`, `EMAIL_PASS`
  - При відсутності будь-якої змінної — сервер не стартує і виводить які саме відсутні

- 💀 **Loading Skeleton на форумі**
  - Замість тексту "Завантаження..." — анімовані сірі блоки
  - Shimmer анімація

### Changed

- ♻️ `server/server.js` — підключено `morgan`, додано валідацію env
- ♻️ `client/src/pages/Forum/Forum.tsx` — skeleton замість тексту завантаження
- ♻️ `client/src/pages/Forum/Forum.css` — стилі `.forum-skeleton-card`, `.forum-skeleton-line`

### Technical

- Встановлено пакет: `morgan`

---

## [4.4.0] - 2026-03-22

### Added — Пагінація форуму та Error Boundary 🛡️

- 📄 **Пагінація на форумі**
  - Теми завантажуються по 10 за раз
  - Кнопки "← Попередня" та "Наступна →"
  - Лічильник сторінок "1 / 5"
  - `GET /api/forum/topics?page=1&limit=10` — підтримка пагінації на бекенді

- ⚠️ **Error Boundary**
  - Глобальний перехоплювач JS помилок
  - Замість білого екрану — зрозуміле повідомлення
  - Кнопка "Оновити сторінку"

### Changed

- ♻️ `server/routes/forum.js` — `GET /topics` повертає `{ topics, total, page, limit, totalPages }`
- ♻️ `client/src/pages/Forum/Forum.tsx` — підтримка пагінації, стани `currentPage` та `totalPages`
- ♻️ `client/src/App.tsx` — підключено `ErrorBoundary`

### Technical

- `client/src/components/ErrorBoundary/ErrorBoundary.tsx`
- Додано стилі `.forum-pagination`, `.forum-page-btn`, `.forum-page-info` в `Forum.css`

---

## [4.3.0] - 2026-03-22

### Added — Email верифікація та скидання паролю 📧

- 📧 **Email верифікація при реєстрації**
  - Після реєстрації на пошту надсилається лист з посиланням
  - Токен верифікації дійсний 24 години
  - `GET /api/auth/verify-email?token=...` — підтвердження email
  - Сторінка `/verify-email` — обробка посилання з листа
  - Колонки `verified`, `verification_token`, `verification_expires` в таблиці `users`

- 🔑 **Скидання паролю**
  - Сторінка `/forgot-password` — форма введення email
  - `POST /api/auth/forgot-password` — надсилання листа зі скиданням
  - `POST /api/auth/reset-password` — встановлення нового паролю
  - Сторінка `/reset-password` — форма введення нового паролю
  - Токен скидання дійсний 1 годину
  - Колонки `reset_token`, `reset_expires` в таблиці `users`
  - Посилання "Забули пароль?" в попапі логіну

### Changed

- ♻️ `server/utils/mailer.js` — додано `sendPasswordResetEmail`
- ♻️ `server/routes/auth.js` — додано роути верифікації та скидання паролю
- ♻️ `client/src/components/Header/Header.tsx` — посилання "Забули пароль?" у формі логіну
- ♻️ `client/src/routes/AppRoutes.tsx` — додано маршрути `/verify-email`, `/forgot-password`, `/reset-password`

### Technical

- `server/db/migrations/006_add_verified_to_users.sql`
- `server/db/migrations/007_add_verification_token.sql`
- `server/db/migrations/008_add_verification_expires.sql`
- `server/db/migrations/009_add_password_reset.sql`
- `server/db/migrations/010_add_reset_expires.sql`
- `client/src/pages/VerifyEmail/VerifyEmail.tsx`
- `client/src/pages/ForgotPassword/ForgotPassword.tsx`
- `client/src/pages/ResetPassword/ResetPassword.tsx`
- Встановлено пакет: `nodemailer`

---

## [4.2.0] - 2026-03-22

### Added — Security Layer 🔐

- 🛡️ **Rate Limiting** (`express-rate-limit`)
  - Логін: максимум 10 спроб за 15 хвилин з однієї IP
  - Реєстрація: максимум 5 акаунтів за годину з однієї IP
  - Відповідь `429 Too Many Requests` з повідомленням українською

- 🪖 **Helmet.js** — автоматичні HTTP security headers
  - Захист від XSS, clickjacking, MIME sniffing
  - Примусовий HTTPS (HSTS)
  - Content Security Policy

- ✅ **Input Validation** (`zod`)
  - Схема реєстрації: імʼя (2-50 символів), email формат, пароль (8-100 символів)
  - Схема логіну: email формат, пароль не порожній
  - Валідація відбувається до звернення до БД

- 🔄 **Refresh токени**
  - Access токен живе 15 хвилин (замість 7 днів)
  - Refresh токен живе 30 днів, зберігається в БД
  - `POST /api/auth/refresh` — оновлення access токена
  - `POST /api/auth/logout` — видалення refresh токена з БД
  - Автоматичне оновлення токена через axios interceptor в `api.js`
  - При невалідному refresh токені — редірект на головну

### Changed

- ♻️ `server/routes/auth.js` — додано rate limiting, zod валідацію, refresh токени
- ♻️ `server/server.js` — підключено `helmet()`
- ♻️ `client/src/api/api.js` — додано axios interceptors для авто-оновлення токена
- ♻️ `client/src/contexts/AuthContext.tsx` — збереження та очищення `refreshToken`
- ♻️ `logout` — тепер async, видаляє refresh токен з БД

### Technical

- `server/db/migrations/005_create_refresh_tokens.sql` — нова таблиця `refresh_tokens`
- `server/.env` — додано `JWT_REFRESH_SECRET`
- Встановлено пакети: `express-rate-limit`, `helmet`, `zod`

---

## [4.1.0] - 2026-03-15

### Added — WordPress розділ 🟦

- 🟦 **Новий розділ "WordPress розробка" в Sidebar**
  - Окремий блок між "Отримати проект" та "Додаткові можливості"
  - 6 нових сторінок з трьохфайловою структурою (`.tsx` + `.css` + `.mobile.css`)

- 📄 **`/wordpress/what-is` — Що таке WordPress** — аналогії для простого розуміння, що можна зробити на WP
- 📊 **`/wordpress/differences` — Чим відрізняється** — інтерактивна таблиця з вкладками (Лендінг / Портфоліо / Резюме)
- 👥 **`/wordpress/wp-for-whom` — Для кого підходить** — картки з фільтром "Підходить / Не підходить" (6 персон)
- 🖥 **`/wordpress/hosting` — Серверна частина** — accordion з цінами та аналогіями, порівняння Netlify vs WordPress
- ❓ **`/wordpress/faq` — Часті питання** — 9 питань accordion, CTA з посиланням на чат і контакти
- 🛠 **`/wordpress/in-progress` — Ми в процесі** — чесна сторінка про поточний статус напрямку, кроки розвитку, список перших користувачів

### Changed

- ♻️ `Sidebar.tsx` — додано секцію "WordPress розробка" з іконками `Globe`, `BarChart2`, `Users`, `Monitor`, `HelpCircle`, `RefreshCw`
- ♻️ `Sidebar.tsx` — назва розділу змінена з "WordPress-сайти" → "WordPress розробка"
- ♻️ `AppRoutes.tsx` — додано 6 lazy маршрутів під префіксом `/wordpress/`
- ♻️ `Breadcrumbs.tsx` — додано переклади WordPress сегментів, `wordpress` додано до `hiddenSegments` (прибирає "WordPress розробка" з крихт — показує лише "Головна › Назва сторінки")
- ♻️ `Breadcrumbs.tsx` — додано до `hiddenSegments`: `facebook-ads`, `google-ads`, `services`, `templates`, `generators`, `blog`, `international` — прибирає 404 для сегментів без власних сторінок
- ♻️ `pathToUkrainian` — додано переклади для всіх WordPress сегментів

### Fixed

- 🐛 `WordPressFAQ.tsx` — замінено `<a href>` на `<Link to>` в кнопках CTA — прибрано перезавантаження сторінки
- 🐛 `WordPressDifferences.css` — виправлено кольори таблиці: текст клітинок `#cecdcd` → `#444`, хедер явно `#fff`, колонка параметр `#3b3486`
- 🐛 `WordPressFAQ.mobile.css` — кнопки виходили за межі на 420px — додано `box-sizing: border-box`, `overflow: hidden`, зменшено padding
- 🐛 `Breadcrumbs.tsx` — сегмент `wordpress` генерував 404 посилання — прихований через `hiddenSegments`

### Technical

- 18 нових файлів у `client/src/pages/WordPress/` (6 папок × 3 файли)
- Всі WordPress сторінки мають `border-radius: 24px` + `overflow: hidden` на `.wp-page`
- Нижні кути `.wp-hero` заокруглені: `border-radius: 0 0 32px 32px`

---

### Added — Pricing оновлення 💰

- 💰 **Оновлений калькулятор цін `Pricing.tsx`**
  - Ціни підняті до ринкових (портфоліо від 2 500 грн, лендінг від 4 000 грн)
  - Опис обраного варіанту відображається під селектом
  - Додаткові опції тепер різні для кожного напрямку (`portfolio`, `resume`, `sites`, `adaptive`)
  - CTA кнопки після результату: "Заповнити бриф" та "Обговорити в чаті"
  - Ціни форматуються через `toLocaleString('uk-UA')` — `4 000 грн` замість `4000`
  - Виправлено баг `checked={checkboxValues['option-seo'] > 0}` → `checked={!!checkboxValues[opt.id]}`
  - Селект варіантів передає `index` замість `price` — правильно підтягує опис

- 🎨 **Оновлений `Pricing.css`**
  - Новий клас `.Pricing-optionDesc` — блок опису з фіолетовою смужкою зліва
  - `.Pricing-result` — тепер виглядає як картка з фоном і рамкою
  - `.Pricing-resultNote` — підпис "Фінальна ціна узгоджується після консультації"
  - `.Pricing-cta` + `.Pricing-ctaBtn` — кнопки після результату
  - Покращено стилі чекбоксів — `accent-color: #3b3486`

- 📱 **Оновлений `Pricing.mobile.css`**
  - Додано `@media (max-width: 420px)` з адаптацією всіх нових елементів

### Added — Backend & Databases Educational Section 📚

- 📚 **Новий освітній розділ "Бекенд та Бази даних"**
  - Окремий блок у сайдбарі між WordPress розробка та Додаткові можливості
  - 6 нових сторінок з трьохфайловою структурою (`.tsx` + `.css` + `.mobile.css`)

- 🖥 **`/backend/what-is` — Що таке бекенд** — аналогія з кафе, порівняння фронт/бек, функції бекенду
- 🗄 **`/backend/database` — Що таке база даних** — аналогія з бібліотекою, демо-таблиця, SQL vs NoSQL
- 🔗 **`/backend/how-it-works` — Як вони працюють разом** — покроковий flow, пояснення API, схема трьох шарів
- ⚙ **`/backend/when-needed` — Коли це потрібно сайту** — коли треба/не треба бекенд
- ❓ **`/backend/faq` — Часті питання** — 8 акордеон-питань
- 📖 **`/backend/learning` — Ми вивчаємо** — шлях від фронтенду до fullstack, освоєні технології

### Changed

- ♻️ `Sidebar.tsx` — додано секцію "Бекенд та Бази даних" з іконками `Server`, `Database`, `Link2`, `Cpu`, `HelpCircle`, `BookOpen`
- ♻️ `AppRoutes.tsx` — додано 6 lazy маршрутів під префіксом `/backend/`
- ♻️ `Breadcrumbs.tsx` — додано переклади backend сегментів, `backend` в `hiddenSegments`
- ♻️ `Sidebar.tsx` — логотип із червоним акцентом на слові `Start`

### Technical

- 18 нових файлів у `client/src/pages/Backend/` (6 папок × 3 файли)

### Added — Backend Status Guard & Graceful Degradation 🛡️

- 🛡️ **Система моніторингу доступності бекенду**
  - `src/backend-status/useBackendStatus.ts` — хук-синглтон для перевірки стану бекенду
  - Автоматичний пінг `/api/health` кожні 30 секунд
  - Таймаут запиту 5 секунд (AbortController)
  - Три стани: `checking` | `online` | `offline`
  - В dev режимі (`import.meta.env.DEV`) завжди повертає `online` — локальна розробка не блокується

- 🚧 **Сторінка-заглушка при недоступному бекенді**
  - `src/backend-status/ServiceUnavailable.tsx` — сторінка "Технічні роботи"
  - `src/backend-status/ServiceUnavailable.css` — стилі з підтримкою CSS змінних теми
  - Анімована іконка (пульсація)
  - Кнопки "На головну" та "Контакти"
  - Контактний email: webstartstudio978@gmail.com
  - Маршрут: `/service-unavailable`

- 🔒 **Оновлений ProtectedRoute**
  - `src/components/ProtectedRoute/ProtectedRoute.tsx` — додано проп `requiresBackend`
  - При `requiresBackend={true}` і офлайн бекенді → редірект на `/service-unavailable`
  - При `requiresBackend={true}` і статусі `checking` → рендерить `null` (без блимання)
  - Існуюча логіка `adminOnly` збережена без змін

- 🔧 **Бекенд**
  - `server/server.js` — підтверджено наявність `/api/health` ендпоінту

### Changed

- ♻️ `AppRoutes.tsx` — маршрути `/my-account`, `/messages`, `/user-permissions` обгорнуті в `<ProtectedRoute requiresBackend>`
- ♻️ `AppRoutes.tsx` — додано маршрут `/service-unavailable`
- ♻️ `.env` — додано змінну `VITE_API_URL` для гнучкого переключення між локальним та production бекендом

### Technical

- `src/backend-status/useBackendStatus.ts`
- `src/backend-status/ProtectedRoute.tsx` ← не використовується, логіка перенесена в `components/ProtectedRoute`
- `src/backend-status/ServiceUnavailable.tsx`
- `src/backend-status/ServiceUnavailable.css`
- `src/components/ProtectedRoute/ProtectedRoute.tsx` — оновлено
- `src/routes/AppRoutes.tsx` — оновлено

### Added — Database Sync, Migrations & User Management 🗄️

- 🗄️ **Система міграцій бази даних**
  - `server/db/migrations/` — папка для SQL міграційних файлів
  - `server/db/migrate.js` — скрипт автоматичного запуску міграцій
  - Таблиця `migrations` — відстеження виконаних міграцій
  - Автоматичний запуск міграцій при старті сервера (`start` скрипт)
  - `npm run migrate` — ручний запуск міграцій

- 🔗 **Синхронізація баз даних**
  - Локальна розробка підключена до Railway MySQL через публічний хост
  - Прод використовує внутрішній хост `mysql.railway.internal`
  - Єдина БД для локалки та продакшну
  - Railway Variables налаштовані через `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT`

- 🚫 **Система бану користувачів**
  - Колонка `banned TINYINT(1) DEFAULT 0` в таблиці `users`
  - `PATCH /api/admin/users/:id/ban` — ендпоінт бану/розбану
  - Кнопка "🚫 Заблокувати / 🔓 Розблокувати" в адмін-панелі
  - Візуальне відображення заблокованих користувачів (червоний бейдж, рожевий фон)
  - Аватар користувача з першою літерою імені

- 🌟 **Роль Засновник**
  - Додано роль `founder` до ENUM в таблиці `users`
  - Відображення `🌟 Засновник` в адмін-панелі

### Technical

- `server/db/migrations/001_add_banned_to_users.sql`
- `server/db/migrations/002_add_founder_role.sql`
- `server/db/migrations/003_set_founder_user.sql`
- `server/db/migrate.js` — migration runner
- `server/routes/admin.js` — додано `banned` в SELECT та новий PATCH роут
- `client/src/pages/Admin/AdminPanel.tsx` — UI для бану та ролі founder
- `client/src/pages/Admin/AdminPanel.css` — стилі для `.btn-ban`, `.btn-unban`, `.user-card`, `.banned-badge`

### Added — Access Control & Platform Structure 🔐

- 🔒 **Обмеження доступу для незареєстрованих**
  - Пакети та ціни доступні лише для авторизованих користувачів
  - Гість бачить загальну інформацію та лендінг
  - Зареєстрований клієнт отримує доступ до каталогу пакетів та цін
  - Умовний рендеринг на фронті залежно від стану авторизації (`isAuthenticated`)

- 🚫 **Розширення системи бану**
  - Перевірка `is_banned` в `authMiddleware` після верифікації JWT токена
  - Заблокований користувач отримує `403` з повідомленням про блокування
  - Адмін може банити/розбанювати через існуючу кнопку в адмін-панелі
  - Бан застосовується до всіх захищених роутів (форум, чат, кабінет)

- 👥 **Уточнення рольової структури**
  - `client` — доступ до форуму спільноти, чату з командою, особистого кабінету, пакетів та цін
  - `admin` — повний доступ до всіх розділів та адмін-панелі
  - `founder` — особлива роль засновника (додано в 4.1.0)
  - `banned` — обмежений доступ, блокується на рівні middleware

### Planned

- 🛡️ Роль `moderator` — управління форумом (видалення постів, бан користувачів)
- 📦 Каталог пакетів з прикладами робіт для зареєстрованих
- 💰 Калькулятор вартості
- ⭐ Відгуки клієнтів після завершення проекту
- 🖼️ Портфоліо виконаних робіт (резюме, лендінги, портфоліо)
- 🔔 Система сповіщень про зміни статусу замовлення
- 🔄 WebSocket для чату замість polling кожні 10 секунд

---

## [4.0.0] - 2026-02-25

### Added — Backend, Personal Cabinet & Community Forum 🚀

- 🔧 **Node.js + Express бекенд сервер**
  - REST API архітектура
  - Роути: `/api/auth`, `/api/client`, `/api/admin`, `/api/forum`
  - nodemon для автоматичного перезапуску в dev режимі
  - dotenv конфігурація (.env)
  - CORS налаштування для локального dev та production

- 🗄️ **MySQL база даних**
  - Таблиця `users` — зберігання користувачів з ролями (admin / client)
  - Таблиця `orders` — замовлення клієнтів зі статусами та нотатками
  - Таблиця `messages` — чат між клієнтами та командою
  - Таблиця `forum_topics` — теми форуму
  - Таблиця `forum_comments` — коментарі до тем
  - Таблиця `forum_reactions` — реакції (heart, thumbsup, handshake)

- 🔐 **Система авторизації**
  - JWT токени (jsonwebtoken)
  - bcrypt хешування паролів
  - authMiddleware — верифікація токена на захищених роутах
  - AuthContext — глобальний стан авторизації в React
  - Вхід / реєстрація через попап у Header

- 👤 **Особистий кабінет клієнта (/my-account)**
  - Перегляд власних замовлень зі статусами
  - Завантаження файлів за замовленнями
  - Захищений роут — тільки для авторизованих

- 👑 **Адмін-панель**
  - Вкладка замовлень: створення, редагування, видалення
  - Прив'язка замовлень до конкретних клієнтів
  - Список всіх клієнтів

- 💬 **Чат з командою (/messages)**
  - Окрема розмова для кожного клієнта
  - Адмін бачить список всіх клієнтів та відповідає у кожну розмову
  - Авто-оновлення кожні 10 секунд
  - Гість перенаправляється на сторінку повідомлень з пропозицією увійти

- 🗣 **Форум спільноти (/user-permissions)**
  - Публічний перегляд тем та коментарів (без реєстрації)
  - Створення тем та коментування тільки для зареєстрованих
  - Редагування та видалення власних записів
  - Адмін може редагувати та видаляти будь-який запис
  - 👑 Значок адміна та фіолетовий аватар на постах/коментарях
  - Фіолетова смужка зліва на коментарях від адміна
  - ❤️ 👍 🤝 Три типи реакцій — користувач обирає одну з трьох
  - Перемикання між реакціями (обрав іншу — попередня знімається)
  - Підрахунок кожного типу реакції окремо
  - Кнопка "← Назад до всіх тем" — яскрава фіолетова

- 🌐 **Breadcrumbs оновлено**
  - `user-permissions` → Форум спільноти
  - `messages` → Чат з командою
  - `privacy-policy` → Політика конфіденційності
  - `terms-of-use` → Умови використання

### Changed

- ♻️ Sidebar: "Чат з командою" завжди веде на `/messages` (без попапу)
- ♻️ Header: кнопки кабінету залежать від ролі (admin/client)
- ♻️ Messages.tsx: адмін бачить список клієнтів + повну розмову з кожним
- ♻️ Forum реакції: переписані з одного типу на 3 окремих з підрахунком

### Fixed

- 🐛 Виправлено зсув футера при відкритті попапу (scrollbar jump)
- 🐛 Виправлено ENUM помилку в `forum_reactions` — додано тип `thumbsup`
- 🐛 Виправлено `Cannot find module '../db'` — правильний шлях до `db/connection`
- 🐛 Виправлено `Cannot find module '../middleware/admin'` — видалено зайвий імпорт

### Technical

- `server/db/connection.js` — MySQL підключення через mysql2
- `server/middleware/auth.js` — authMiddleware + adminMiddleware
- `server/routes/auth.js` — реєстрація та вхід
- `server/routes/client.js` — роути для клієнта
- `server/routes/admin.js` — роути для адміна
- `server/routes/forum.js` — повний CRUD для форуму
- `client/src/contexts/AuthContext.tsx` — глобальний стан авторизації
- `client/src/api/api.ts` — axios інстанс з Bearer токеном
- `client/src/pages/Forum/Forum.tsx` — компонент форуму з CSS класами
- `client/src/pages/Forum/Forum.css` — всі стилі форуму
- `client/src/pages/Forum/Forum.mobile.css` — адаптив для 768px та 480px
- `client/src/pages/Messages/Messages.tsx` — чат клієнта та адмін-вид

---

## [Unreleased]

### Added - Vite Migration & ESLint Integration 🚀

- ⚡ **Міграція на Vite**
  - Vite 6.0.7 - швидкий build tool
  - @vitejs/plugin-react 4.3.4 - React плагін для Vite
  - Значно швидша розробка (HMR)
  - Швидший production build
  - Нативна підтримка ESM

- 🔍 **ESLint конфігурація**
  - ESLint 9.39.2 з flat config
  - @eslint/js 9.39.2
  - @eslint/compat 2.0.0
  - eslint-plugin-react 7.37.5
  - eslint-plugin-react-hooks 7.0.1
  - eslint-plugin-react-refresh 0.4.26
  - typescript-eslint 8.50.1
  - globals 16.5.0

- ✅ **Налаштовано правила ESLint**
  - Автоматична перевірка React hooks
  - Правила для TypeScript
  - Правила для React компонентів
  - Підтримка React Fast Refresh

- 🛠️ **Оновлено npm скрипти**
  - `npm run dev` / `npm start` - запуск dev сервера Vite
  - `npm run build` - production build з Vite
  - `npm run preview` - перегляд production build
  - `npm run typecheck` - перевірка TypeScript типів
  - `npm run lint` - перевірка коду ESLint
  - `npm run lint:fix` - автоматичне виправлення ESLint

- 🐛 **Виправлено помилки**
  - setState в useEffect (переведено на lazy initialization)
  - Видалено TypeScript any типи
  - Виправлено empty block statements
  - Math.random в рендері компонентів

### Changed

- ♻️ Перехід з Create React App на Vite
- ⚡ Покращена швидкість розробки та збірки
- 🔧 Оновлено конфігураційні файли (vite.config.ts)

### Removed

- ❌ Create React App залежності
- ❌ react-scripts

### Planned

- Завершення функціоналу AI Prompting
- Завершення функціоналу Personal Prompting
- Завершення функціоналу Create AI Agent
- Розділи веб-розробки (Landing, Portfolio, Resume, Corporate)
- Розділи дизайну (UI/UX, Logo, Branding)
- Повний функціонал Google Ads
- Facebook Ads модуль
- Tax Refund сервіси
- PC Cleaning сервіси
- Темна тема
- Unit та Integration тести з Jest та React Testing Library

---

## 📊 Аналітика та відстеження

Проект інтегровано з наступними сервісами аналітики:

### Google Analytics (GA4)

- **Measurement ID**: `G-XVSQYMRYWH`
- Відстеження переглядів сторінок
- Відстеження подій користувачів
- Анонімізація IP для відповідності GDPR

### Microsoft Clarity

- **Project ID**: [Project ID]
- Запис сесій користувачів
- Теплові карти (heatmaps)
- Аналіз поведінки відвідувачів

### Google Search Console

- Верифікація через HTML файл
- Моніторинг SEO показників
- Аналіз пошукового трафіку

### Cookie Consent

- Повідомлення про використання cookies
- Відповідність вимогам GDPR/CCPA
- Користувацька згода на збір даних

---

## 🔐 Безпека

Проект налаштовано з дотриманням сучасних стандартів безпеки:

### Security Headers

- **Content Security Policy (CSP)** - захист від XSS атак
- **X-Frame-Options** - захист від clickjacking
- **X-Content-Type-Options** - захист від MIME type sniffing
- **Strict-Transport-Security (HSTS)** - примусовий HTTPS
- **Referrer-Policy** - контроль передачі referrer інформації
- **Permissions-Policy** - обмеження доступу до API браузера

### Environment Variables

Конфіденційні дані зберігаються в `.env` файлі:

```bash
REACT_APP_GA4_MEASUREMENT_ID=your_ga_id
REACT_APP_CLARITY_ID=your_clarity_id
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

---

## [3.0.0] - 2025-01-04

### Added - Vite Migration & ESLint Integration

- ⚡ Vite 6.0.7 - швидкий build tool нового покоління
- @vitejs/plugin-react 4.3.4 - офіційний React плагін
- ESLint 9.39.2 з flat config
- Автоматична перевірка React hooks
- Правила для TypeScript та React компонентів

### Changed

- ♻️ Перехід з Create React App на Vite
- ⚡ Покращена швидкість розробки та збірки
- 🔧 Оновлено конфігураційні файли (vite.config.ts)

### Removed

- ❌ Create React App залежності
- ❌ react-scripts

### Fixed

- setState в useEffect (переведено на lazy initialization)
- Видалено TypeScript any типи
- Виправлено empty block statements
- Math.random в рендері компонентів

---

## [2.0.0] - 2024-12-26

### Added - TypeScript Migration 🎉

- 🔷 Повна міграція на TypeScript 4.9.5
- Tailwind CSS 4.1.17 інтеграція
- i18next 23.15.1 - мультимовність (UA + EN)
- React Icons 5.5.0 та Lucide React 0.263.1
- React Helmet Async 2.0.5 для SEO

### Changed

- ♻️ Всі `.jsx` файли мігровано на `.tsx`
- ♻️ Всі `.js` файли мігровано на `.ts`
- 📝 Додано інтерфейси та типи для компонентів
- 🎯 Покращено типобезпеку по всьому проєкту

### Technical

- Створено `tsconfig.json` з оптимальними налаштуваннями
- Додано папки `/src/types`, `/src/contexts`, `/src/utils`

### Breaking Changes

- Потрібна Node.js >= 14.x
- Потрібен TypeScript для розробки

---

## [1.0.0] - 2024-12-13

### Added

- 🎉 Початковий публічний реліз
- 🏠 Головна сторінка з інформацією про платформу
- 🧭 Повна навігаційна структура (Header, Sidebar, Footer)
- 📱 Адаптивний дизайн для всіх пристроїв
- 🔄 React Router v6 для SPA навігації
- 📝 Розділ Blog зі статтями
- 📄 Інформаційні сторінки (FAQ, Testimonials, тощо)

### Technical

- Create React App як основа проєкту
- React 18.x з функціональними компонентами
- React Router DOM 6.x
- Build конфігурація для Netlify

---

## [0.5.0] - 2024-11-20

### Added

- Базова структура проєкту
- Навігаційні компоненти (Header, Sidebar)
- Placeholder сторінки для основних розділів

---

## [0.1.0] - 2024-11-01

### Added

- Ініціалізація проєкту з Create React App
- Базова конфігурація
- Початковий README

---

## Типи змін

- `Added` - нові функції
- `Changed` - зміни існуючого функціоналу
- `Deprecated` - функції, що скоро будуть видалені
- `Removed` - видалені функції
- `Fixed` - виправлення багів
- `Security` - виправлення безпеки
- `Technical` - технічні зміни
- `Breaking Changes` - зміни, що порушують зворотну сумісність

---

## Посилання

[4.0.0]: https://github.com/ViktorPro1/webstart-studio-react-app/releases/tag/v4.0.0
[3.0.0]: https://github.com/ViktorPro1/webstart-studio-react-app/releases/tag/v3.0.0
[2.0.0]: https://github.com/ViktorPro1/webstart-studio-react-app/releases/tag/v2.0.0
[1.0.0]: https://github.com/ViktorPro1/webstart-studio-react-app/releases/tag/v1.0.0
[0.5.0]: https://github.com/ViktorPro1/webstart-studio-react-app/compare/v0.1.0...v0.5.0
[0.1.0]: https://github.com/ViktorPro1/webstart-studio-react-app/releases/tag/v0.1.0
