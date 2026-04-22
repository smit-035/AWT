const API_BASE = "http://localhost:5000/api";

// ROOMS
async function getRooms() {
  const res = await fetch(`${API_BASE}/rooms`);
  return res.json();
}

async function addRoom(room) {
  return fetch(`${API_BASE}/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(room)
  });
}

// BOOKINGS
async function getBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
}

async function createBooking(data) {
  return fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// CHECKOUT
async function checkout(data) {
  return fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// REPORTS
async function getStats() {
  const res = await fetch(`${API_BASE}/reports/stats`);
  return res.json();
}