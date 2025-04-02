const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Логирование ВСЕХ входящих запросов
app.use((req, res, next) => {
  console.log('📨 Запрос:', req.method, req.url, req.headers);
  next();
});

// Обработчик для Telegram
app.post('/api', express.json(), (req, res) => {
  console.log('🔹 Тело запроса:', JSON.stringify(req.body, null, 2));
  bot.handleUpdate(req.body, res); // Передаём данные боту
});

// Модерация
bot.on('text', (ctx) => {
  const badWords = ['спам', 'мат', 'бля'];
  const text = ctx.message.text.toLowerCase();
  
  if (badWords.some(word => text.includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено!');
    console.log('Удалено:', text); // Логируем в Vercel
  }
});

// Для проверки (GET /)
app.get('/', (req, res) => res.send('Бот активен!'));

module.exports = app;
