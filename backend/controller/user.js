const User = require("../model/user");
const Transaction = require("../model/transaction");

//đăng nhập
exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  //kiểm tra username đã tồn tại chưa
  //có: phản hồi status thành công và dữ liệu người dùng
  //không:phản hồi lỗi
  const users = await User.find({ username: username, password: password });
  if (users.length > 0) {
    return res.status(200).send({ user: users });
  } else {
    return res.status(400).send({ message: "no user" });
  }
};

//đăng ký
exports.createUser = async (req, res, next) => {
  //lấy dữ liệu requset
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const isAdmin = false;
  //kiểm tra username đã tồn tại chưa
  //có: phản hồi lỗi
  //không: tạo user và lưu vào collection, phản hồi status thành công
  const users = await User.find({ username: username });
  if (users.length > 0) {
    return res.status(400).send({ message: "Username is existed" });
  } else {
    const user = new User({
      username: username,
      password: password,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      isAdmin: isAdmin,
    });
    await user.save();
    return res.status(200).send({ message: "success" });
  }
};

//sửa dũ liệu người dùng ở hành động tạo transaction của người dùng
exports.editUser = async (req, res, next) => {
  const body = req.body;
  //tìm user dựa vào userID, cập nhật thông tin và lưu, gửi phàn hồi user mới
  const user = await User.findById(body.userID);
  user.fullName = body.fullName;
  user.phoneNumber = body.phoneNumber;
  user.email = body.email;
  user.cardNumber = body.cardNumber;
  await user.save();
  const users = await User.findById(body.userID);
  res.status(200).send({ user: users });
};

exports.getTransaction = async (req, res, next) => {
  const params = req.params;
  let transactionsHotel = [];
  //lấy dữ liệu transaction dừa vào username
  const transactions = await Transaction.find({ user: params.userID });
  //lấy thêm dữ liêu của khách sạn
  for (const transaction of transactions) {
    const trans = await transaction.populate("hotel");
    transactionsHotel.push(trans);
  }
  //gửi phản hồi
  res.status(200).send({ transactions: transactionsHotel });
};

exports.postTransaction = async (req, res, next) => {
  const body = req.body;
  //tạo transaction và lưu, gửi phản hồi thành công
  const transaction = new Transaction({
    user: body.user,
    hotel: body.hotel,
    room: body.room,
    dateStart: body.dateStart,
    dateEnd: body.dateEnd,
    price: body.price,
    payment: body.payment,
    status: body.status,
  });
  await transaction.save();
  res.status(200).send({ message: "created transaction" });
};
