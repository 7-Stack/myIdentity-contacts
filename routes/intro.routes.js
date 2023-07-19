const express = require("express");
const router = express.Router();
const introController = require("../controllers/introController");

router.route("/")
.get(introController.getAllIdentity)
.post(introController.createIdentity);

router.route("/id")
.get(introController.getIdentity)
.put(introController.updateIdentity)
.delete(introController.deleteIdentity);

module.exports = router;