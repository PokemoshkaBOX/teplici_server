const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
}, {
  timestamps: false, // Отключает автоматическое добавление полей createdAt
  tableName: 'user' // явное указание имени таблицы
})

const tepl = sequelize.define('tepl',{
    unixtime: {type: DataTypes.STRING, unique: true, field: 'unixtime'},
    dat: {type: DataTypes.DATEONLY, field: 'dat'},
    tim: {type: DataTypes.STRING, field: 'tim'},
    dustpm2: {type: DataTypes.FLOAT, field: 'dustpm2'},
    dustpm10: {type: DataTypes.FLOAT, field: 'dustpm10'},
    temp: {type: DataTypes.FLOAT, field: 'temp'},
    humidity: {type: DataTypes.FLOAT, field: 'humidity'},
    dewpoint: {type: DataTypes.FLOAT, field: 'dewpoint'},
}, {
    freezeTableName: true, // Запрещает автоматическое изменение имен таблиц Sequelize
  timestamps: false, // Отключает автоматическое добавление полей createdAt
  tableName: 'tepl' // явное указание имени таблицы
})

module.exports = {
    User,
    tepl
}