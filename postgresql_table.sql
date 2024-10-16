CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE time_tracking (
    tracking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    duration_in_seconds INT
);

CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    amount DECIMAL(10, 2),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
