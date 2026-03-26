import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Zap,
  Search,
  CheckCircle,
  Wrench,
  XCircle,
  RefreshCw,
  Shield,
  Globe,
  Palette,
  Package,
  Code,
  TrendingUp,
  Calendar,
  Tag,
  MessageCircle,
  Users,
  Database,
  Lock,
  Server,
} from "lucide-react";
import "./Updates.css";
import "./Updates.mobile.css";

interface ChangeItem {
  text: string;
  icon?: React.ReactNode;
}

interface VersionSection {
  category: string;
  icon: React.ReactNode;
  items: ChangeItem[];
}

interface Version {
  version: string;
  date: string;
  title?: string;
  sections: VersionSection[];
}

const Updates: React.FC = () => {
  const versions: Version[] = [
    {
      version: "4.6.0",
      date: "2026-03-22",
      title: "Facebook Pixel Integration",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "📊 Facebook Pixel (ID: 1570037057391515) підключено в client/index.html",
              icon: <TrendingUp />,
            },
            {
              text: "🏢 Створено портфоліо компанії WebStart Studio в Meta Business Manager",
              icon: <Globe />,
            },
            {
              text: "✅ Pixel перевірено локально через Meta Pixel Helper — статус Active",
              icon: <CheckCircle />,
            },
          ],
        },
      ],
    },
    {
      version: "4.5.0",
      date: "2026-03-22",
      title: "Logging, Env Validation & Loading Skeleton",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "📝 Логування HTTP запитів через morgan (формат dev — метод, роут, статус, час)",
              icon: <Server />,
            },
            {
              text: "🔍 Валідація env змінних при старті — сервер не стартує якщо відсутні JWT_SECRET, DB_HOST та інші",
              icon: <Shield />,
            },
            {
              text: "💀 Loading Skeleton на форумі — shimmer анімація замість тексту «Завантаження...»",
              icon: <RefreshCw />,
            },
          ],
        },
        {
          category: "Changed",
          icon: <RefreshCw className="updates-category-icon" />,
          items: [
            {
              text: "♻️ server/server.js — підключено morgan, додано валідацію env",
              icon: <RefreshCw />,
            },
            {
              text: "♻️ Forum.tsx — skeleton замість тексту завантаження",
              icon: <RefreshCw />,
            },
            {
              text: "♻️ Forum.css — стилі .forum-skeleton-card, .forum-skeleton-line",
              icon: <Palette />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [{ text: "Встановлено пакет: morgan", icon: <Package /> }],
        },
      ],
    },
    {
      version: "4.4.0",
      date: "2026-03-22",
      title: "Forum Pagination & Error Boundary",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "📄 Пагінація на форумі — теми по 10 за раз, кнопки «← Попередня / Наступна →», лічильник сторінок",
              icon: <Package />,
            },
            {
              text: "⚠️ Error Boundary — глобальний перехоплювач JS помилок із кнопкою «Оновити сторінку»",
              icon: <Shield />,
            },
            {
              text: "🔗 GET /api/forum/topics?page=1&limit=10 — підтримка пагінації на бекенді",
              icon: <Server />,
            },
          ],
        },
        {
          category: "Changed",
          icon: <RefreshCw className="updates-category-icon" />,
          items: [
            {
              text: "♻️ forum.js — GET /topics повертає { topics, total, page, limit, totalPages }",
              icon: <RefreshCw />,
            },
            {
              text: "♻️ Forum.tsx — стани currentPage та totalPages",
              icon: <RefreshCw />,
            },
            {
              text: "♻️ App.tsx — підключено ErrorBoundary",
              icon: <RefreshCw />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            { text: "ErrorBoundary.tsx — новий компонент", icon: <Code /> },
            {
              text: "Стилі .forum-pagination, .forum-page-btn, .forum-page-info в Forum.css",
              icon: <Palette />,
            },
          ],
        },
      ],
    },
    {
      version: "4.3.0",
      date: "2026-03-22",
      title: "Email Verification & Password Reset",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "📧 Email верифікація при реєстрації — лист із токеном, дійсним 24 години",
              icon: <MessageCircle />,
            },
            {
              text: "🔗 GET /api/auth/verify-email?token=... — підтвердження email",
              icon: <Server />,
            },
            {
              text: "🔑 Скидання паролю — сторінка /forgot-password, токен дійсний 1 годину",
              icon: <Lock />,
            },
            {
              text: "📬 POST /api/auth/forgot-password та /api/auth/reset-password",
              icon: <Server />,
            },
            {
              text: "🔗 Посилання «Забули пароль?» в попапі логіну",
              icon: <CheckCircle />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            {
              text: "Міграції 006–010: verified, verification_token, verification_expires, reset_token, reset_expires",
              icon: <Database />,
            },
            {
              text: "Нові сторінки: VerifyEmail.tsx, ForgotPassword.tsx, ResetPassword.tsx",
              icon: <Code />,
            },
            { text: "Встановлено пакет: nodemailer", icon: <Package /> },
          ],
        },
      ],
    },
    {
      version: "4.2.0",
      date: "2026-03-22",
      title: "Security Layer",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "🛡️ Rate Limiting — логін: 10 спроб / 15 хв, реєстрація: 5 акаунтів / год з однієї IP",
              icon: <Shield />,
            },
            {
              text: "🪖 Helmet.js — HTTP security headers: XSS, clickjacking, MIME sniffing, HSTS, CSP",
              icon: <Shield />,
            },
            {
              text: "✅ Input Validation (zod) — схеми реєстрації та логіну з перевіркою до звернення до БД",
              icon: <CheckCircle />,
            },
            {
              text: "🔄 Refresh токени — access 15 хв, refresh 30 днів у БД, axios interceptor для авто-оновлення",
              icon: <Lock />,
            },
            {
              text: "🔗 POST /api/auth/refresh та /api/auth/logout",
              icon: <Server />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            {
              text: "Міграція 005: таблиця refresh_tokens",
              icon: <Database />,
            },
            {
              text: "Встановлено пакети: express-rate-limit, helmet, zod",
              icon: <Package />,
            },
          ],
        },
      ],
    },
    {
      version: "4.1.0",
      date: "2026-03-15",
      title: "WordPress & Backend Sections, Access Control",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "🟦 Розділ «WordPress розробка» — 6 нових сторінок (/what-is, /differences, /wp-for-whom, /hosting, /faq, /in-progress)",
              icon: <Globe />,
            },
            {
              text: "📚 Розділ «Бекенд та Бази даних» — 6 нових сторінок (/what-is, /database, /how-it-works, /when-needed, /faq, /learning)",
              icon: <Database />,
            },
            {
              text: "💰 Оновлений калькулятор цін — ринкові ціни, опис варіанту, окремі опції на напрямок, CTA кнопки",
              icon: <Tag />,
            },
            {
              text: "🛡️ Моніторинг доступності бекенду — useBackendStatus, пінг /api/health кожні 30 сек, сторінка-заглушка /service-unavailable",
              icon: <Shield />,
            },
            {
              text: "🔒 ProtectedRoute: проп requiresBackend — редірект на /service-unavailable при офлайн бекенді",
              icon: <Lock />,
            },
            {
              text: "🚫 Система бану — перевірка is_banned в authMiddleware, блокування на рівні всіх захищених роутів",
              icon: <XCircle />,
            },
            {
              text: "🗄️ Система міграцій БД — папка migrations, migrate.js, таблиця migrations, автозапуск при старті",
              icon: <Database />,
            },
          ],
        },
        {
          category: "Fixed",
          icon: <CheckCircle className="updates-category-icon" />,
          items: [
            {
              text: "🐛 WordPressFAQ.tsx — <a href> замінено на <Link to>, прибрано перезавантаження сторінки",
              icon: <CheckCircle />,
            },
            {
              text: "🐛 WordPressDifferences.css — виправлено кольори таблиці",
              icon: <CheckCircle />,
            },
            {
              text: "🐛 Breadcrumbs — приховано сегменти wordpress, backend та інші через hiddenSegments",
              icon: <CheckCircle />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            {
              text: "36 нових файлів у client/src/pages/WordPress/ та /Backend/ (6 папок × 3 файли кожна)",
              icon: <Code />,
            },
            {
              text: "Міграції 001–004: banned, founder role, set_founder, refresh_tokens",
              icon: <Database />,
            },
          ],
        },
      ],
    },
    {
      version: "4.0.0",
      date: "2026-02-25",
      title: "Backend, Personal Cabinet & Community Forum",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            { text: "🔧 Node.js + Express бекенд сервер", icon: <Server /> },
            { text: "🗄️ MySQL база даних з повною схемою", icon: <Database /> },
            { text: "🔐 JWT авторизація (вхід / реєстрація)", icon: <Lock /> },
            {
              text: "👤 Особистий кабінет клієнта (/my-account)",
              icon: <Users />,
            },
            {
              text: "👑 Адмін-панель з управлінням замовленнями та клієнтами",
              icon: <Users />,
            },
            {
              text: "💬 Чат з командою (/messages) — окремий для кожного клієнта",
              icon: <MessageCircle />,
            },
            {
              text: "📨 Адмін бачить всі розмови та відповідає клієнтам",
              icon: <MessageCircle />,
            },
            {
              text: "🗣 Форум спільноти (/user-permissions) з темами та коментарями",
              icon: <MessageCircle />,
            },
            {
              text: "❤️ 👍 🤝 Три типи реакцій на теми та коментарі (одна на вибір)",
              icon: <CheckCircle />,
            },
            {
              text: "👑 Значок адміна на постах та коментарях форуму",
              icon: <Shield />,
            },
            {
              text: "✏️ Редагування та видалення тем і коментарів (адмін + автор)",
              icon: <Wrench />,
            },
            {
              text: "📦 Управління замовленнями: статуси, нотатки, файли",
              icon: <Package />,
            },
            {
              text: "🔒 Захищені роути — гість бачить форум але не може писати",
              icon: <Lock />,
            },
            {
              text: "🌐 Breadcrumbs оновлено: форум, чат, політика, умови",
              icon: <Globe />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            {
              text: "MySQL таблиці: users, orders, messages, forum_topics, forum_comments, forum_reactions",
              icon: <Database />,
            },
            {
              text: "REST API роути: /api/auth, /api/client, /api/admin, /api/forum",
              icon: <Server />,
            },
            { text: "authMiddleware — JWT верифікація токена", icon: <Lock /> },
            { text: "bcrypt хешування паролів", icon: <Shield /> },
            {
              text: "CORS налаштування для локального dev та production",
              icon: <Code />,
            },
            { text: "dotenv конфігурація середовища (.env)", icon: <Wrench /> },
            {
              text: "nodemon для автоматичного перезапуску сервера",
              icon: <RefreshCw />,
            },
            {
              text: "AuthContext — глобальний стан авторизації в React",
              icon: <Code />,
            },
            {
              text: "API axios інстанс з автоматичним Bearer токеном",
              icon: <Code />,
            },
          ],
        },
        {
          category: "Changed",
          icon: <RefreshCw className="updates-category-icon" />,
          items: [
            {
              text: 'Sidebar: "Чат з командою" тепер завжди веде на сторінку /messages',
              icon: <RefreshCw />,
            },
            {
              text: "Header: попап кабінету показує кнопки залежно від ролі (admin/client)",
              icon: <RefreshCw />,
            },
            {
              text: "Messages.tsx: адмін бачить список клієнтів + повну розмову",
              icon: <MessageCircle />,
            },
            {
              text: "Forum: реакції переписані на 3 окремі типи з підрахунком кожного",
              icon: <CheckCircle />,
            },
          ],
        },
        {
          category: "Fixed",
          icon: <CheckCircle className="updates-category-icon" />,
          items: [
            {
              text: "Виправлено зсув футера при відкритті попапу (scrollbar jump)",
              icon: <CheckCircle />,
            },
            {
              text: "Виправлено ENUM помилку в forum_reactions для типу thumbsup",
              icon: <CheckCircle />,
            },
            {
              text: "Виправлено Cannot find module помилки в forum.js",
              icon: <CheckCircle />,
            },
          ],
        },
      ],
    },
    {
      version: "3.0.0",
      date: "2025-01-04",
      title: "Vite Migration & ESLint Integration",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            {
              text: "⚡ Vite 6.0.7 - швидкий build tool нового покоління",
              icon: <Zap />,
            },
            {
              text: "@vitejs/plugin-react 4.3.4 - офіційний React плагін",
              icon: <Package />,
            },
            { text: "Значно швидша розробка (HMR)", icon: <RefreshCw /> },
            { text: "Швидший production build", icon: <Zap /> },
            { text: "Нативна підтримка ESM", icon: <Code /> },
            { text: "ESLint 9.39.2 з flat config", icon: <Search /> },
            {
              text: "Автоматична перевірка React hooks",
              icon: <CheckCircle />,
            },
            {
              text: "Правила для TypeScript та React компонентів",
              icon: <Code />,
            },
          ],
        },
        {
          category: "Changed",
          icon: <RefreshCw className="updates-category-icon" />,
          items: [
            { text: "Перехід з Create React App на Vite", icon: <RefreshCw /> },
            { text: "Покращена швидкість розробки та збірки", icon: <Zap /> },
            {
              text: "Оновлено конфігураційні файли (vite.config.ts)",
              icon: <Wrench />,
            },
          ],
        },
        {
          category: "Removed",
          icon: <XCircle className="updates-category-icon" />,
          items: [
            { text: "Create React App залежності", icon: <XCircle /> },
            { text: "react-scripts", icon: <XCircle /> },
          ],
        },
        {
          category: "Fixed",
          icon: <CheckCircle className="updates-category-icon" />,
          items: [
            {
              text: "setState в useEffect (переведено на lazy initialization)",
              icon: <CheckCircle />,
            },
            { text: "Видалено TypeScript any типи", icon: <Code /> },
            {
              text: "Виправлено empty block statements",
              icon: <CheckCircle />,
            },
            {
              text: "Math.random в рендері компонентів",
              icon: <CheckCircle />,
            },
          ],
        },
      ],
    },
    {
      version: "2.0.0",
      date: "2024-12-26",
      title: "TypeScript Migration",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            { text: "🔷 Повна міграція на TypeScript 4.9.5", icon: <Code /> },
            {
              text: "Додано типи для React (@types/react@19.2.7)",
              icon: <Package />,
            },
            { text: "Tailwind CSS 4.1.17 інтеграція", icon: <Palette /> },
            { text: "PostCSS 8.5.6 та Autoprefixer 10.4.22", icon: <Wrench /> },
            { text: "i18next 23.15.1 - мультимовність", icon: <Globe /> },
            {
              text: "Підтримка української та англійської мов",
              icon: <Globe />,
            },
            {
              text: "React Icons 5.5.0 та Lucide React 0.263.1",
              icon: <Palette />,
            },
            { text: "React Helmet Async 2.0.5 для SEO", icon: <Search /> },
          ],
        },
        {
          category: "Changed",
          icon: <RefreshCw className="updates-category-icon" />,
          items: [
            { text: "Всі .jsx файли мігровано на .tsx", icon: <Code /> },
            { text: "Всі .js файли мігровано на .ts", icon: <Code /> },
            {
              text: "Оновлено структуру проєкту для TypeScript",
              icon: <RefreshCw />,
            },
            {
              text: "Покращено типобезпеку по всьому проєкту",
              icon: <Shield />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            {
              text: "Створено tsconfig.json з оптимальними налаштуваннями",
              icon: <Wrench />,
            },
            {
              text: "Створено tailwind.config.js та postcss.config.js",
              icon: <Wrench />,
            },
            {
              text: "Додано папки /src/types, /src/contexts, /src/utils",
              icon: <Package />,
            },
          ],
        },
      ],
    },
    {
      version: "1.0.0",
      date: "2024-12-13",
      title: "Initial Release",
      sections: [
        {
          category: "Added",
          icon: <TrendingUp className="updates-category-icon" />,
          items: [
            { text: "🎉 Початковий публічний реліз", icon: <CheckCircle /> },
            {
              text: "Головна сторінка з інформацією про платформу",
              icon: <Package />,
            },
            {
              text: "Повна навігаційна структура (Header, Sidebar, Footer)",
              icon: <Package />,
            },
            { text: "Адаптивний дизайн для всіх пристроїв", icon: <Palette /> },
            { text: "React Router v6 для SPA навігації", icon: <Code /> },
            {
              text: "Сторінки AI Automation та Google Ads Setup",
              icon: <Package />,
            },
            { text: "Розділ Blog з статтями", icon: <Package /> },
            {
              text: "Інформаційні сторінки (FAQ, Testimonials, тощо)",
              icon: <Package />,
            },
          ],
        },
        {
          category: "Technical",
          icon: <Wrench className="updates-category-icon" />,
          items: [
            { text: "Create React App як основа проєкту", icon: <Package /> },
            {
              text: "React 18.x з функціональними компонентами",
              icon: <Code />,
            },
            { text: "React Router DOM 6.x", icon: <Code /> },
            { text: "Build конфігурація для Netlify", icon: <Wrench /> },
          ],
        },
      ],
    },
  ];

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      Added: "updates-category-added",
      Changed: "updates-category-changed",
      Removed: "updates-category-removed",
      Fixed: "updates-category-fixed",
      Security: "updates-category-security",
      Technical: "updates-category-technical",
      "Breaking Changes": "updates-category-breaking",
    };
    return colors[category] || "updates-category-default";
  };

  return (
    <div className="updates-container">
      <Helmet>
        <title>Оновлення - WebStart Studio</title>
        <meta
          name="description"
          content="Історія оновлень та нових функцій платформи Web Start Studio"
        />
      </Helmet>

      <div className="updates-header">
        <div className="updates-header-content">
          <h1 className="updates-title">
            <RefreshCw className="updates-title-icon" />
            Оновлення Платформи
          </h1>
          <p className="updates-subtitle">
            Слідкуйте за розвитком платформи. <br />
            Кожне оновлення робить WebStart Studio краще та продуктивніше.
          </p>
        </div>
      </div>

      <div className="updates-content">
        <div className="updates-timeline">
          {versions.map((version, versionIndex) => (
            <div key={version.version} className="updates-version-block">
              <div className="updates-version-header">
                <div className="updates-version-badge">
                  <Tag className="updates-badge-icon" />
                  <span className="updates-version-number">
                    v{version.version}
                  </span>
                </div>
                <div className="updates-version-info">
                  <h2 className="updates-version-title">{version.title}</h2>
                  <div className="updates-version-date">
                    <Calendar className="updates-date-icon" />
                    <span>{version.date}</span>
                  </div>
                </div>
              </div>

              <div className="updates-sections">
                {version.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="updates-section">
                    <div
                      className={`updates-section-header ${getCategoryColor(section.category)}`}
                    >
                      {section.icon}
                      <h3 className="updates-section-title">
                        {section.category}
                      </h3>
                      <span className="updates-section-count">
                        {section.items.length}
                      </span>
                    </div>
                    <ul className="updates-items-list">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="updates-item">
                          <div className="updates-item-icon">
                            {item.icon || <CheckCircle />}
                          </div>
                          <span className="updates-item-text">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {versionIndex < versions.length - 1 && (
                <div className="updates-version-divider"></div>
              )}
            </div>
          ))}
        </div>

        <aside className="updates-sidebar">
          <div className="updates-info-card">
            <h3 className="updates-info-title">
              <TrendingUp className="updates-info-icon" />
              Швидкі Факти
            </h3>
            <div className="updates-stats">
              <div className="updates-stat">
                <span className="updates-stat-number">{versions.length}</span>
                <span className="updates-stat-label">Версій</span>
              </div>
              <div className="updates-stat">
                <span className="updates-stat-number">
                  {versions.reduce(
                    (acc, v) =>
                      acc + v.sections.reduce((a, s) => a + s.items.length, 0),
                    0,
                  )}
                </span>
                <span className="updates-stat-label">Змін</span>
              </div>
            </div>
          </div>

          <div className="updates-info-card">
            <h3 className="updates-info-title">
              <Code className="updates-info-icon" />
              Легенда
            </h3>
            <div className="updates-legend">
              <div className="updates-legend-item">
                <div className="updates-legend-badge updates-category-added"></div>
                <span>Додано</span>
              </div>
              <div className="updates-legend-item">
                <div className="updates-legend-badge updates-category-changed"></div>
                <span>Змінено</span>
              </div>
              <div className="updates-legend-item">
                <div className="updates-legend-badge updates-category-fixed"></div>
                <span>Виправлено</span>
              </div>
              <div className="updates-legend-item">
                <div className="updates-legend-badge updates-category-removed"></div>
                <span>Видалено</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Updates;
