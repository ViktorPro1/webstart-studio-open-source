import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingTemplates.css";
import "./LandingTemplates.mobile.css";

interface Template {
  id: string;
  name: string;
  url: string;
  color: string;
  gradient: string;
  icon: string;
  category: string;
  description: string;
  features: string[];
  conversions: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
}

const LandingTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: "restaurant",
      name: "Ресторан «Горіх»",
      url: "https://business-restaurant-nut.netlify.app/",
      color: "#b45309",
      gradient: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
      icon: "🍽️",
      category: "business",
      description:
        "Елегантний лендінг для ресторану авторської кухні з меню та онлайн-бронюванням столів",
      features: ["Онлайн-бронювання", "Меню з цінами", "Атмосфера", "Контакти"],
      conversions: "18%",
    },
    {
      id: "design-studio",
      name: "FORMA Studio",
      url: "https://creative-forma-studio.netlify.app/",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
      icon: "🎨",
      category: "creative",
      description:
        "Портфоліо студії графічного дизайну: брендинг, упаковка, SMM та UI/UX дизайн",
      features: ["Портфоліо", "Послуги та ціни", "Відгуки", "Форма заявки"],
      conversions: "22%",
    },
    {
      id: "kids-events",
      name: "Святкуй! 🎈",
      url: "https://events-celebrate-landing.netlify.app/",
      color: "#db2777",
      gradient: "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
      icon: "🎉",
      category: "event",
      description:
        "Організація дитячих свят під ключ у Києві: аніматори, декор, торти та фотозони",
      features: ["Пакети послуг", "Теми свят", "Відгуки батьків", "Замовлення"],
      conversions: "20%",
    },
    {
      id: "cleaning",
      name: "CleanHome",
      url: "https://services-clean-home.netlify.app/",
      color: "#0891b2",
      gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
      icon: "🧹",
      category: "service",
      description:
        "Клінінг квартир, будинків та офісів у Києві: підтримуюче, генеральне та після ремонту",
      features: [
        "Калькулятор ціни",
        "3 типи прибирання",
        "Гарантія якості",
        "Онлайн-замовлення",
      ],
      conversions: "15%",
    },
    {
      id: "coach",
      name: "Коуч Олена Марченко",
      url: "https://social-networks-coach-olena.netlify.app/",
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #047857 100%)",
      icon: "🌸",
      category: "social",
      description:
        "Особистий лендінг ICF-коуча: програми від 2 500 грн, 200+ клієнтів, безкоштовна консультація",
      features: [
        "Програми коучингу",
        "Про коуча",
        "Відгуки",
        "Безкоштовна сесія",
      ],
      conversions: "25%",
    },
    {
      id: "accounting",
      name: "ФінПро",
      url: "https://finance-fin-pro.netlify.app/",
      color: "#1d4ed8",
      gradient: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      icon: "📊",
      category: "finance",
      description:
        "Бухгалтерський аутсорсинг для ФОП та ТОВ: 3 тарифи від 1 500 грн/міс, 500+ клієнтів, 0 штрафів",
      features: [
        "Тарифи та ціни",
        "Послуги",
        "FAQ",
        "Безкоштовна консультація",
      ],
      conversions: "22%",
    },
  ];

  const categories: Category[] = [
    { id: "all", label: "Всі", icon: "🌟" },
    { id: "business", label: "Бізнес", icon: "🍽️" },
    { id: "creative", label: "Креатив", icon: "🎨" },
    { id: "event", label: "Події", icon: "🎉" },
    { id: "service", label: "Сервіси", icon: "🧹" },
    { id: "social", label: "Соцмережі", icon: "📱" },
    { id: "finance", label: "Фінанси", icon: "💰" },
  ];

  const filteredTemplates: Template[] =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const handleCategoryChange = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="landing-templates">
      <div className="landing-templates__wrapper">
        <section className="landing-templates__hero">
          <div className="landing-templates__hero-content">
            <div className="landing-templates__hero-badge">
              🚀 Лендінги 2026
            </div>
            <h1 className="landing-templates__hero-title">
              Односторінкові сайти, <br />
              які{" "}
              <span className="landing-templates__highlight">конвертують</span>
            </h1>
            <p className="landing-templates__hero-description">
              Лендінги для будь-яких цілей: від особистого коуч-сайту до
              корпоративних сторінок. Кожен шаблон оптимізований під конверсію,
              має швидке завантаження та інтеграції з популярними сервісами.
            </p>
            <div className="landing-templates__hero-stats">
              <div className="landing-templates__stat-item">
                <div className="landing-templates__stat-number">6</div>
                <div className="landing-templates__stat-label">
                  Готових шаблонів
                </div>
              </div>
              <div className="landing-templates__stat-item">
                <div className="landing-templates__stat-number">25%</div>
                <div className="landing-templates__stat-label">
                  Середня конверсія
                </div>
              </div>
              <div className="landing-templates__stat-item">
                <div className="landing-templates__stat-number">2.5s</div>
                <div className="landing-templates__stat-label">
                  Швидкість завантаження
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-templates__info">
          <h2 className="landing-templates__section-title">
            Що таке landing page?
          </h2>
          <div className="landing-templates__info-grid">
            <div className="landing-templates__info-card">
              <div className="landing-templates__info-icon">🎯</div>
              <h3>Одна мета</h3>
              <p>
                Лендінг створений для однієї конкретної дії: купівля,
                реєстрація, дзвінок. Це фокусує увагу відвідувача.
              </p>
            </div>
            <div className="landing-templates__info-card">
              <div className="landing-templates__info-icon">⚡</div>
              <h3>Швидка конверсія</h3>
              <p>
                Мінімум відволікань, максимум переконливості. Користувач швидко
                розуміє цінність пропозиції.
              </p>
            </div>
            <div className="landing-templates__info-card">
              <div className="landing-templates__info-icon">📊</div>
              <h3>Вимірюваність</h3>
              <p>
                Легко відстежити ефективність рекламних кампаній та A/B
                тестувати елементи.
              </p>
            </div>
            <div className="landing-templates__info-card">
              <div className="landing-templates__info-icon">💡</div>
              <h3>Простота запуску</h3>
              <p>
                Не потрібен великий сайт - одна сторінка може принести більше
                лідів, ніж складний портал.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-templates__templates">
          <h2 className="landing-templates__section-title">Наші лендінги</h2>

          <div className="landing-templates__categories-filter">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`landing-templates__category-btn ${selectedCategory === cat.id ? "landing-templates__category-btn--active" : ""}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span className="landing-templates__cat-icon">{cat.icon}</span>
                <span className="landing-templates__cat-label">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <div className="landing-templates__grid">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="landing-templates__card"
                style={
                  { "--card-color": template.color } as React.CSSProperties
                }
              >
                <div className="landing-templates__card-visual">
                  <div
                    className="landing-templates__card-icon"
                    style={{ background: template.gradient }}
                  >
                    {template.icon}
                  </div>
                  <div className="landing-templates__conversion-badge">
                    <span className="landing-templates__conversion-icon">
                      📈
                    </span>
                    {template.conversions} конверсія
                  </div>
                </div>

                <div className="landing-templates__card-content">
                  <h3 className="landing-templates__card-name">
                    {template.name}
                  </h3>
                  <p className="landing-templates__card-description">
                    {template.description}
                  </p>

                  <div className="landing-templates__card-features">
                    <div className="landing-templates__features-label">
                      Функціонал:
                    </div>
                    <div className="landing-templates__features-tags">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="landing-templates__feature-tag"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="landing-templates__card-link"
                    style={{ background: template.gradient }}
                  >
                    <span>Відкрити демо</span>
                    <span className="landing-templates__link-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-templates__cta">
          <div className="landing-templates__cta-content">
            <h2 className="landing-templates__cta-title">
              Готові створити свій лендінг?
            </h2>
            <p className="landing-templates__cta-description">
              Оберіть підхожий пакет або отримайте індивідуальний проект під
              ваші потреби
            </p>
            <div className="landing-templates__cta-buttons">
              <button
                className="landing-templates__cta-btn landing-templates__cta-btn--primary"
                onClick={() => navigate("/briefs")}
              >
                Отримати проект
              </button>
              <button
                className="landing-templates__cta-btn landing-templates__cta-btn--secondary"
                onClick={() => navigate("/pricing")}
              >
                Пакети
              </button>
              <button
                className="landing-templates__cta-btn landing-templates__cta-btn--lab"
                onClick={() => navigate("/webstart-lab")}
              >
                🔬 WebStart LAB
              </button>
            </div>

            <div className="landing-templates__cta-note">
              <span className="landing-templates__cta-note-icon">🎂</span>
              <p>
                Також верстаємо{" "}
                <strong>святкові лендінги до дня народження</strong> — з
                персональним текстом, відео з YouTube, креативними попапами,
                феєрверками та кульками. Ідеальний сюрприз для близьких 🎉
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingTemplates;
