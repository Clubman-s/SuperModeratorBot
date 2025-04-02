const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Включите максимальное логирование
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`, req.headers);
  next();
});

app.use(express.json());

// Главный обработчик
app.post('/api', (req, res) => {
  console.log('🔹 Тело запроса:', req.body);
  bot.handleUpdate(req.body, res);
});

// Обязательный GET-обработчик
app.get('/', (req, res) => res.send('Бот активен!'));

// Обработчик сообщений
bot.on('text', (ctx) => {
  console.log('✉️ Получено:', ctx.message.text);
  ctx.reply('Ответ: ' + ctx.message.text);
});

module.exports = app;
