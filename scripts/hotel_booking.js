const API_URL = "http://127.0.0.1:8080";
const API_KEY = "48b2c8292119154f909f348508a9eb1d69e44c175ced1788e4fd78e722a176b7";
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
window.saveStars = async function(booking_id, stars) {
    console.log(`booking ${booking_id} gets ${stars} stars`);
    await fetch(`${API_URL}/bookings/${booking_id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
            "X-API-Key":API_KEY
        },
        body:JSON.stringify({
            stars:parseInt(stars)
        })
    });
};
export async function loadBookingList() {
    const res = await fetch(`${API_URL}/bookings`, {
        headers: {'X-API-Key': API_KEY}
    });
    const bookings = await res.json();
    bookingList.innerHTML = "";
    bookings.forEach(booking => {
        bookingList.innerHTML += `
            <li class="mb-2">
                Room: ${booking.room_number} - 
                ${booking.first_name} ${booking.last_name} --- 
                Date: ${booking.date_from} - ${booking.date_to} (${booking.nights} nights) --- 
                Total price: €${booking.total_price} --- 
                <select id="stars-${booking.id}" onchange="saveStars(${booking.id}, this.value)" class="bg-[oklch(90.1%_0.058_230.902)] border-2 rounded-md">
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
            </li>
        `;
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
    //const guestData = await guestRes.json();
    //const guestId = guestData.id;
    const bookingRes = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', 
            'X-API-Key': API_KEY
        },
        body: JSON.stringify({
            room_id: parseInt(roomSelect.value),
            //guest_id: guestId,
            date_from: dateFrom.value,
            date_to: dateTo.value,
            other_info: guestRequest.value
        })
    });
    if(bookingRes.ok) loadBookingList();
};
/* const guestSelect = document.getElementById("guest_select");
export async function loadGuest() {
    const res = await fetch(`${API_URL}/guests`);
    const guests = await res.json();
    guestSelect.innerHTML = "";
    guests.forEach(guest => {
        const guestOption = document.createElement("option");
        guestOption.value = guest.id;
        guestOption.textContent = `${guest.first_name} ${guest.last_name}`
        guestSelect.append(guestOption);
    });
}; */
okBtn.addEventListener("click", booking);