const {tepl} = require("../models/models");
const {Sequelize, Op} = require("sequelize");
const moment = require('moment');
class tempController {
    async getTemp(req, res) {
        let dayfirst = req.query
        let daylast = req.query
        let type = req.query
        console.log(daylast, dayfirst, type)
        let data = await tepl.findAll({
            attributes: [
                [Sequelize.col('dat'), 'data'],  // Выбираем дату
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col(type.type)), 2), 'temp']
            ],
            group: ['dat'], // Группируем по дате
            order: [['dat', 'ASC']],
            where: {
                [Op.and]: [
                {
                    dat: {
                        [Op.gt]: dayfirst.dayfirst
                    }
                },
                {
                    dat: {
                        [Op.lte]: daylast.daylast
                    }
                }
            ]
            }
             // Сортируем по возрастанию даты
        });

        let counts = data.map(item => item.dataValues.temp);
        let dates = data.map(item => item.dataValues.data);

        return res.json({dates, counts});
    }

    async getTempDay(req, res) {
        let day = req.query.day;
        let type = req.query
        console.log(day, type)
        let data = await tepl.findAll({
            attributes: [
                [Sequelize.fn('DATEPART', Sequelize.literal('hour'), Sequelize.col('tim')), 'hour'],   // Округляем временные метки до часа
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col(type.type)), 2), 'temp'] // Считаем среднюю температуру
            ],
            where: {
                dat: day
            },
            group:  [Sequelize.fn('DATEPART', Sequelize.literal('hour'), Sequelize.col('tim'))],  // Группируем по часу времени и временному метку
            order: [[Sequelize.col('hour'), 'ASC']]
        });

        let counts = data.map(item => item.dataValues.temp);
        let dates = data.map(item => item.dataValues.hour);
        console.log(dates)
        console.log(counts)
        return res.json({ dates, counts });
    }

    async getHumidityday(req, res) {
        let type = req.query
        let day = req.query.day;
        console.log(day, type)
        let data = await tepl.findAll({
            attributes: [
                [Sequelize.fn('DATEPART', Sequelize.literal('hour'), Sequelize.col('tim')), 'hour'],   // Округляем временные метки до часа
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col(type.type)), 2), 'humidity'] // Считаем среднюю температуру
            ],
            where: {
                dat: day
            },
            group:  [Sequelize.fn('DATEPART', Sequelize.literal('hour'), Sequelize.col('tim'))],  // Группируем по часу времени и временному метку
            order: [[Sequelize.col('hour'), 'ASC']]
        });

        let counts = data.map(item => item.dataValues.humidity);
        let dates = data.map(item => item.dataValues.hour);
        console.log(dates)
        console.log(counts)
        return res.json({ dates, counts });
    }

    async getHumidity(req, res) {
        let dayfirst = req.query
        let daylast = req.query
        let type = req.query
        console.log(daylast, dayfirst, type)
        let data = await tepl.findAll({
            attributes: [
                [Sequelize.col('dat'), 'data'],  // Выбираем дату
                [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col(type.type)), 2), 'humidity']
            ],
            group: ['dat'], // Группируем по дате
            order: [['dat', 'ASC']],
            where: {
                [Op.and]: [
                {
                    dat: {
                        [Op.gt]: dayfirst.dayfirst
                    }
                },
                {
                    dat: {
                        [Op.lte]: daylast.daylast
                    }
                }
            ]
            }
             // Сортируем по возрастанию даты
        });

        let counts = data.map(item => item.dataValues.humidity);
        let dates = data.map(item => item.dataValues.data);

        return res.json({dates, counts});
    }
}

module.exports = new tempController()
