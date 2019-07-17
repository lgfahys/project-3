const router = require("express").Router();
const usersController = require("../../controllers/userController");
const roomsController = require("../../controllers/roomController");
const messagesController = require("../../controllers/messageController");


// Matches with "/api/user/all"
router
    .route("/user/all")
    .get(usersController.findAll);
//     .post(booksController.create);

// Matches with "/api/user/id/:id"
router
    .route("/user/id/:id")
    .get(usersController.findById);

router
    .route("/user")
    .get(usersController.findBySession);

// Matches with "/api/user/name/:name"
router
    .route("/user/name/:name")
    .get(usersController.findByName);

router
    .route("/user/profile?")
    .get(usersController.getProfileByUser);

router
    .route("/room/all")
    .get(roomsController.findAll);

router
    .route("/room/id/:id")
    .get(roomsController.findById)
    .delete(roomsController.remove);

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

router
    .route("/deactive/users")
    .put(usersController.deactiveUser);

router
    .route("/reset/all")
    .put(usersController.resetDb);


// Authentication Routes

router
    .route("/accounts/signup")
    .post(usersController.createUser);

router
    .route("/accounts/signin")
    .post(usersController.signInUser);

router
    .route("/accounts/verify")
    .get(usersController.verifyUserToken);

router
    .route("/accounts/logout")
    .get(usersController.logoutUser);

// Edit Profile Routes

router
    .route("/accounts/edit")
    .put(usersController.editUser);

router
    .route("/useredit")
    .get(usersController.findBySessionEditProfile);

router
    .route("/accounts/editPassword")
    .put(usersController.editPassword);

module.exports = router;
