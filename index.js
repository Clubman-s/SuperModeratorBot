const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Фикс для Vercel
app.use(express.json());
app.post('/api', (req, res) => {
  console.log('📢 Получен запрос от Telegram');
  bot.handleUpdate(req.body, res);
});

// Простейший обработчик
bot.on('text', (ctx) => {
  console.log('💬 Сообщение:', ctx.message.text);
  ctx.reply('Бот работает! Ваш текст: ' + ctx.message.text);
});

module.exports = app;
