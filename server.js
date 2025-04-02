const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Вебхук для Telegram
app.use(express.json());
app.post('/webhook', (req, res) => {
  console.log('📨 Получен запрос:', req.body);
  bot.handleUpdate(req.body, res);
});

// Модерация сообщений
const badWords = ['спам', 'мат', 'оскорбление'];
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  if (badWords.some(word => text.includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено за нарушение правил!');
  } else {
    console.log('Сообщение разрешено:', text);
  }
});

// Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Устанавливаем вебхук при старте
bot.telegram.setWebhook(`https://${process.env.PROJECT_DOMAIN}.glitch.me/webhook`)
  .then(() => console.log('Вебхук установлен!'));
