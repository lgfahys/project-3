const router = require("express").Router();
const userRoutes = require("./users");

// User routes
router.use("/", userRoutes);

module.exports = router;
