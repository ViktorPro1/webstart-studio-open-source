import React from "react";
import "./WebStartLab.css";
import "./WebStartLab.mobile.css";

const WebStartLab = () => {
  return (
    <section className="WebStartLab">
      <h2>🧪 WebStart LAB</h2>
      <p>
        У цій секції ми ділимось проєктами, які створюємо всередині студії. Це
        мінікурси, пілотні сервіси, експерименти з технологіями та ідеї, що
        поступово перетворюються на повноцінні продукти. Кожен проєкт ми
        оптимізуємо під SEO, адаптуємо для мобільних, додаємо
        PWA-функціональність та поступово вдосконалюємо.
      </p>

      <ul className="WebStartLab-projects">
        <li className="WebStartLab-project">
          <a
            href="https://give-a-giftholiday.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🎁 ПодаруйСвято
          </a>
          <span className="WebStartLab-project-desc">
            Сервіс для організації онлайн-привітань і подарунків, що дарують
            емоції.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://frontend-path-site.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            👨‍💻 Мій шлях до фронтенду
          </a>
          <span className="WebStartLab-project-desc">
            Міні-курс для початківців у веброзробці: HTML, CSS, JS із практикою.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://target-and-design-a-simple-start.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🎨 Canva + Таргетинг у Facebook/Instagram
          </a>
          <span className="WebStartLab-project-desc">
            Навчальний курс: створення креативів у Canva та запуск реклами в
            Meta.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://everything-related-to-pit.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            📄 Все що стосується РІТ
          </a>
          <span className="WebStartLab-project-desc">
            Мінікурс: детальна інформація щодо податкової звітності PIT.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://pohoda-v-yaromyrtsi-ta-zavadyntsyakh.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🌤️ Погода в селі
          </a>
          <span className="WebStartLab-project-desc">
            Сервіс, який показує актуальну погоду для сіл Яромирці та Завадинці.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://rabbit-farming-from-a-to-ja.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🐇 Кролівництво від А до Я
          </a>
          <span className="WebStartLab-project-desc">
            Платформа, де зібрано усе про кролівництво: догляд, годування,
            калькулятори, поради та довідник для господаря.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://ai-agent-from-scratch.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🤖 Мінікурс: AI-агент з нуля
          </a>
          <span className="WebStartLab-project-desc">
            Мінікурс, де ви навчитеся створювати власного AI-агента з нуля: від
            основ до практичної реалізації, крок за кроком.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://how-to-install-an-operating-system.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            💻 Посібник: Як встановити ОС
          </a>
          <span className="WebStartLab-project-desc">
            Практичний посібник із встановлення операційних систем: покрокові
            інструкції, поради та пояснення для Windows, Linux та інших ОС.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://my-day-from-websatrt-studio.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            📅 Мій день
          </a>
          <span className="WebStartLab-project-desc">
            Простий і швидкий планувальник завдань «Мій день» — допомагає не
            забути важливі справи.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://ai-prompt-studio-webstart.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🤖 AI Prompt Studio
          </a>
          <span className="WebStartLab-project-desc">
            Інструмент для швидкого створення, збереження та тестування промптів
            під різні задачі.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://frontend-developer-handbook.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            📚 Довідник Frontend-розробника
          </a>
          <span className="WebStartLab-project-desc">
            Комплексний довідник для frontend-розробників: сучасні технології,
            інструменти, best practices та корисні ресурси.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://mini-guide-targetologist.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🎯 Таргетолог Pro
          </a>
          <span className="WebStartLab-project-desc">
            Компактний довідник таргетолога: Meta Ads, Google Ads, TikTok Ads,
            метрики, чеклісти та лайфхаки для запуску і оптимізації реклами.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://backend-frontend-interview.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            💬 Dev Reference — Довідник розробника
          </a>
          <span className="WebStartLab-project-desc">
            Практичний довідник з Backend (Node.js/Express), Frontend
            (React/Vite) та питань на співбесіду — для підготовки та щоденної
            роботи.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://cheat-sheet-for-javascript.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            📖 JS Довідник
          </a>
          <span className="WebStartLab-project-desc">
            Повний словник команд JavaScript для фронтенд-розробника: DOM,
            події, масиви, async/await, fetch та інше — з прикладами коду.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://bigquery-sql-generator.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🗄️ BigQuery SQL Generator
          </a>
          <span className="WebStartLab-project-desc">
            Інструмент для генерації SQL-запитів під BigQuery — допомагає швидко
            будувати запити без глибокого знання синтаксису.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://proektu-vid-a-do-ya.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🚀 Запуск проекту від А до Я
          </a>
          <span className="WebStartLab-project-desc">
            Покроковий посібник зі створення веб-проекту: від планування та
            налаштування середовища до тестування, оптимізації та деплою.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://layout-on-grid-project.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🧩 Лендінг на CSS Grid
          </a>
          <span className="WebStartLab-project-desc">
            Демонстраційний лендінг, повністю побудований на CSS Grid — приклад
            сучасної верстки з адаптивним макетом та чистою структурою.
          </span>
        </li>
        <li className="WebStartLab-project">
          <a
            href="https://spiffy-lolly-93656a.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="WebStartLab-project-link"
          >
            🏔️ Гуцульські мандри 365
          </a>
          <span className="WebStartLab-project-desc">
            Лендінг сімейного туру в Карпати: дитяча програма, активності,
            бронювання — приклад реального туристичного сайту.
          </span>
        </li>
      </ul>

      <p>
        Ми зростаємо, модернізуємо й удосконалюємо ці проєкти. Секція
        оновлюється та доповнюється новими ідеями.
      </p>

      <div className="WebStartLab-text-center WebStartLab-margin-bottom-40">
        <a
          href="https://t.me/+aOwtDQyB88YwZTQ6"
          target="_blank"
          rel="noreferrer"
          className="WebStartLab-idea-button"
        >
          Запропонувати ідею
        </a>
      </div>

      <div className="WebStartLab-marquee">
        <span>
          🔥 Вебстарт студія запускає нові проєкти! Приєднуйся до створення
          сучасного вебу разом із нами! 🔧 Нові сервіси та інструменти вже в
          роботі – не проґав! 🚀
        </span>
      </div>
    </section>
  );
};

export default WebStartLab;
