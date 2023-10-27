const expess = require("express");

const router = expess.Router();

const adminController = require("../controller/admin");
const hotelController = require("../controller/hotel");

router.get("/admin/transactions-latest", adminController.getTransactionsLatest);

router.get("/admin/infoboard", adminController.getInfoBoard);

router.get("/admin/hotels", hotelController.getHotels);
router.get("/admin/delete-hotel/:hotelID", adminController.getDeleteHotel);
router.post("/admin/new-hotel", adminController.postAddHotel);
router.get("/admin/edit-hotel/:hotelID", adminController.getEditHotel);
router.post("/admin/edit-hotel", adminController.postEditHotel);

router.get("/admin/rooms", adminController.getRooms);
router.get("/admin/delete-room/:roomID", adminController.getDeleteRoom);
router.post("/admin/new-room", adminController.postAddRoom);
router.get("/admin/edit-room/:roomID", adminController.getEditRoom);
router.post("/admin/edit-room", adminController.postEditRoom);

router.get("/admin/transactions", adminController.getTransactions);

module.exports = router;
