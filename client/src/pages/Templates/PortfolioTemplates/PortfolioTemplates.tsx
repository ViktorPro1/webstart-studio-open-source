import React, { useState } from "react";
import "./PortfolioTemplates.css";
import "./PortfolioTemplates.mobile.css";

interface Template {
  id: string;
  name: string;
  url: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  features: string[];
  bestFor: string;
}

const PortfolioTemplates: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: "developer",
      name: "Developer Style",
      url: "https://developer-style-template.netlify.app/",
      color: "#2dd4bf",
      gradient: "linear-gradient(135deg, #0d4f4a 0%, #1a8c7e 100%)",
      icon: "💻",
      description: "Мінімалістичний дизайн для розробників із темною темою",
      features: [
        "Темна тема",
        "Code snippets",
        "GitHub інтеграція",
        "Технічний стек",
      ],
      bestFor: "Frontend/Backend розробники, DevOps інженери",
    },
    {
      id: "minimal",
      name: "Minimal Style",
      url: "https://minimal-style-template.netlify.app/",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #3b1a6e 0%, #6d28d9 100%)",
      icon: "✨",
      description:
        "Елегантність у простоті — акцент на типографіці та контенті",
      features: [
        "Чистий дизайн",
        "Швидке завантаження",
        "Акцент на контент",
        "Типографіка",
      ],
      bestFor: "Дизайнери, письменники, фотографи",
    },
    {
      id: "gradient",
      name: "Modern Gradient",
      url: "https://modern-gradient-template.netlify.app/",
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #7a1040 0%, #be185d 100%)",
      icon: "🎨",
      description: "Яскраві градієнти, 3D ефекти та сміливі творчі рішення",
      features: [
        "Анімовані градієнти",
        "Smooth scrolling",
        "3D ефекти",
        "Інтерактивність",
      ],
      bestFor: "Креативні професії, UI/UX дизайнери, ілюстратори",
    },
    {
      id: "premium",
      name: "Premium",
      url: "https://premium-template-pro.netlify.app/",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #7c3900 0%, #b45309 100%)",
      icon: "👑",
      description: "Преміальний досвід для топових фахівців та керівників",
      features: [
        "Розкішний дизайн",
        "Відео-презентації",
        "Анімації преміум",
        "Ексклюзивність",
      ],
      bestFor: "Топ-менеджери, консультанти, бізнес-тренери",
    },
  ];

  return (
    <div className="portfolio-templates">
      <div className="portfolio-templates__wrapper">
        {/* Hero */}
        <section className="portfolio-templates__hero">
          <div className="portfolio-templates__hero-content">
            <div className="portfolio-templates__hero-badge">
              Портфоліо 2026
            </div>
            <h1 className="portfolio-templates__hero-title">
              Дизайн портфоліо,
              <br />
              який{" "}
              <span className="portfolio-templates__highlight">продає</span>
            </h1>
            <p className="portfolio-templates__hero-description">
              Професійні шаблони портфоліо за останніми трендами веб-дизайну.
              Адаптивні, оптимізовані та готові до персоналізації під ваші
              потреби.
            </p>
            <div className="portfolio-templates__hero-stats">
              <div className="portfolio-templates__stat-item">
                <div className="portfolio-templates__stat-number">4</div>
                <div className="portfolio-templates__stat-label">
                  Унікальних стилів
                </div>
              </div>
              <div className="portfolio-templates__stat-item">
                <div className="portfolio-templates__stat-number">100%</div>
                <div className="portfolio-templates__stat-label">
                  Адаптивність
                </div>
              </div>
              <div className="portfolio-templates__stat-item">
                <div className="portfolio-templates__stat-number">24/7</div>
                <div className="portfolio-templates__stat-label">Підтримка</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features strip */}
        <section className="portfolio-templates__features">
          <h2 className="portfolio-templates__section-title">
            Чому наші портфоліо особливі?
          </h2>
          <div className="portfolio-templates__features-grid">
            <div className="portfolio-templates__feature-card">
              <div className="portfolio-templates__feature-icon">⚡</div>
              <h3>Блискавична швидкість</h3>
              <p>
                Оптимізовані під Core Web Vitals для ідеальної продуктивності
              </p>
            </div>
            <div className="portfolio-templates__feature-card">
              <div className="portfolio-templates__feature-icon">📱</div>
              <h3>Адаптивний дизайн</h3>
              <p>Ідеально виглядають від 320px до 4K моніторів</p>
            </div>
            <div className="portfolio-templates__feature-card">
              <div className="portfolio-templates__feature-icon">🎯</div>
              <h3>SEO-оптимізація</h3>
              <p>Вбудована структура для кращого ранжування в пошуку</p>
            </div>
            <div className="portfolio-templates__feature-card">
              <div className="portfolio-templates__feature-icon">✦</div>
              <h3>Тренди 2025</h3>
              <p>Glassmorphism, micro-interactions, bold typography</p>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="portfolio-templates__templates">
          <h2 className="portfolio-templates__section-title">
            Оберіть свій стиль
          </h2>
          <p className="portfolio-templates__section-subtitle">
            Кожен шаблон розроблений з увагою до деталей та готовий до
            використання
          </p>

          <div className="portfolio-templates__grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`portfolio-templates__card ${activeTemplate === template.id ? "portfolio-templates__card--active" : ""}`}
                onMouseEnter={() => setActiveTemplate(template.id)}
                onMouseLeave={() => setActiveTemplate(null)}
                style={
                  {
                    "--card-color": template.color,
                    "--card-gradient": template.gradient,
                  } as React.CSSProperties
                }
              >
                <div className="portfolio-templates__card-header">
                  <div className="portfolio-templates__card-icon">
                    {template.icon}
                  </div>
                  <div className="portfolio-templates__card-badge">
                    Популярний
                  </div>
                </div>

                <h3 className="portfolio-templates__card-name">
                  {template.name}
                </h3>
                <p className="portfolio-templates__card-description">
                  {template.description}
                </p>

                <div className="portfolio-templates__card-features">
                  <div className="portfolio-templates__features-label">
                    Що включено:
                  </div>
                  <ul className="portfolio-templates__features-list">
                    {template.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="portfolio-templates__feature-check">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="portfolio-templates__card-best-for">
                  <strong>Підходить для:</strong> {template.bestFor}
                </div>

                <a
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-templates__card-link"
                >
                  <span>Переглянути демо</span>
                  <span className="portfolio-templates__link-arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="portfolio-templates__cta">
          <div className="portfolio-templates__cta-content">
            <h2 className="portfolio-templates__cta-title">
              Готові створити своє портфоліо?
            </h2>
            <p className="portfolio-templates__cta-description">
              Оберіть підхожий пакет або отримайте індивідуальний проект під
              ваші потреби
            </p>
          </div>
          <div className="portfolio-templates__cta-buttons">
            <button
              className="portfolio-templates__cta-btn portfolio-templates__cta-btn--primary"
              onClick={() => (window.location.href = "/briefs")}
            >
              Отримати проект
            </button>
            <button
              className="portfolio-templates__cta-btn portfolio-templates__cta-btn--secondary"
              onClick={() => (window.location.href = "/pricing")}
            >
              Пакети
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioTemplates;
