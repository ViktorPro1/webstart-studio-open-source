# 🗂️ Структура проекту

Детальний опис структури файлів та папок проекту.

├── .github/ # Конфігурація GitHub (Actions, Workflows)
├── .vscode/ # Налаштування VS Code для проекту
├── dist/ # Скомпільована версія для production (автогенерація, Vite)
├── public/ # Статичні файли (favicon, зображення, robots.txt)
│
├── server/ # Node.js + Express бекенд (v4.0.0+)
│ ├── db/
│ │ ├── connection.js # Підключення до MySQL (mysql2)
│ │ ├── migrate.js # Скрипт автоматичного запуску міграцій (v4.1.0)
│ │ └── migrations/ # SQL міграційні файли
│ │ ├── 001_add_banned_to_users.sql
│ │ ├── 002_add_founder_role.sql
│ │ ├── 003_set_founder_user.sql
│ │ ├── 004_add_pinned_to_forum_topics.sql
│ │ ├── 005_create_refresh_tokens.sql # 🆕 v4.2.0 — таблиця refresh_tokens
│ │ ├── 006_add_verified_to_users.sql # 🆕 v4.3.0 — колонка verified
│ │ ├── 007_add_verification_token.sql # 🆕 v4.3.0 — колонка verification_token
│ │ ├── 008_add_verification_expires.sql # 🆕 v4.3.0 — колонка verification_expires
│ │ ├── 009_add_password_reset.sql # 🆕 v4.3.0 — колонка reset_token
│ │ └── 010_add_reset_expires.sql # 🆕 v4.3.0 — колонка reset_expires
│ ├── middleware/
│ │ └── auth.js # authMiddleware + adminMiddleware (JWT, перевірка бану)
│ ├── routes/
│ │ ├── auth.js # 🔄 v4.2.0-4.3.0 — rate limiting, zod валідація, refresh токени, верифікація email, скидання паролю
│ │ ├── admin.js # Роути адміна (/api/admin) — бан/розбан користувачів
│ │ ├── client.js # Роути клієнта (/api/client)
│ │ ├── contacts.js # Роути контактів (/api/contacts)
│ │ └── forum.js # 🔄 v4.4.0 — повний CRUD форуму + пагінація
│ ├── utils/
│ │ └── mailer.js # 🆕 v4.3.0 — sendVerificationEmail, sendPasswordResetEmail (nodemailer + Gmail)
│ ├── .env # Змінні середовища (DB, JWT_SECRET, JWT_REFRESH_SECRET, EMAIL_USER, EMAIL_PASS)
│ ├── package.json # Залежності бекенду
│ └── server.js # 🔄 v4.2.0-4.5.0 — helmet, morgan, валідація env змінних при старті
│
├── src/ # Вихідний код React застосунку
│ ├── SEO/ # Модуль SEO оптимізації
│ │ ├── utils/ # Утиліти для SEO (генератори sitemap, robots, schema)
│ │ ├── DynamicMeta.tsx # Компонент для динамічних мета-тегів
│ │ ├── MetaTags.ts # Статичні мета-теги
│ │ ├── SEO.tsx # Головний SEO компонент
│ │ ├── index.ts # Експорти модуля SEO
│ │ └── seoData.ts # База даних SEO інформації для всіх сторінок
│ │
│ ├── api/
│ │ └── api.js # 🔄 v4.2.0 — axios інстанс з Bearer токеном + interceptors для авто-оновлення refresh токена
│ │
│ ├── backend-status/ # Система моніторингу доступності бекенду (v4.1.0)
│ │ ├── useBackendStatus.ts # Хук-синглтон для перевірки стану бекенду (ping /api/health)
│ │ ├── ServiceUnavailable.tsx # Сторінка-заглушка "Технічні роботи"
│ │ └── ServiceUnavailable.css # Стилі сторінки з підтримкою CSS змінних теми
│ │
│ ├── components/ # Багаторазові React компоненти
│ │ ├── Breadcrumbs/ # Хлібні крихти — hiddenSegments для WordPress та backend
│ │ ├── CookieConsent/ # Повідомлення про Cookie
│ │ ├── DjonAssistant/ # Віртуальний асистент Djon
│ │ ├── ErrorBoundary/ # 🆕 v4.4.0 — глобальний перехоплювач JS помилок
│ │ │ └── ErrorBoundary.tsx # Замість білого екрану — повідомлення + кнопка оновлення
│ │ ├── Footer/ # Підвал сайту
│ │ ├── Header/ # 🔄 v4.3.0 — попап авторизації + посилання "Забули пароль?"
│ │ ├── Layout/ # Загальний макет сторінок
│ │ ├── NewYear/ # Новорічне оформлення (сезонне)
│ │ ├── PrivacyPolicy/ # Політика конфіденційності
│ │ ├── ProtectedRoute/ # Захищений маршрут — проп requiresBackend (v4.1.0)
│ │ ├── Sidebar/ # Бічна панель — секції WordPress та Backend
│ │ ├── TermsOfUse/ # Умови використання
│ │ ├── UI/ # Готові елементи інтерфейсу
│ │ └── UpdateNotification/ # Повідомлення про оновлення
│ │
│ ├── config/ # Конфігураційні файли
│ │ └── promoConfig.ts # Налаштування промо-акцій та знижок
│ │
│ ├── contexts/ # React Context API
│ │ ├── ThemeContext.tsx # Контекст теми (світла/темна)
│ │ └── AuthContext.tsx # 🔄 v4.2.0 — глобальний стан авторизації + refresh токени + async logout
│ │
│ ├── data/ # Статичні дані проекту
│ │ ├── menuData.ts # Структура меню навігації
│ │ └── searchIndex.ts # Індекс для пошуку по сайту
│ │
│ ├── locales/ # Файли перекладів (i18n)
│ │ ├── cs.json # Чеська мова
│ │ ├── de.json # Німецька мова
│ │ ├── en.json # Англійська мова
│ │ ├── fr.json # Французька мова
│ │ ├── pl.json # Польська мова
│ │ └── ua.json # Українська мова
│ │
│ ├── pages/ # Сторінки сайту (роути)
│ │ ├── AIServices/ # Сторінка AI сервісів
│ │ ├── About/ # Про нас
│ │ ├── Achievements/ # Досягнення
│ │ ├── Admin/ # Адмін-панель — бан/розбан, роль founder (v4.1.0)
│ │ │ ├── AdminPanel.tsx # UI управління користувачами
│ │ │ └── AdminPanel.css # Стилі: .btn-ban, .btn-unban, .user-card, .banned-badge
│ │ ├── Assistant/ # Сторінка асистента
│ │ ├── Backend/ # Освітній розділ "Бекенд та Бази даних" (v4.1.0)
│ │ │ ├── WhatIs/ # /backend/what-is — Що таке бекенд
│ │ │ ├── Database/ # /backend/database — Що таке база даних
│ │ │ ├── HowItWorks/ # /backend/how-it-works — Як вони працюють разом
│ │ │ ├── WhenNeeded/ # /backend/when-needed — Коли це потрібно сайту
│ │ │ ├── FAQ/ # /backend/faq — Часті питання (8 акордеонів)
│ │ │ └── Learning/ # /backend/learning — Ми вивчаємо
│ │ ├── Blog/ # Блог
│ │ ├── Bonus/ # Бонусна програма
│ │ ├── Briefs/ # Брифи
│ │ ├── CanvaServices/ # Послуги Canva
│ │ ├── CertificateGift/ # Подарункові сертифікати
│ │ ├── CommonMistakes/ # Поширені помилки
│ │ ├── Contact/ # Контакти
│ │ ├── DataAnalytics/ # Аналітика даних
│ │ ├── DiyVsUs/ # Порівняння DIY vs професійні послуги
│ │ ├── EditInstruction/ # Інструкції з редагування
│ │ ├── FAQ/ # Часті питання
│ │ ├── Facebook-Ads/ # Facebook реклама
│ │ ├── ForgotPassword/ # 🆕 v4.3.0 — сторінка скидання паролю
│ │ │ └── ForgotPassword.tsx # Форма введення email для скидання паролю
│ │ ├── ForWhom/ # Для кого наші послуги
│ │ ├── Forum/ # 🔄 v4.4.0-4.5.0 — форум спільноти (/user-permissions)
│ │ │ ├── Forum.tsx # Головний компонент — пагінація, skeleton
│ │ │ ├── Forum.css # Стилі форуму + .forum-pagination + .forum-skeleton-\*
│ │ │ └── Forum.mobile.css# Адаптив для 768px та 480px
│ │ ├── Generators/ # Генератори (інструменти)
│ │ ├── Google-Ads/ # Google реклама
│ │ ├── Home/ # Головна сторінка
│ │ ├── Innovations/ # Інновації
│ │ ├── Instruction/ # Інструкції
│ │ ├── InteractiveQuiz/ # Інтерактивна вікторина
│ │ ├── Legal/ # Юридична інформація
│ │ ├── Messages/ # Чат з командою (/messages)
│ │ │ └── Messages.tsx # Клієнт: чат; Адмін: список клієнтів + розмови
│ │ ├── MyAccount/ # Особистий кабінет клієнта (/my-account)
│ │ │ └── MyAccount.tsx # Замовлення, статуси, завантаження файлів
│ │ ├── NotFound/ # 404 — сторінка не знайдена
│ │ ├── PcService/ # Комп'ютерні послуги
│ │ ├── PlatformComparison/ # Порівняння платформ
│ │ ├── PolandTax/ # Податки в Польщі
│ │ ├── Pricing/ # Ціни — оновлений калькулятор (v4.1.0)
│ │ │ ├── Pricing.tsx # Калькулятор з ринковими цінами, CTA кнопками
│ │ │ ├── Pricing.css # Новий .Pricing-optionDesc, .Pricing-cta
│ │ │ └── Pricing.mobile.css # Адаптив для 420px
│ │ ├── Promo/ # Промо-акції
│ │ ├── ResetPassword/ # 🆕 v4.3.0 — сторінка встановлення нового паролю
│ │ │ └── ResetPassword.tsx # Форма введення нового паролю + підтвердження
│ │ ├── SecurityTips/ # Поради з безпеки
│ │ ├── Services/ # Послуги
│ │ ├── Skills/ # Навички
│ │ ├── Social/ # Соціальні мережі
│ │ ├── SurveyPage/ # Опитування
│ │ ├── TechnicalDetails/ # Технічні деталі
│ │ ├── Templates/ # Шаблони
│ │ ├── Testimonials/ # Відгуки клієнтів
│ │ ├── Updates/ # Оновлення платформи
│ │ ├── VerifyEmail/ # 🆕 v4.3.0 — сторінка підтвердження email
│ │ │ └── VerifyEmail.tsx # Обробка токена верифікації з листа
│ │ ├── WebStartLab/ # Web Start Lab
│ │ ├── WordPress/ # Розділ "WordPress розробка" (v4.1.0)
│ │ │ ├── WhatIs/ # /wordpress/what-is — Що таке WordPress
│ │ │ ├── Differences/ # /wordpress/differences — Чим відрізняється (таблиця з вкладками)
│ │ │ ├── WpForWhom/ # /wordpress/wp-for-whom — Для кого підходить (6 персон)
│ │ │ ├── Hosting/ # /wordpress/hosting — Серверна частина (accordion)
│ │ │ ├── FAQ/ # /wordpress/faq — Часті питання (9 питань)
│ │ │ └── InProgress/ # /wordpress/in-progress — Ми в процесі
│ │ ├── YouTubeChannel/ # YouTube канал
│ │ └── international/ # Міжнародні версії сторінок
│ │
│ ├── routes/ # Налаштування маршрутизації
│ │ └── AppRoutes.tsx # 🔄 v4.3.0 — маршрути /verify-email, /forgot-password, /reset-password
│ │
│ ├── scripts/ # Скрипти для автоматизації
│ │ └── generate-seo.ts # Генерація SEO файлів (sitemap, robots)
│ │
│ ├── types/ # TypeScript типи та інтерфейси
│ │ └── service-worker.d.ts # Типи для Service Worker
│ │
│ ├── utils/ # Допоміжні функції та утиліти
│ │ ├── analytics.ts # Інтеграція аналітики (Google Analytics)
│ │ ├── clarity.ts # Microsoft Clarity
│ │ ├── constants.ts # Глобальні константи
│ │ └── responsive.ts # Утиліти для адаптивного дизайну
│ │
│ ├── App.css # Глобальні стилі додатку
│ ├── App.tsx # 🔄 v4.4.0 — головний компонент + ErrorBoundary
│ ├── i18n.ts # Конфігурація інтернаціоналізації
│ ├── index.css # Базові стилі
│ ├── index.tsx # Точка входу React додатку
│ └── vite-env.d.ts # TypeScript декларації для Vite
│
├── .env.example # Приклад файлу змінних середовища
├── .gitignore # Файли та папки, які ігнорує Git
├── CHANGELOG.md # 🔄 Історія змін (v4.2.0-4.5.0)
├── CODE_OF_CONDUCT.md # Кодекс поведінки спільноти
├── CONTRIBUTING.md # Інструкції для контрибʼюторів
├── LICENSE # Ліцензія проекту (MIT)
├── README.md # Документація проекту
├── SECURITY.md # Політика безпеки (JWT, bcrypt, SQL, CORS)
├── package.json # Залежності та скрипти npm (фронтенд)
├── tsconfig.json # Конфігурація TypeScript
└── vite.config.ts # Конфігурація Vite (збірка проекту)

---

## 📝 Короткий опис основних директорій

| Папка                     | Призначення                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| **server/**               | Node.js + Express бекенд, MySQL, JWT авторизація                 |
| **server/db/migrations/** | 🆕 SQL міграції: banned, founder role (v4.1.0)                   |
| **server/routes/**        | REST API: auth, client, admin (бан), forum                       |
| **server/middleware/**    | authMiddleware (JWT + перевірка бану), adminMiddleware           |
| **src/api/**              | Axios інстанс з автоматичним Bearer токеном                      |
| **src/backend-status/**   | 🆕 Моніторинг бекенду + сторінка-заглушка (v4.1.0)               |
| **src/contexts/**         | AuthContext (авторизація) + ThemeContext (тема)                  |
| **src/SEO/**              | Все для пошукової оптимізації (мета-теги, sitemap, schema.org)   |
| **src/components/**       | Reusable UI компоненти (Header, Footer, Sidebar, ProtectedRoute) |
| **src/pages/**            | Всі сторінки сайту — кожна папка це окрема сторінка              |
| **src/pages/WordPress/**  | 🆕 6 сторінок WordPress розробки (v4.1.0)                        |
| **src/pages/Backend/**    | 🆕 6 освітніх сторінок про бекенд та бази даних (v4.1.0)         |
| **src/pages/Forum/**      | Форум спільноти з темами, коментарями та 3 типами реакцій        |
| **src/pages/Messages/**   | Чат клієнта з командою + адмін-вид усіх розмов                   |
| **src/pages/MyAccount/**  | Особистий кабінет клієнта — замовлення та файли                  |
| **src/pages/Admin/**      | 🔄 Адмін-панель — бан/розбан, роль founder (v4.1.0)              |
| **src/pages/Pricing/**    | 🔄 Калькулятор цін з ринковими цінами та CTA (v4.1.0)            |
| **src/locales/**          | Переклади на 6 мов (ua, en, cs, de, fr, pl)                      |
| **src/data/**             | Статичні дані (меню, індекс пошуку)                              |
| **src/utils/**            | Допоміжні функції (аналітика, константи, responsive)             |
| **src/routes/**           | React Router — всі маршрути застосунку                           |
| **public/**               | Статичні файли (favicon, зображення)                             |

---

## 🗄️ База даних MySQL (v4.0.0+)

| Таблиця             | Призначення                                                         |
| ------------------- | ------------------------------------------------------------------- |
| **users**           | Користувачі з ролями: `admin` / `client` / `founder`; поле `banned` |
| **orders**          | Замовлення клієнтів зі статусами та нотатками                       |
| **messages**        | Повідомлення між клієнтами та командою                              |
| **forum_topics**    | Теми форуму                                                         |
| **forum_comments**  | Коментарі до тем                                                    |
| **forum_reactions** | Реакції: `heart` / `thumbsup` / `handshake`                         |
| **migrations**      | 🆕 Відстеження виконаних SQL міграцій (v4.1.0)                      |

---

## 🔐 Роути та доступ (v4.0.0+)

| Роут                     | Сторінка                  | Доступ                              |
| ------------------------ | ------------------------- | ----------------------------------- |
| `/my-account`            | Особистий кабінет         | Авторизовані + активний бекенд      |
| `/messages`              | Чат з командою            | Авторизовані + активний бекенд      |
| `/user-permissions`      | Форум спільноти           | Всі (читання); авторизовані (запис) |
| `/service-unavailable`   | 🆕 Технічні роботи        | Всі (редірект при офлайн бекенді)   |
| `/privacy-policy`        | Політика конфіденційності | Всі                                 |
| `/terms-of-use`          | Умови використання        | Всі                                 |
| `/wordpress/what-is`     | 🆕 Що таке WordPress      | Всі                                 |
| `/wordpress/differences` | 🆕 Чим відрізняється      | Всі                                 |
| `/wordpress/wp-for-whom` | 🆕 Для кого підходить     | Всі                                 |
| `/wordpress/hosting`     | 🆕 Серверна частина       | Всі                                 |
| `/wordpress/faq`         | 🆕 FAQ WordPress          | Всі                                 |
| `/wordpress/in-progress` | 🆕 Ми в процесі           | Всі                                 |
| `/backend/what-is`       | 🆕 Що таке бекенд         | Всі                                 |
| `/backend/database`      | 🆕 Що таке база даних     | Всі                                 |
| `/backend/how-it-works`  | 🆕 Як вони працюють разом | Всі                                 |
| `/backend/when-needed`   | 🆕 Коли потрібен бекенд   | Всі                                 |
| `/backend/faq`           | 🆕 FAQ Бекенд             | Всі                                 |
| `/backend/learning`      | 🆕 Ми вивчаємо            | Всі                                 |

---

## 👥 Рольова структура (v4.1.0)

| Роль        | Доступ                                                                     |
| ----------- | -------------------------------------------------------------------------- |
| **guest**   | Загальна інформація, форум (читання)                                       |
| **client**  | Форум (повний), чат, кабінет, пакети та ціни                               |
| **admin**   | Повний доступ + адмін-панель (бан, управління замовленнями)                |
| **founder** | 🆕 Особлива роль засновника — відображається окремо в адмін-панелі         |
| **banned**  | Обмежений доступ — блокується на рівні `authMiddleware` з відповіддю `403` |

---

## 🚀 Технології

### Фронтенд

- **React 18.2.0** + **TypeScript 5.7.3**
- **Vite 6.0.7** (швидка збірка, HMR, dist/)
- **React Router DOM 6.30.2** (маршрутизація)
- **Axios** (HTTP клієнт з Bearer токеном)
- **i18next 23.15.1** + **react-i18next 14.1.3** (мультимовність — 6 мов)
- **Tailwind CSS 4.1.17** + **PostCSS 8.5.6** (стилізація)
- **React Icons 5.5.0** + **Lucide React 0.263.1** (іконки)
- **React Helmet Async 2.0.5** (SEO, управління head)
- **ESLint 9.39.2** + **typescript-eslint 8.50.1** (якість коду)

### Бекенд (v4.0.0+)

- **Node.js** + **Express**
- **MySQL** + **mysql2** (Railway у production, синхронізація з локалкою)
- **JWT** (jsonwebtoken) + httpOnly cookies рекомендовано
- **bcrypt** (хешування паролів)
- **dotenv** (змінні середовища)
- **nodemon** (dev режим)
- **CORS** (обмеження до конкретного origin у production)

### Деплой

- **Netlify** — фронтенд (автодеплой з GitHub, publish dir: `dist`)
- **Railway** — бекенд + MySQL база даних

---

## 🔒 Безпека (SECURITY.md)

Проєкт дотримується сучасних стандартів безпеки. Детально — у [SECURITY.md](SECURITY.md).

| Практика              | Реалізація                                                  |
| --------------------- | ----------------------------------------------------------- |
| JWT авторизація       | Верифікація на сервері, `expiresIn`, складний secret        |
| Паролі                | `bcrypt.hash(password, 10)` — ніколи у відкритому вигляді   |
| SQL Injection         | Параметризовані запити `db.query("... WHERE id = ?", [id])` |
| XSS захист            | `element.textContent` замість `innerHTML`                   |
| CORS                  | Обмежено до `ALLOWED_ORIGIN` у production                   |
| Environment Variables | `.env` в `.gitignore`, ніколи не комітити                   |
| Бан користувачів      | Перевірка `is_banned` в `authMiddleware` → `403`            |
| Залежності            | `npm audit` перед кожним деплоєм                            |

Повідомлення про вразливості: **webstartstudio978@gmail.com**
