const Router = require('express')
const router = new Router()
const tempController = require("../controllers/teplController");
//импортируем контроллер

router.get('/', tempController.getTemp)
router.get('/day', tempController.getTempDay)
router.get('/humidity', tempController.getHumidity)
router.get('/humidityday', tempController.getHumidityday)

module.exports = router