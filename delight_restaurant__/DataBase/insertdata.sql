-- Insert data into menu
INSERT INTO menu (id, name, description, price, availability, image_path) VALUES
(1, 'Fried Rice', 'Delicious fried rice with vegetables and your choice', 8.99, 1, '/images/friedrice.jpg'),
(2, 'Noodles', 'Stir-fried noodles with vegetables and a savory sauce', 7.99, 0, '/images/noodles.jpg'),
(3, 'Chicken Biryani', 'Delicious fried rice with vegetables and your choice', 11.90, 1, '/images/chicken_biryani.jpg'),
(4, 'Mutton Biryani', 'Delicious fried rice with vegetables and your choice', 18.90, 1, '/images/mutton_biryani.jpg'),
(5, 'Chicken Tikka Curry', 'Curry', 19.00, 1, NULL);

-- Insert data into reservations
INSERT INTO reservations (id, name, date, time, people) VALUES
(1, 'reedy', '2025-03-18', '21:11:00', 1),
(2, 'sudder', '2025-03-18', '05:20:00', 4),
(3, 'sampath', '2025-03-19', '13:05:00', 9),
(4, 'tarak', '2025-03-19', '14:59:00', 2),
(5, 'gopi', '2025-03-20', '17:55:00', 10),
(6, 'siva', '2025-03-26', '12:30:00', 45),
(7, 'sraval', '2025-03-31', '22:15:00', 8),
(8, 'anudep', '2025-04-15', '21:51:00', 5);

-- Insert data into users
INSERT INTO users (id, username, password, role, email) VALUES
(1, 'siva', 'siva', 'user', 'sva9705@gmail.com'),
(3, 'reddy', 'siva', 'user', 'saikalpana@gmail.com'),
(5, 'sivareddy', 'siva', 'user', 'saik@gmail.com'),
(6, 'koti', 'reddy', 'user', 'srinivas2gmail@co.m'),
(7, 'sudeer', 'suder', 'user', 'sudeer@gmail.com'),
(8, 'sampath', 'sampath', 'user', 'sampath98@gmail.com'),
(9, 'srinivas', 'srinu', 'user', 'srinivs@gmail.com'),
(10, 'lowdaaa', 'lowda', 'user', 'lowda@gmail.com'),
(11, 'tarak', 'tarak', 'user', 'tarak@gmail.com'),
(12, 'gopi', 'gopi', 'user', 'gopi@gmai.com'),
(13, 'sivaa', 'sivaaa', 'user', 'sivaaa@gmail.com'),
(14, 'kalpana', 'kalpana', 'user', 'kapana@gmail.com'),
(15, 'sravani', 'sravani', 'user', 'sravani@gmail.com'),
(16, 'Anudeep', 'anudde.', 'user', 'anudep@gmail.com'),
(17, 'sivakotir', 'shiva', 'user', 'sivakoota2@gmail.com');

-- Insert data into orders
INSERT INTO orders (id, items, timestamp) VALUES
(1, '[{"id": 1, "quantity": 1}, {"id": 3, "quantity": 1}]', '2025-03-19 09:10:08.903'),
(2, '[{"id": 1, "quantity": 1}]', '2025-03-19 13:58:34.383'),
(3, '[{"id": 3, "quantity": 1}, {"id": 4, "quantity": 1}]', '2025-03-19 16:54:48.780'),
(4, '[{"id": 3, "quantity": 1}]', '2025-03-19 20:14:25.313'),
(5, '[{"id": 6, "quantity": 1}, {"id": 1, "quantity": 1}]', '2025-03-22 10:29:10.840'),
(6, '[{"id": 3, "quantity": 1}]', '2025-03-25 20:43:03.347'),
(7, '[{"id": 4, "quantity": 1}, {"id": 6, "quantity": 1}]', '2025-03-29 20:14:18.220');
