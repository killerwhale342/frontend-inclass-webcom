export async function BookingAPI() {
    const API_URL = "http://127.0.0.1:8080/bookings";
    const okBtn = document.getElementById("ok-btn");
    async function getAPI() {
        const res = await fetch(API_URL);
        const data = await res.json();
    };
    getAPI();
};