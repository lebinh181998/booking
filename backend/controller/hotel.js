const Hotel = require("../model/hotel");
const Transaction = require("../model/transaction");
const mongodb = require("mongodb");

//các hàm rút gọn
//tạo chuỗi không dấu
const noVietnamese = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
//tạo ngày
const createDate = (date) => {
  const newDate = new Date(date);
  return newDate;
};

//-------------------------------------

//lấy tất cả khách sạn
exports.getHotels = async (req, res, next) => {
  //lấy tất cả khách sạn và gửi phản hồi
  const hotels = await Hotel.find();
  if (hotels.length > 0) {
    return res.status(200).send({ hotels: hotels });
  } else {
    return res.status(400).send({ message: "no hotel" });
  }
};

//lấy khách sạn dựa vào các dữ liệu request tìm kiếm
exports.getHotelsBySearchKeys = async (req, res, next) => {
  //lấy dữ liệu từ request
  const city = req.body.city;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const roomCount = req.body.roomCount;
  const peopleCount = req.body.peopleCount;
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  const hotelID = req.body.hotelID;
  // console.log(city, dateStart, dateEnd, minPrice, maxPrice, roomCount);

  //lấy dữ liệu của tất cả hotel  có thộc tính rooms chứa thông tin từng room
  let hotelsFilter = [];
  hotelsFilter = await Hotel.find().populate("rooms");

  // console.log(hotelsFilter);

  //lấy khách sạn dựa vào city
  hotelsFilter = city
    ? hotelsFilter.filter(
        (item) =>
          noVietnamese(item.city).toLowerCase() ===
          noVietnamese(city).toLowerCase()
      )
    : hotelsFilter;

  //lấy khách sạn dựa vào maxPrice va minPrice
  if (maxPrice && minPrice && minPrice < maxPrice) {
    hotelsFilter = hotelsFilter.map((hotel) => {
      hotel.rooms = hotel.rooms.filter((room) => {
        if (room.price >= minPrice && room.price <= maxPrice) return room;
      });
      return { ...hotel._doc };
    });
  }
  //lấy khách sạn dựa vào hotelID
  hotelsFilter = hotelID
    ? hotelsFilter.filter(
        (item) =>
          item._id.toString() === new mongodb.ObjectId(hotelID).toString()
      )
    : hotelsFilter;

  //lọc khách sạn dựa vào yêu cầu thời gian và số phòng
  let hotelsRoom = [];
  for (const item of hotelsFilter) {
    //tạo các biến chứa mảng các phòng
    let roomsFilter = [];
    let roomsHotel = [];
    let roomsTransaction = [];

    //lấy phòng với múc đích đem so sánh với các phòng đã được đặt hoặc đang được sử dụng trong transaction
    //mảng tất cả phòng trong 1 khách sạn
    for (const room of item.rooms) {
      const roomNumbers = room.roomNumbers.map((rn) => {
        return { _id: room._id, roomNumber: rn };
      });
      roomsHotel = [...roomsHotel, ...roomNumbers];
    }

    //lấy transaction với mục đích lấy số phòng đã đặt dụa vào thời gian
    //từ dó lấy số phòng đã được đặt hoặc đang được sử dụng và so sánh với các phòng khách sạn hiện có để lấy số phòng còn trống
    //lấy các transaction của 1 khách sạn
    let transactions = await Transaction.find({ hotel: item._id });

    //kiểm tra dữ liệu transaction có tồn tại
    //có: lọc các transaction dựa vào yêu cầu thời gian
    if (transactions.length > 0 && dateStart && dateEnd) {
      transactions = transactions.filter(
        (item) =>
          (item.dateStart.getTime() <= createDate(dateStart).getTime() &&
            item.dateEnd.getTime() >= createDate(dateStart).getTime()) ||
          (item.dateStart.getTime() <= createDate(dateEnd).getTime() &&
            item.dateEnd.getTime() >= createDate(dateEnd).getTime()) ||
          (item.dateStart.getTime() >= createDate(dateStart).getTime() &&
            item.dateEnd.getTime() <= createDate(dateEnd).getTime())
      );
      //lấy các transaction chưa checkout
      transactions = transactions.filter(
        (item) => item.status === "Checkin" || item.status === "Booked"
      );
      //lấy mảng các phòng trong transaction
      transactions.map((transaction) => {
        let rooms = [];
        transaction.room.map((item) =>
          item.roomNumbers.map((rn) => rooms.push(item._id + "" + rn))
        );
        roomsTransaction = [...roomsTransaction, ...rooms];
      });
    }

    //lấy mảng các phòng còn trống trong 1 khách sạn dựa vào so sánh 2 mảng roomsHotel và transaction
    //roomsHotel: tất cả phòng trong 1 khách sạn
    //transaction: các phòng đã được đặt hoặc đang được sử dụng
    roomsFilter = roomsHotel.filter(
      (item) =>
        roomsTransaction.includes(item._id + "" + item.roomNumber) === false
    );

    //lấy các thể loại phòng chứa roomNumbers còn trống
    let rooms = [];
    //lọc qua từng loại phòng trong rooms của 1 khách sạn
    item.rooms.map((room) => {
      let roomNumbers = [];
      //kiểm tra những loại phòng chứa phòng còn trống
      //có: thêm vào mảng roomNumbers mới để lưu vào loại phòng
      roomsFilter.map((item, i) => {
        if (item._id == room._id) {
          if (room.roomNumbers.includes(item.roomNumber) === true) {
            roomNumbers.push(item.roomNumber);
            //kiểm tra loại phòng có tồn tại trong mảng rooms mới chưa
            //không: thêm vào mảng rooms mới
            if (!rooms.find(({ _id }) => _id === room._id)) {
              rooms.push(room);
            }
          }
        }
      });
      //lưu mảng roomNumbers mới vào loai phòng
      room.roomNumbers = roomNumbers;
    });
    //lưu mảng rooms mới vào khách sạn
    item.rooms = rooms;

    //tạo dữ liệu khách sạn mới chứa số phòng còn trống
    const hotel = await {
      ...(item._doc ? item._doc : item),
      roomsFilter: roomsFilter,
    };
    hotelsRoom.push(await hotel);

    //kiểm tra người dùng có yêu  cầu số lượng phòng
    //có : lọc khách sạn có số lượng phòng trống đạt yêu cầu
    if (roomCount) {
      hotelsRoom.filter((item) => item.roomsFilter.length >= Number(roomCount));
    }
  }

  //lấy các khách sạn sau khi lọc
  hotelsFilter = hotelsRoom;
  // console.log(hotelsFilter);

  return res.send(hotelsFilter);
};

//lấy dữ liệu 1 khách sạn
exports.getHotel = async (req, res, next) => {
  const hotelID = req.params.hotelID;
  //lấy dữ liệu khách sạn dựa vào hotelID
  const hotel = await Hotel.findById(hotelID);
  //lấy thêm dữ liệu rooms
  const hotelRooms = await hotel.populate("rooms");
  //gửi phản hồi dữ liệu
  res.send(hotelRooms);
};
