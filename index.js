const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Включаем максимальное логирование
bot.use((ctx, next) => {
  console.log('📨 Update:', ctx.update);
  return next();
});

// Простейший обработчик
bot.on('text', (ctx) => {
  console.log('💬 Received:', ctx.message.text);
  ctx.reply('Бот работает! Ваш текст: ' + ctx.message.text);
});

// Экспортируем обработчик для Vercel
module.exports = bot.webhookCallback('/api');
