import {IpAPI, HotelAPI} from "./api.js";
import {loadRoomNumber, loadBookingList} from "./hotel_booking.js";
IpAPI();
HotelAPI();
loadRoomNumber();
loadBookingList();