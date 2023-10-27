const Hotel = require("../model/hotel");
const Transaction = require("../model/transaction");
const User = require("../model/user");
const Room = require("../model/room");

//lấy 8 giao dịch mới nhất
exports.getTransactionsLatest = async (req, res, next) => {
  const transations = await Transaction.find()
    .populate("user")
    .populate("hotel");
  let transactionsLatest = [];
  let plus = 1;
  for (const transaction of transations.reverse()) {
    if (plus <= 8) {
      transactionsLatest.push(await transaction);
      plus++;
    } else {
      break;
    }
  }
  res.status(200).send(transactionsLatest);
};

//lấy các dữ liệu cho các infoBoaed
exports.getInfoBoard = async (req, res, next) => {
  const users = await User.find({ isAdmin: false });
  const transactions = await Transaction.find();
  let income = 0;
  transactions.map((item) => {
    const date =
      new Date(item.dateEnd).getDate() - new Date(item.dateStart).getDate() + 1;
    const totalPrice = item.price * date;
    income += totalPrice;
  });
  res.status(200).send({
    userCount: users.length,
    transactionCount: transactions.length,
    income: income,
    averageIncomeByMonth: income / 12,
  });
};

//tạo 1 khách sạn
exports.postAddHotel = async (req, res, next) => {
  const body = req.body;
  const hotel = new Hotel({
    name: body.name,
    type: body.type,
    city: body.city,
    address: body.address,
    distance: body.distance,
    title: body.title,
    desc: body.desc,
    cheapestPrice: body.cheapestPrice,
    photos: body.photos,
    featured: body.featured,
    rooms: body.rooms,
  });
  await hotel.save();
  res.status(200).send({ message: "created new hotel" });
};

//lấy khách sạn cần chỉnh sửa
exports.getEditHotel = async (req, res, next) => {
  const hotelID = req.params.hotelID;
  //lấy dữ liệu khách sạn dựa vào hotelID
  const hotel = await Hotel.findById(hotelID).populate("rooms");
  //gửi phản hồi dữ liệu
  res.status(200).send({ hotel: hotel });
};
//chỉnh sửa 1 khách sạn
exports.postEditHotel = async (req, res, next) => {
  const body = req.body;

  const hotel = await Hotel.findById(body.hotelID);
  hotel.name = body.name;
  hotel.type = body.type;
  hotel.city = body.city;
  hotel.address = body.address;
  hotel.distance = body.distance;
  hotel.title = body.title;
  hotel.desc = body.desc;
  hotel.cheapestPrice = body.cheapestPrice;
  hotel.photos = body.photos;
  hotel.featured = body.featured;
  hotel.rooms = body.rooms;
  await hotel.save();
  res.status(200).send({ message: "edited the hotel" });
};

//xoá 1 khách sạn
exports.getDeleteHotel = async (req, res, next) => {
  const hotelID = req.params.hotelID;
  //kiẻm tra khách sạn đã nằm trong giao dịch nào chưa
  //có: không được xoá và gửi phản hồi
  //không: xoá khách sạn dựa vào hotelID và gửi phản hồi
  const transactions = await Transaction.find({ hotel: hotelID });
  if (transactions.length > 0) {
    return res.status(400).send({ message: "Cannot delete this hotel" });
  }
  await Hotel.findByIdAndRemove(hotelID);
  const hotels = await Hotel.find();
  if (hotels.length > 0) {
    return res.status(200).send({ hotels: hotels });
  } else {
    return res.status(400).send({ message: "no hotel" });
  }
};

//lấy tất cả phòng
exports.getRooms = async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).send({ rooms: rooms });
};

//xoá 1 phòng
exports.getDeleteRoom = async (req, res, next) => {
  const roomID = req.params.roomID;
  //kiẻm tra phòng đã được đặt chưa
  //có: không được xoá và gửi phản hồi
  //không: xoá phòng dựa vào roomlID và gửi phản hồi, tìm khách sạn có mảng rooms chứa roomID và xoá roomID đó khỏi mảng rooms
  const transactions = await Transaction.find({
    "room._id": roomID,
  });
  if (transactions.length > 0) {
    return res.status(400).send({ message: "Cannot delete this room" });
  }

  await Room.findByIdAndRemove(roomID);
  //tìm khách sạn có mảng rooms chứa roomID và xoá roomID đó khỏi mảng rooms
  const hotels = await Hotel.find({ rooms: roomID });
  for (const hotel of hotels) {
    hotel.rooms = hotel.rooms.filter((item) => item != roomID);
    await hotel.save();
  }

  const rooms = await Room.find();
  if (rooms.length > 0) {
    return res.status(200).send({ rooms: rooms });
  } else {
    return res.status(400).send({ message: "no room" });
  }
};

//tạo 1 phòng
exports.postAddRoom = async (req, res, next) => {
  const body = req.body;
  const room = new Room({
    title: body.title,
    desc: body.desc,
    price: body.price,
    maxPeople: body.maxPeople,
    roomNumbers: body.roomNumbers,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await room.save();
  //kiểm tra người dùng có chọn khách sạn
  //có: thêm _id của room vừa tạo vào mảng rooms của khách san được chọn
  if (body.hotelID) {
    const hotel = await Hotel.findById(body.hotelID);
    hotel.rooms = [...hotel.rooms, room._id];
    await hotel.save();
  }
  res.status(200).send({ message: "created new room" });
};

//lấy phòng cần chỉnh sửa
exports.getEditRoom = async (req, res, next) => {
  const roomID = req.params.roomID;
  //lấy dữ liệu khách sạn dựa vào hotelID
  const room = await Room.findById(roomID);
  //gửi phản hồi dữ liệu
  res.status(200).send({ room: room });
};
//chỉnh sửa 1 phòng
exports.postEditRoom = async (req, res, next) => {
  const body = req.body;
  const room = await Room.findById(body.roomID);
  room.title = body.title;
  room.desc = body.desc;
  room.price = body.price;
  room.maxPeople = body.maxPeople;
  room.roomNumbers = body.roomNumbers;
  room.updatedAt = new Date();
  await room.save();
  res.status(200).send({ message: "edited the room" });
};

//lấy tất cả transaction
exports.getTransactions = async (req, res, next) => {
  const transactions = await Transaction.find()
    .populate("user")
    .populate("hotel");
  res.status(200).send({ transactions: transactions });
};
