const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Обработчик для GET / (чтобы Vercel не ругался)
app.get('/', (req, res) => res.send('Бот работает! Используйте POST /api для Telegram'));

// Основной обработчик для Telegram
app.post('/api', express.json(), (req, res) => {
  console.log('Получен запрос от Telegram');
  bot.handleUpdate(req.body, res);
});

// Простейший обработчик сообщений
bot.on('text', (ctx) => {
  ctx.reply('Получил ваше сообщение: ' + ctx.message.text);
});

module.exports = app;
