const express = require ("express");
const router = express.Router();
const {
    getAllIdentity, 
    createIdentity, 
    getIdentity,
    updateIdentity,
    deleteIdentity
} = require("../controllers/introController")

router.route("/").get(getAllIdentity).post(createIdentity);
// router.route("/:id").get(getIdentity);
router.route("/:id").put(updateIdentity).delete(deleteIdentity).get(getIdentity);

module.exports = router;