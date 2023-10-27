const expess = require("express");

const router = expess.Router();

const hotelController = require("../controller/hotel");

router.get("/hotels", hotelController.getHotels);
router.get("/detail/:hotelID", hotelController.getHotel);
router.post("/search", hotelController.getHotelsBySearchKeys);

module.exports = router;
