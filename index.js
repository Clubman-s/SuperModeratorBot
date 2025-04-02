const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Обработчик для GET / (проверка работоспособности)
app.get('/', (req, res) => {
  res.status(200).send('Бот работает! Используйте POST /api для Telegram вебхука');
});

// Вебхук для Telegram (POST /api)
app.post('/api', express.json(), (req, res) => {
  console.log('Получен запрос от Telegram:', req.body);
  bot.handleUpdate(req.body, res);
});

// Модерация сообщений
bot.on('text', (ctx) => {
  const badWords = ['спам', 'мат', 'оскорбление'];
  if (badWords.some(word => ctx.message.text.toLowerCase().includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено за нарушение правил!');
  }
});

module.exports = app;
