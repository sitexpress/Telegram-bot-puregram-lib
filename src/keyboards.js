const { KeyboardBuilder } = require('puregram')

const createProfileKeyboard = new KeyboardBuilder()
    .textButton('Создать профиль')
    .resize() // keyboard will be much smaller

const createRoleKeyboard = new KeyboardBuilder()
    .textButton('Backend')
    .textButton('Frontend')
    .textButton('Mobile')
    .resize()
    .row()
    .textButton('DevOps')
    .textButton('QA')
    .textButton('Marketing')
    .resize()
    .row()
    .textButton('PM')
    .textButton('PO')
    .textButton('CTO')
    .resize()
    .row()
    .textButton('CEO')
    .textButton('CPO')
    .textButton('UI Designer')
    .resize()
    .row()

const createExperience = new KeyboardBuilder()
    .textButton('До года')
    .textButton('1-3 года')
    .textButton('3-5 лет')
    .resize()
    .row()
    .textButton('Свыше 5 лет')
    .textButton('Не работаю')
    .resize()
    .row()

const skip = new KeyboardBuilder()
    .textButton('Пропустить')
    .resize() // keyboard will be much smaller

const createConfirmation = new KeyboardBuilder()
    .textButton('Подтвердить')
    .textButton('Отмена')
    .resize()
    .row()



module.exports = {
    createProfileKeyboard,
    createRoleKeyboard,
    createExperience,
    skip,
    createConfirmation,
}

