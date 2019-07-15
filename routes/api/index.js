const router = require("express").Router();
const mw = require("../../scripts/middleware");

const userRoutes = require("./users");

// Apply middleware for logging URL endpoints
router.use(mw.logger);

// User routes
router.use("/", userRoutes);

module.exports = router;
