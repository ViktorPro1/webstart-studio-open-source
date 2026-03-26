import React, { useState } from "react";
import type { ChangeEvent } from "react";

import "./ResumeStructureGenerator.css";
import "./ResumeStructureGenerator.mobile.css";

interface Section {
  title: string;
  desc: string;
  icon: string;
}

type JobType = "web" | "marketing" | "management" | "other";

const ResumeStructureGenerator = () => {
  const [jobType, setJobType] = useState<JobType | "">("");
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string>("");

  const sectionsData: Record<JobType, Section[]> = {
    web: [
      {
        title: "Контактна інформація",
        desc: "Ваше ім'я, телефон, email, посилання на портфоліо.",
        icon: "📧",
      },
      {
        title: "Мета / Summary",
        desc: "Коротко про вашу спеціалізацію та ключові досягнення.",
        icon: "🎯",
      },
      {
        title: "Досвід роботи",
        desc: "Описуйте проєкти, роль, технології та результати.",
        icon: "💼",
      },
      {
        title: "Освіта",
        desc: "Назва навчального закладу, спеціальність, рік закінчення.",
        icon: "🎓",
      },
      {
        title: "Навички",
        desc: "Перелік ключових інструментів та технологій.",
        icon: "⚡",
      },
    ],
    marketing: [
      {
        title: "Контактна інформація",
        desc: "Ім'я, телефон, email, соціальні мережі.",
        icon: "📧",
      },
      {
        title: "Мета / Summary",
        desc: "Коротко про вашу маркетингову експертизу та досягнення.",
        icon: "🎯",
      },
      {
        title: "Досвід роботи",
        desc: "Опишіть кампанії, результати, KPIs.",
        icon: "💼",
      },
      {
        title: "Освіта",
        desc: "Заклади, курси, тренінги.",
        icon: "🎓",
      },
      {
        title: "Навички",
        desc: "Аналітика, SMM, SEO, реклама, PR.",
        icon: "⚡",
      },
    ],
    management: [
      {
        title: "Контактна інформація",
        desc: "Ім'я, телефон, email, LinkedIn.",
        icon: "📧",
      },
      {
        title: "Мета / Summary",
        desc: "Коротко про ваш управлінський досвід.",
        icon: "🎯",
      },
      {
        title: "Досвід роботи",
        desc: "Опишіть команди, проєкти, досягнуті KPI.",
        icon: "💼",
      },
      {
        title: "Освіта",
        desc: "Заклади та курси.",
        icon: "🎓",
      },
      {
        title: "Навички",
        desc: "Управління, переговори, планування, аналітика.",
        icon: "⚡",
      },
    ],
    other: [
      {
        title: "Контактна інформація",
        desc: "Ім'я, телефон, email, соцмережі.",
        icon: "📧",
      },
      {
        title: "Мета / Summary",
        desc: "Стислий опис професійних цілей та сильних сторін.",
        icon: "🎯",
      },
      {
        title: "Досвід роботи",
        desc: "Вкажіть попередні позиції та ключові результати.",
        icon: "💼",
      },
      {
        title: "Освіта",
        desc: "Заклади та курси.",
        icon: "🎓",
      },
      {
        title: "Навички",
        desc: "Перелік основних професійних компетенцій.",
        icon: "⚡",
      },
    ],
  };

  const handleGenerate = () => {
    setError("");
    setSections([]);

    if (!jobType) {
      setError("Будь ласка, оберіть сферу роботи.");
      return;
    }

    setSections(sectionsData[jobType]);
  };

  const handleJobTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setJobType(e.target.value as JobType);
  };

  return (
    <div className="resume-generator">
      <div className="generator-container">
        <div className="generator-header">
          <h1 className="generator-title">Генератор структури резюме</h1>
          <p className="generator-subtitle">
            Оберіть тип роботи або сферу діяльності, і отримайте готову
            структуру резюме з порадами для кожного блоку.
          </p>
        </div>

        <div className="generator-form">
          <div className="form-group">
            <label htmlFor="job-type" className="form-label">
              Сфера роботи
            </label>
            <select
              id="job-type"
              className="form-select"
              value={jobType}
              onChange={handleJobTypeChange}
            >
              <option value="">Оберіть сферу роботи</option>
              <option value="web">Веб-дизайн / Розробка</option>
              <option value="marketing">Маркетинг / PR</option>
              <option value="management">Менеджмент / Продажі</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <button className="generate-btn" onClick={handleGenerate}>
            <span className="btn-icon">📋</span>
            Згенерувати структуру
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {sections.length > 0 && (
          <div className="sections-container">
            <div className="sections-header">
              <h2 className="sections-title">Рекомендована структура резюме</h2>
              <div className="sections-count">{sections.length} розділів</div>
            </div>

            <div className="sections-list">
              {sections.map((section, index) => (
                <div key={index} className="section-card">
                  <div className="section-number">{index + 1}</div>
                  <div className="section-icon">{section.icon}</div>
                  <div className="section-content">
                    <h3 className="resume-section-title">{section.title}</h3>
                    <p className="section-desc">{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="advice-card">
              <div className="advice-icon">💡</div>
              <div className="advice-content">
                <h3 className="advice-title">Поради для написання резюме</h3>
                <ul className="advice-list">
                  <li>Використовуйте конкретні цифри та досягнення</li>
                  <li>Адаптуйте резюме під конкретну вакансію</li>
                  <li>Уникайте загальних фраз та кліше</li>
                  <li>Перевіряйте текст на помилки</li>
                  <li>Тримайте резюме в межах 1-2 сторінок</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeStructureGenerator;
