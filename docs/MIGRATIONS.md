# Міграції бази даних

## Що це і навіщо

Міграції — це SQL файли які зберігають всі зміни структури БД.
Замість того щоб вручну міняти таблиці і на локалці і на Railway —
пишеш один файл і запускаєш одну команду.

---

## Структура

```
server/db/
├── connection.js        ← підключення до БД
├── migrate.js           ← скрипт який запускає міграції
└── migrations/
    ├── 001_add_banned_to_users.sql
    ├── 002_add_founder_role.sql
    ├── 003_set_founder_user.sql
    └── 004_наступна_зміна.sql   ← твій новий файл
```

---

## Workflow — що робити при змінах у БД

### Крок 1 — Створи файл міграції

Назва завжди по порядку з описом:

```
004_add_avatar_to_users.sql
005_create_notifications_table.sql
```

### Крок 2 — Запиши SQL зміну

```sql
-- Додати колонку
ALTER TABLE users ADD COLUMN avatar VARCHAR(255) DEFAULT NULL;

-- Видалити колонку
ALTER TABLE users DROP COLUMN old_field;

-- Нова таблиця
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    text VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Змінити тип колонки або ENUM
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'client', 'founder', 'moderator') DEFAULT 'client';
```

### Крок 3 — Запусти локально

```bash
cd /media/viktor/projects/Fullstack/webstart-studio/server && npm run migrate
```

Очікуваний результат:

```
✅ MySQL підключено!
✅ Виконано: 004_add_avatar_to_users.sql
🎉 Міграції завершено
```

### Крок 4 — Пуш

```bash
git add . && git commit -m "feat: назва зміни" && git push
```

Railway автоматично застосує міграцію на проді.

---

## Важливі правила

- **Один файл = одна зміна** — не пиши кілька непов'язаних змін в один файл
- **Нумерація по порядку** — 001, 002, 003... скрипт виконує їх по порядку
- **Не редагуй старі файли** — якщо міграція вже виконана, створюй новий файл
- **Якщо файл вже в git** — він вже виконаний на Railway, не чіпай його

---

## Що робить migrate.js

1. Створює таблицю `migrations` якщо її немає
2. Читає всі `.sql` файли з папки `migrations/` по порядку
3. Перевіряє чи файл вже виконувався
4. Якщо ні — виконує і записує в таблицю `migrations`
5. Якщо так — пропускає

---

## Підключення

| Середовище     | DB_HOST                  | DB_PORT |
| -------------- | ------------------------ | ------- |
| Локалка        | `gondola.proxy.rlwy.net` | `37437` |
| Railway (прод) | `mysql.railway.internal` | `3306`  |
