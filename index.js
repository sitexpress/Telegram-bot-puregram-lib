const { Telegram, RemoveKeyboard, InlineKeyboard } = require('puregram')
const { messages } = require('./src/messages')
const http = require('http');
const {
    createProfileKeyboard,
    createRoleKeyboard,
    createExperience,
    skip,
    createConfirmation
} = require('./src/keyboards')
require('dotenv').config()

const hostname = 'localhost';
const port = 5222

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

const telegram = Telegram.fromToken(process.env.BOT_TOKEN)
const roles = ['Backend','Frontend','Mobile','DevOps','QA','Marketing','PM','PO','CTO','CEO','CPO','UI Designer']
const experiences = ['До года','1-3 года','3-5 лет','Свыше 5 лет','Не работаю']
const userData = {
    role: null,
    experience: null,
    stack: null,
    linkedIn: null,
}



server.listen(port,  hostname,() => {
    console.log(`Server running at https://${hostname}:${port}/`);


    telegram.updates.on('message', async (context) => {
        try {
            if(context.text === '/start') {
                await context.send(messages.start, { reply_markup: createProfileKeyboard })
            }

            if (context.text === '/cancel') {
                await context.send('Действие отменено. Вы можете начать заново, набрав /start',{reply_markup: new RemoveKeyboard()})
            }

            if(context.text === 'Создать профиль') {
                await context.send(messages.role, {reply_markup: createRoleKeyboard})
            }

            if(roles.filter(role => role === context.text).length > 0) {
                await context.send(messages.experience, {reply_markup: createExperience})
                console.log('role:',context.text)
                userData.role = context.text
            }

            if(experiences.filter(exp => exp === context.text).length > 0) {
                await context.send(messages.stack, {reply_markup: new RemoveKeyboard()})
                userData.experience = context.text
            }

            if(context.text.split(',').length > 1 && context.text !== '/start' && context.text !== '/cancel') {
                await context.send(messages.linkedInLink,{reply_markup: skip})
                userData.stack = context.text
            }

            if(
                context.text.split('/').filter(el => el !== '')[0] === 'https:' ||
                // &&
                // context.text.split('/').filter(el => el !== '')[1] === 'www.linkedin.com' &&
                // context.text.split('/').filter(el => el !== '')[2] === 'in' &&
                // context.text.split('/').filter(el => el !== '').length === 4 &&
                // context.text.split('/').filter(el => el !== '')[3].toString().split('-').length === 3 ||
                context.text === 'Пропустить'
            ) {
                userData.linkedIn = context.text
                await context.send('Проверь все еще раз и если все правильно, подтверди.\n' +
                    '\n' +
                    'Если что-то не так, просто пройди анкету сначала и данные обновятся.\n' +
                    '\n' +
                    `Роль: ${userData.role}\n` +
                    `Опыт: ${userData.experience}\n` +
                    `Стек: ${userData.stack}\n` +
                    `LinkedIn: ${userData.linkedIn}\n`,{reply_markup: createConfirmation})
            }

            if(context.text === 'Отмена') {
                await context.send('Чтобы начать с заново, наберите /start', {reply_markup: new RemoveKeyboard()})
            }

            if(context.text === 'Подтвердить') {
                await context.send('Спасибо, что заполнил профиль!', {reply_markup: new RemoveKeyboard()})
                await context.send('Вот ссылка на наш Telegram-канал', {reply_markup: InlineKeyboard.keyboard([
                        [
                            InlineKeyboard.urlButton({
                                text: 'Peredelano Startup',
                                url: process.env.GROUP_PRIVATE_LINK,
                            })
                        ]
                    ])
                })
            }

        } catch(e) {
            await context.send('Что-то пошло не так, попробуйте начать с заново, набрав /start')
            console.error(e)
        }
    })
});

telegram.updates.startPolling()

