
-- -- USER is a reserved keyword with Postgres
-- -- You must use double quotes in every query that user is in:
-- -- ex. SELECT * FROM "user";
-- -- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- Create the 'user' table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(1000),
  admin BOOLEAN DEFAULT false
);

-- Create the 'status' table
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  status_name VARCHAR (50)
);

-- Create the 'client' table
CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(100),
  address VARCHAR(100),
  website VARCHAR(255),
  manager_id INTEGER REFERENCES "user"(id),
  phone VARCHAR(20),
  hours_of_operation VARCHAR(200),
  micromarket_location VARCHAR(255),
  neighborhood_info VARCHAR(300),
  demographics VARCHAR(300),
  number_of_people INTEGER,
  target_age_group VARCHAR(200),
  industry VARCHAR(255),
  pictures VARCHAR(200)[],
  dimensions VARCHAR(100),
  wugs_visit BOOLEAN default false,
  contract VARCHAR(200),
  admin_notes VARCHAR(500),
  status_id INTEGER REFERENCES status(id)
);

-- Create the 'service' table
CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR (20)
);

-- Create the 'product' table
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50)
);

-- Create a separate table for service and product relationships
-- junction table for client's services
CREATE TABLE client_service (
  client_id INTEGER REFERENCES client(id),
  service_id INTEGER REFERENCES service(id),
  PRIMARY KEY (client_id, service_id)
);

-- junction table for client's products
CREATE TABLE client_product (
  client_id INTEGER REFERENCES client(id),
  product_id INTEGER REFERENCES product(id),
  PRIMARY KEY (client_id, product_id)
);

-- Create the 'interested' table
CREATE TABLE interested (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  industry VARCHAR(100),
  about_you VARCHAR(300),
  why_wugs VARCHAR(300)
);

INSERT INTO "user" (first_name, last_name, username, password, admin)
VALUES
('John', 'Doe', 'john.doe@email.com', 'hashed_password_here', false),
('Jane', 'Smith', 'jane.smith@email.com', 'hashed_password_here', false),
('Bob', 'Johnson', 'bob.johnson@email.com', 'hashed_password_here', false),
('Alice', 'Brown', 'alice.brown@email.com', 'hashed_password_here', false),
('David', 'Wilson', 'david.wilson@email.com', 'hashed_password_here', false),
('Emily', 'Davis', 'emily.davis@email.com', 'hashed_password_here', false),
('Michael', 'Lee', 'michael.lee@email.com', 'hashed_password_here', false),
('Sarah', 'Garcia', 'sarah.garcia@email.com', 'hashed_password_here', false),
('Chris', 'Martinez', 'chris.martinez@email.com', 'hashed_password_here', false),
('Laura', 'Lopez', 'laura.lopez@email.com', 'hashed_password_here', false),
('Daniel', 'Hernandez', 'daniel.hernandez@email.com', 'hashed_password_here', false),
('Jennifer', 'Clark', 'jennifer.clark@email.com', 'hashed_password_here', false),
('Matthew', 'Scott', 'matthew.scott@email.com', 'hashed_password_here', false),
('Olivia', 'Perez', 'olivia.perez@email.com', 'hashed_password_here', false),
('William', 'Adams', 'william.adams@email.com', 'hashed_password_here', false);


INSERT INTO service (service_name) 
VALUES 
('Micro Markets'), ('Smart Coolers'), ('Snack Boxes');

INSERT INTO status (status_name) 
VALUES
  ('Onboarding Incomplete'),
  ('Pending Wugs Approval'),
  ('Render In Progress'),
  ('Contract Sent Awaiting Completion'),
  ('Pending Contract Approval'),
  ('Account Active'),
  ('Account Inactive');
  
  INSERT INTO product (type) 
  VALUES
  ('African'),
  ('Asian'),
  ('Gluten Free'),
  ('Mexican'),
  ('Perishable'),
  ('Frozen'),
  ('Kosher'),
  ('Halal'),
  ('Dairy Free');

INSERT INTO client (
  business_name,
  address,
  website,
  manager_id,
  phone,
  hours_of_operation,
  micromarket_location,
  neighborhood_info,
  demographics,
  number_of_people,
  target_age_group,
  industry,
  pictures,
  contract,
  admin_notes,
  status_id
) VALUES
('ABC School', '123 Elm Street', 'www.abcschool.com', 1, '555-123-4567', 'Mon-Fri: 8 AM - 5 PM', 'Cafeteria', 'Nearby grocery store and pharmacy', 'Mixed demographics', 500, 'Students and Staff', 'Education', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about school client', 1),
('XYZ Nursing Home', '456 Oak Avenue', 'www.xyznursinghome.com', 2, '555-987-6543', '24/7', 'Common Area', 'Close to a convenience store', 'Elderly residents', 100, 'Seniors', 'Healthcare', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about nursing home client', 2),
('123 College', '789 Maple Road', 'www.123college.edu', 3, '555-567-8901', 'Mon-Sat: 7 AM - 10 PM', 'Student Center', 'Adjacent to a campus store', 'College students', 2000, 'Young Adults', 'Education', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about college client', 1),
('XYZ Office Building', '987 Pine Lane', 'www.xyzofficebuilding.com', 4, '555-234-5678', 'Mon-Fri: 9 AM - 6 PM', 'Lobby', 'Nearby restaurants and cafes', 'Working professionals', 600, 'Adults', 'Commercial', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about office building client', 3),
('PQR Elementary School', '567 Birch Street', 'www.pqrschool.org', 5, '555-345-6789', 'Mon-Fri: 7:30 AM - 4 PM', 'Gymnasium', 'Grocery store across the street', 'Elementary school students', 300, 'Children', 'Education', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about elementary school client', 4),
('LMN Retirement Community', '234 Cedar Lane', 'www.lmnretirement.com', 6, '555-876-5432', '24/7', 'Recreation Room', 'Nearby supermarket and pharmacy', 'Retired individuals', 150, 'Seniors', 'Healthcare', ARRAY['https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg', 'https://take5vend.com/images/market-main.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about retirement community client', 2),
('DEF University', '678 Redwood Road', 'www.defuniversity.edu', 7, '555-654-3210', 'Mon-Sun: 7 AM - 11 PM', 'Student Union', 'Convenience store on campus', 'University students', 2500, 'Young Adults', 'Education', ARRAY['https://take5vend.com/images/market-main.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about university client', 5),
('MNO Office Park', '345 Willow Lane', 'www.mnoofficepark.com', 8, '555-432-1098', 'Mon-Fri: 8 AM - 6 PM', 'Cafeteria', 'Nearby coffee shops and restaurants', 'Office workers', 800, 'Adults', 'Commercial', ARRAY['https://take5vend.com/images/market-main.jpg', 'https://take5vend.com/images/market-main.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about office park client', 1),
('GHI High School', '876 Pine Street', 'www.ghihighschool.org', 9, '555-789-0123', 'Mon-Fri: 7:30 AM - 3 PM', 'Student Lounge', 'Grocery store nearby', 'High school students', 400, 'Teenagers', 'Education', ARRAY['https://take5vend.com/images/market-main.jpg', 'https://www.allstatemfg.com/wp-content/uploads/2016/03/East-Coast..jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about high school client', 6),
('JKL Nursing Home', '543 Oakwood Avenue', 'www.jklnursinghome.com', 10, '555-901-2345', '24/7', 'Common Area', 'Close to a pharmacy', 'Elderly residents', 120, 'Seniors', 'Healthcare', ARRAY['https://www.allstatemfg.com/wp-content/uploads/2016/03/East-Coast..jpg', 'https://take5vend.com/images/market-main.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about nursing home client', 4),
('PQR Office Building', '321 Cedar Lane', 'www.pqrofficebuilding.com', 11, '555-123-4567', 'Mon-Fri: 9 AM - 5 PM', 'Lobby', 'Nearby cafes and delis', 'Working professionals', 500, 'Adults', 'Commercial', ARRAY['https://www.allstatemfg.com/wp-content/uploads/2016/03/East-Coast..jpg', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Frdsvending.net%2Fmicro-markets&psig=AOvVaw156ssTHYxS3RxBO1taXuPf&ust=1696437701939000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIDx_4ap2oEDFQAAAAAdAAAAABAt'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about office building client', 3),
('STU Elementary School', '789 Willow Street', 'www.stuschool.org', 12, '555-234-5678', 'Mon-Fri: 8 AM - 3 PM', 'Cafeteria', 'Supermarket across the street', 'Elementary school students', 350, 'Children', 'Education', ARRAY['https://www.allstatemfg.com/wp-content/uploads/2016/03/East-Coast..jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about elementary school client', 2),
('VWX Retirement Community', '456 Redwood Lane', 'www.vwxretirement.com', 13, '555-345-6789', '24/7', 'Recreation Room', 'Pharmacy nearby', 'Retired individuals', 130, 'Seniors', 'Healthcare', ARRAY['https://rdsvending.net/images/market2.jpg, 'https://www.allstatemfg.com/wp-content/uploads/2016/03/East-Coast..jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about retirement community client', 5),
('UVW University', '234 Birch Road', 'www.uvwuniversity.edu', 14, '555-876-5432', 'Mon-Sun: 7 AM - 10 PM', 'Student Union', 'Campus store on site', 'University students', 280, 'Young Adults', 'Education', ARRAY['https://rdsvending.net/images/market2.jpg'], 'https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg', 'Notes about university client', 6);

INSERT INTO interested (name, email, phone_number, industry, about_you, why_wugs) VALUES
    ('John Doe', 'john.doe@example.com', '555-555-5555', 'Technology', 'We are a tech startup focused on AI and machine learning.', 'We would like a vending machine to provide convenient snacks and beverages for our employees.'),
    ('Jane Smith', 'jane.smith@example.com', '555-555-5555', 'Healthcare', 'We operate a healthcare clinic specializing in pediatrics.', 'Having a market on-site would be a great convenience for our patients and staff.'),
    ('Michael Johnson', 'michael.johnson@example.com', '555-555-5555', 'Education', 'We are a university library serving students and faculty.', 'A vending machine with study snacks and supplies would be valuable for our users.'),
    ('Sarah Williams', 'sarah.williams@example.com', '555-555-5555', 'Finance', 'We are a financial services firm providing investment advice.', 'Offering snacks and beverages to our clients during meetings would enhance their experience.'),
    ('David Lee', 'david.lee@example.com', '555-555-5555', 'Hospitality', 'We manage a hotel with a restaurant and conference facilities.', 'A vending machine would complement our dining options and cater to late-night cravings for guests.'),
    ('Karen Brown', 'karen.brown@example.com', '555-555-5555', 'Manufacturing', 'We run a manufacturing plant for automotive components.', 'Our employees work long hours, and a vending machine would provide quick access to refreshments.'),
    ('Lisa Taylor', 'lisa.taylor@example.com', '555-555-5555', 'Retail', 'We own a retail store selling electronics and gadgets.', 'Offering snacks and drinks while customers browse our products would boost sales and customer satisfaction.');
    
-- Dummy data for junction tables
INSERT INTO client_service (client_id, service_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 3),
(4, 1),
(5, 3);

INSERT INTO client_product (client_id, product_id)
VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 4),
(4, 3),
(4, 5),
(4, 7),
(5, 9);