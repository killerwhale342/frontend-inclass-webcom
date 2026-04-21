const API_URL = "http://127.0.0.1:8080";
//NEVER do this
const API_KEY = "48b2c8292119154f909f348508a9eb1d69e44c175ced1788e4fd78e722a176b7";
const guestSelect = document.getElementById("guest_select");
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
};