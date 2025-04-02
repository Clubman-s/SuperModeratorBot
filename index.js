const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Удалите вызов setWebhook из кода!
app.use(bot.webhookCallback('/api')); // Путь должен совпадать с URL вебхука

bot.on('text', (ctx) => {
  console.log('Получено сообщение:', ctx.message.text);
  ctx.reply('Бот активен!');
});

module.exports = app;
