const router = require("express").Router();
const userRoutes = require("./users");
const signInRoutes = require("./signIn");

// User routes
router.use("/", userRoutes);
router.use("/", signInRoutes);

module.exports = router;
