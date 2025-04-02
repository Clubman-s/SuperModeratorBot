const { Telegraf } = require('telegraf');
const express = require('express');
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());
app.post('/api', (req, res) => bot.handleUpdate(req.body, res));

bot.on('text', (ctx) => ctx.reply('Бот жив. Получил: ' + ctx.message.text));

module.exports = app;
