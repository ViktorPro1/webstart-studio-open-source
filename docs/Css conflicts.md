# CSS Конфлікти — Документація

## Що було зроблено

### Проблема

При першому відкритті модального вікна замовлення кнопки сервісів відображались як великі фіолетові кружки замість нормальних кнопок з іконкою та текстом. Після перезавантаження сторінки все виглядало коректно.

### Причина

В проєкті було кілька CSS файлів з однаковими назвами класів. Наприклад клас `.service-icon` був визначений одночасно в:

- `Home/Home.css`
- `TargetAdvertising/TargetAdvertising.css`
- `MyAccount/MyAccount.css`

Кожен файл мав свої стилі для цього класу. При першому завантаженні браузер застосовував стилі в непередбачуваному порядку — звідси і баг з великими кружками.

### Як знайшли конфлікти

```bash
grep -rh "^\.[a-zA-Z]" ./client/src/ --include="*.css" | sort | uniq -d
```

Ця команда знаходить всі CSS класи що зустрічаються більше одного разу в різних файлах.

### Що виправили

| Файл                                             | Старий клас            | Новий клас                  |
| ------------------------------------------------ | ---------------------- | --------------------------- |
| `Home/Home.css` + `.tsx`                         | `.service-icon`        | `.home-service-icon`        |
| `Home/Home.css` + `.tsx`                         | `.service-title`       | `.home-service-title`       |
| `Home/Home.css` + `.tsx`                         | `.service-description` | `.home-service-description` |
| `Home/Home.css` + `.tsx`                         | `.cta-button`          | `.home-cta-button`          |
| `Home/Home.css` + `.tsx`                         | `.section-title`       | `.home-section-title`       |
| `TargetAdvertising.css` + `.tsx` + `.mobile.css` | `.service-icon`        | `.ads-service-icon`         |
| `TargetAdvertising.css` + `.tsx` + `.mobile.css` | `.service-card`        | `.ads-service-card`         |
| `TargetAdvertising.css` + `.tsx` + `.mobile.css` | `.services-grid`       | `.ads-services-grid`        |
| `TargetAdvertising.css` + `.tsx` + `.mobile.css` | `.service-title`       | `.ads-service-title`        |
| `TargetAdvertising.css` + `.tsx` + `.mobile.css` | `.service-description` | `.ads-service-description`  |
| `TargetAdvertising.css` + `.tsx`                 | `.section-title`       | `.ads-section-title`        |
| `Assistant/Assistant.css` + `.tsx`               | `.feature-card`        | `.assistant-feature-card`   |
| `Assistant/Assistant.css` + `.tsx`               | `.cta-button`          | `.assistant-cta-button`     |
| `Animations/Animations.css` + `.tsx`             | `.feature-card`        | `.animations-feature-card`  |
| `Blog/BlogInfo.css` + `.tsx`                     | `.feature-card`        | `.blog-feature-card`        |
| `Ecommerce/Ecommerce.css` + `.tsx`               | `.feature-card`        | `.ecommerce-feature-card`   |
| `PersonalizedLanding.css` + `.tsx`               | `.feature-card`        | `.landing-feature-card`     |
| `SEO/SEOInfo.css` + `.tsx`                       | `.feature-card`        | `.seo-feature-card`         |
| `SocialMedia/SocialMedia.css` + `.tsx`           | `.feature-card`        | `.social-feature-card`      |
| `WebApps/WebApps.css` + `.tsx`                   | `.feature-card`        | `.webapps-feature-card`     |
| `PromptStudio/PromptStudio.css` + `.tsx`         | `.cta-button`          | `.prompt-cta-button`        |
| `ResumeStructureGenerator.css` + `.tsx`          | `.section-title`       | `.resume-section-title`     |
| `MyAccount/MyAccount.css` + `.tsx`               | `.service-icon`        | `.modal-service-icon`       |

### Що свідомо не чіпали

| Клас                                       | Причина                                       |
| ------------------------------------------ | --------------------------------------------- |
| `.sidebar`                                 | Глобальний клас — зміна зламала Layout        |
| `.form-input`                              | Глобальний клас — зміна зламала AdminPanel    |
| `.form-group`, `.form-label`               | Однакові стилі між генераторами, безпечно     |
| `.generator-container`, `.generate-btn`    | Окремі сторінки, стилі не перетинаються       |
| `.wp-*` класи                              | Єдина система компонентів, дублікати навмисні |
| `.btn-delete`, `.btn-edit`, `.btn-dismiss` | Адмінські кнопки з однаковими стилями         |
| `.step` в `Instruction.css`                | Захищений префіксом `.instruction-root .step` |

---

## Як додавати нові компоненти правильно

### Правило найменування класів

Завжди додавай префікс назви компонента або сторінки до класу:

```css
/* ❌ Погано — загальна назва, може конфліктувати */
.feature-card {
}
.service-icon {
}
.cta-button {
}

/* ✅ Добре — унікальна назва з префіксом сторінки */
.blog-feature-card {
}
.home-service-icon {
}
.assistant-cta-button {
}
```

### Перевірка після додавання нових стилів

Після кожного нового компонента запускай:

```bash
grep -rh "^\.[a-zA-Z]" ./client/src/ --include="*.css" | sort | uniq -d
```

Якщо з'явились нові рядки — є новий конфлікт, виправляй одразу.

### Як виправити конфлікт

1. Знайди всі файли де використовується клас:

```bash
grep -rn "\.назва-класу" ./client/src/
```

2. Перейменуй клас в `.css` файлі
3. Перейменуй той самий клас в `.tsx` файлі
4. Якщо є `.mobile.css` — перейменуй і там
5. Перевір сторінку в браузері
6. Запусти команду перевірки знову

### Якщо зміна ламає UI

Це означає що клас глобальний і використовується в багатьох місцях. В такому випадку:

- Поверни оригінальну назву
- Залиш як є — ризик більший ніж користь
- Або переходь на CSS Modules (довгострокове рішення)
