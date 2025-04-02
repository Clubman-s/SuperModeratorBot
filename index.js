const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Фильтр матов
const badWords = ['спам', 'мат', 'хуй', 'пизда', 'бля']; // Добавь свои слова
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  if (badWords.some(word => text.includes(word))) {
    ctx.deleteMessage(); // Удаляет сообщение
    ctx.reply('❌ Сообщение удалено!'); // Отправляет предупреждение
  }
});

// Вебхук для Vercel
app.use(express.json());
app.post('/api', (req, res) => {
  bot.handleUpdate(req.body, res); // Обрабатывает запросы от Telegram
});

// Для проверки работоспособности (GET запрос)
app.get('/', (req, res) => res.send('Бот жив!'));

module.exports = app;
