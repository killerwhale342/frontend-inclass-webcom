const API_URL = "http://127.0.0.1:8080";
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const roomSelect = document.getElementById("room_number");
const dateFrom = document.getElementById("date_from");
const dateTo = document.getElementById("date_to");
const guestRequest = document.getElementById("guest_request");
const okBtn = document.getElementById("ok-btn");
const bookingList = document.getElementById("booking_list");
export async function loadRoomNumber() {
    const res = await fetch(`${API_URL}/hotel`);
    const rooms = await res.json();
    roomSelect.innerHTML = "";
    rooms.forEach(room => {
        const option = document.createElement("option");
        option.value = room.id;
        option.textContent = `Room ${room.room_number}`;
        roomSelect.appendChild(option);
    });
};
export async function loadBookingList() {
    const res = await fetch(`${API_URL}/bookings`);
    const bookings = await res.json();
    bookingList.innerHTML = "";
    bookings.forEach(booking => {
        const li = document.createElement("li");
        li.textContent = `Room: ${booking.room_number} - ${booking.first_name} ${booking.last_name} - Date: ${booking.date_from} - ${booking.date_to}`;
        bookingList.appendChild(li);
    });
};
export async function booking() {
    if(!firstName.value || !lastName.value) return;
    if((!dateFrom.value || !dateTo.value) || (dateFrom.value > dateTo.value)) return;
    const guestRes = await fetch(`${API_URL}/guests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            first_name: firstName.value,
            last_name: lastName.value
        })
    });
    const guestData = await guestRes.json();
    const guestId = guestData.id;
    const bookingRes = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room_id: parseInt(roomSelect.value),
            guest_id: guestId,
            date_from: dateFrom.value,
            date_to: dateTo.value,
            other_info: guestRequest.value
        })
    });
    if(bookingRes.ok) loadBookingList();
};
okBtn.addEventListener("click", booking);