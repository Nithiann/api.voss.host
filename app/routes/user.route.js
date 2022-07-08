const router = require('express').Router();
const controller = require('../controllers/user.controller');
const commonController = require('../controllers/common.controller');

router.get("/", controller.GET);
router.post("/", controller.VERIFY, commonController.hash, controller.POST);
// router.put("/:id", controller.PUT);
router.delete("/:id", controller.DELETE);

module.exports = router