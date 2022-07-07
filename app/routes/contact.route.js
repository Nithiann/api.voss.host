const router = require('express').Router();
const controller = require('../controllers/contact.controller');

router.get("/", controller.GET);
// router.post("/", controller.POST);
// router.put("/:id", controller.PUT);
// router.delete("/:id", controller.DELETE);

module.exports = router