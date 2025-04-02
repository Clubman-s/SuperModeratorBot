const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Удаляет сообщения с плохими словами
const badWords = ['спам', 'мат', 'оскорбление'];
bot.on('text', (ctx) => {
  if (badWords.some(word => ctx.message.text.includes(word))) {
    ctx.deleteMessage();
    ctx.reply('❌ Сообщение удалено за нарушение правил!');
  }
});

bot.launch();
