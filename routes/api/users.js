const router = require("express").Router();
const usersController = require("../../controllers/userController");
const roomsController = require("../../controllers/roomController");
const messagesController = require("../../controllers/messageController");

// router
//     .route("/user/test/:id")
//     .get(usersController.findTest);

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

router
    .route("/room/id/:id")
    .get(roomsController.findById);

router
    .route("/room/name/:name")
    .get(roomsController.findByName);

router
    .route("/room/user/:id")
    .get(roomsController.findByUser);

router 
    .route("/room/users")
    .get(roomsController.findByUsers);

router
    .route("/message/all")
    .get(messagesController.findAll);

router
    .route("/message/uid/:id")
    .get(messagesController.findByUserId);

router
    .route("/message/rid/:id")
    .get(messagesController.findByRoomId);


router
    .route("/request/users")
    .put(usersController.requestUser);

router
    .route("/location/user")
    .put(usersController.updateLocationUser);

router
    .route("/cancel/users")
    .put(usersController.cancelUser);

router
    .route("/active/users")
    .put(usersController.activeUser);
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
