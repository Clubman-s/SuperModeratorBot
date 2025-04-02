const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Настройка вебхука (только для POST!)
app.post('/api', bot.webhookCallback('/api'));

// Модерация сообщений
const badWords = ['спам', 'мат', 'оскорбление'];
bot.on('text', (ctx) => {
  if (badWords.some(word => ctx.message.text.toLowerCase().includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено!');
  }
});

// Обработчик для GET (опционально, только для проверки)
app.get('/', (req, res) => {
  res.send('Бот работает! Отправьте POST-запросы на /api');
});

module.exports = app;
