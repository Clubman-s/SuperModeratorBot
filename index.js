const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Журналирование ВСЕХ запросов
app.use((req, res, next) => {
  console.log('📨 Получен запрос:', req.method, req.url, req.headers);
  next();
});

// Явный обработчик вебхука
app.post('/api', express.json(), (req, res) => {
  console.log('🔹 Тело запроса от Telegram:', JSON.stringify(req.body));
  bot.handleUpdate(req.body, res); // Передаём запрос боту
});

// Тестовая GET-страница
app.get('/', (req, res) => {
  console.log('🔄 Кто-то проверил бота через GET');
  res.send('Бот активен! Используйте POST /api для вебхука');
});

// Обработчик сообщений
bot.on('text', (ctx) => {
  console.log('✉️ Получено сообщение:', ctx.message.text);
  ctx.reply('Ваше сообщение: ' + ctx.message.text);
});

module.exports = app;
