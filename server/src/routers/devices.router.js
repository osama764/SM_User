const express = require("express");
const router = express.Router();

const { updateDevice } = require("../controllers/devices.controller");

router.patch("/", updateDevice);

module.exports = router;
