const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Модерация
const badWords = ['спам', 'мат', 'оскорбление'];
bot.on('text', (ctx) => {
  if (badWords.some(word => ctx.message.text.toLowerCase().includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено!');
  }
});

// Вебхук
app.use(bot.webhookCallback('/api'));
module.exports = app;
