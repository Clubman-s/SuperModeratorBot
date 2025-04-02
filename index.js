const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Вебхук (POST-обработчик)
app.post('/api', bot.webhookCallback('/api'));

// Модерация
const badWords = ['спам', 'мат', 'оскорбление'];
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  if (badWords.some(word => text.includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено!');
  }
});

// GET-запрос для проверки (опционально)
app.get('/', (req, res) => res.send('Бот работает!'));

module.exports = app;
