const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Явно указываем обработчик для POST /api
app.post('/api', express.json(), (req, res) => {
  console.log('Тело запроса:', req.body); // Логируем входящие данные
  bot.handleUpdate(req.body, res);
});

// Модерация сообщений
bot.on('text', (ctx) => {
  const badWords = ['спам', 'мат', 'бля'];
  if (badWords.some(word => ctx.message.text.toLowerCase().includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Нарушение правил!');
  }
});

// Для проверки работоспособности
app.get('/', (req, res) => res.send('Бот работает!'));

module.exports = app;
