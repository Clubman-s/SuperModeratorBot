const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Блокируем все GET-запросы к /api
app.use('/api', (req, res, next) => {
  if (req.method === 'GET') {
    console.log('🚫 Блокируем GET к /api');
    return res.status(405).send('Method Not Allowed');
  }
  next();
});

// Обработчик POST-запросов от Telegram
app.post('/api', express.json(), (req, res) => {
  console.log('🔹 Telegram Update:', JSON.stringify(req.body, null, 2));
  bot.handleUpdate(req.body, res);
});

// Тестовая страница
app.get('/', (req, res) => {
  res.send('Бот работает! Отправьте POST на /api');
});

// Обработчик сообщений
bot.on('text', (ctx) => {
  console.log('✉️ Сообщение:', ctx.message.text);
  ctx.reply('Получено: ' + ctx.message.text);
});

module.exports = app;
