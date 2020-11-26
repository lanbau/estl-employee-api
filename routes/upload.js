var express = require('express');
var router = express.Router();
const controller = require("../controller/file.controller");

router.post('/', controller.uploadSingle);

module.exports = router;
