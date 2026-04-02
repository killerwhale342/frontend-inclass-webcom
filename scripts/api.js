export async function IpAPI() {
    const API_URL = "http://127.0.0.1:8080/api/rawip";
    async function getAPI() {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log(data);
        document.getElementById("ip-output").textContent = data.ip;
    };
    getAPI();
};
export async function HotelAPI() {
    const API_URL = "http://127.0.0.1:8080/hotel";
    async function getRooms() {
        const res = await fetch(API_URL);
        const rooms = await res.json();
        console.log(rooms);
        for(let room of rooms) {
            document.getElementById("rooms-list").innerHTML +=
                `<li>${room.Number} - 
                Available: ${room.Available} - 
                ${room.Room_types} - 
                ${room.price} euro</li>`;
        };
    };
    getRooms();
};