const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Фикс для Vercel: явно указываем обработчик POST
app.use(express.json()); // Добавьте эту строку!
app.post('/api', bot.webhookCallback('/api'));

// Модерация
bot.on('text', (ctx) => {
  const badWords = ['спам', 'мат', 'оскорбление'];
  if (badWords.some(word => ctx.message.text.toLowerCase().includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено!');
  }
});

// Для проверки (GET /)
app.get('/', (req, res) => res.send('Use POST /api for Telegram webhook'));

module.exports = app;
