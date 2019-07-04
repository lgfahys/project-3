const router = require("express").Router();
const usersController = require("../../controllers/userController");


router
    .route("/testquery")
    .get(usersController.findAll);


// Matches with "/api/allusers"
router
    .route("/allusers")
    .get(usersController.findAll);
//     .post(booksController.create);

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
