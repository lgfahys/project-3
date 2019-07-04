const router = require("express").Router();
const usersController = require("../../controllers/userController");
const roomsController = require("../../controllers/roomController");
const messagesController = require("../../controllers/messageController");

router
    .route("/user/test/:id")
    .get(usersController.findTest);

// Matches with "/api/user/all"
router
    .route("/user/all")
    .get(usersController.findAll);
//     .post(booksController.create);

// Matches with "/api/user/id/:id"
router
    .route("/user/id/:id")
    .get(usersController.findById);

// Matches with "/api/user/name/:name"
router
    .route("/user/name/:name")
    .get(usersController.findByName);


router
    .route("/room/all")
    .get(roomsController.findAll);

// // Matches with "/api/books/:id"
// router
//     .route("/:id")
//     .get(booksController.findById)
//     .put(booksController.update)
//     .delete(booksController.remove);

// Matched with "/api/books/*"
// router
//     .route("*")
//     .get();

module.exports = router;
