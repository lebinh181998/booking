const expess = require("express");

const router = expess.Router();

const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/signup", userController.createUser);
router.post("/edit-user", userController.editUser);
router.get("/transactions/:userID", userController.getTransaction);
router.post("/create-transaction", userController.postTransaction);

module.exports = router;
