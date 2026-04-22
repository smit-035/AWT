CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100)
);

INSERT INTO users (username, password) VALUES ('admin', '1234');

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_number VARCHAR(10),
    type VARCHAR(20),
    status VARCHAR(20)
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(100),
    phone VARCHAR(20),
    room_id INT REFERENCES rooms(id),
    checkin DATE,
    checkout DATE
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(100),
    room_number VARCHAR(10),
    checkin DATE,
    checkout DATE,
    total_amount INT
);