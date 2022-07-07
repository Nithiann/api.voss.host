const router = require('express').Router();
const controller = require('../controllers/user.controller');
const commonController = require('../controllers/common.controller');

router.get("/", commonController.CSV_Reader);
// router.post("/", controller.POST);
// router.put("/:id", controller.PUT);
// router.delete("/:id", controller.DELETE);

module.exports = router